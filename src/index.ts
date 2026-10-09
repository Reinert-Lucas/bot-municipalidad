import { createHmac, timingSafeEqual } from "node:crypto";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { dirname } from "node:path";
import { DESPEDIDA, PREGUNTA_SECCIONES, PREGUNTA_SEGUIR, SALUDO, SECCIONES } from "./contenido.js";
import type { MensajeEntrante, WebhookBody, Fila, Pregunta } from "./types.js";

// Configuración
const PORT = Number(process.env.PORT ?? 5000);
const GRAPH_BASE = process.env.GRAPH_API_BASE ?? "https://graph.facebook.com/v25.0";
const PERMITIR_SIN_FIRMA = process.env.ALLOW_UNSIGNED === "true"; // solo para desarrollo

const EQUIVALENCIAS: Record<string, string> = {
  "5493751619821": "54375115619821",
};

function destinatario(numero: string): string {
  return EQUIVALENCIAS[numero] ?? numero;
}

function requerida(nombre: string): string {
  const valor = process.env[nombre];
  if (!valor) {
    console.error(`Falta la variable de entorno obligatoria: ${nombre}`);
    process.exit(1);
  }
  return valor;
}

function entero(nombre: string, porDefecto: number): number {
  const v = Number(process.env[nombre]);
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : porDefecto;
}

const VERIFY_TOKEN = requerida("VERIFY_TOKEN");
const WHATSAPP_TOKEN = requerida("WHATSAPP_TOKEN");
const PHONE_NUMBER_ID = requerida("PHONE_NUMBER_ID");
const GRAPH_URL = `${GRAPH_BASE}/${PHONE_NUMBER_ID}/messages`;
const APP_SECRET = process.env.APP_SECRET ?? "";
if (!APP_SECRET) {
  if (PERMITIR_SIN_FIRMA) {
    console.warn("ATENCIÓN: ALLOW_UNSIGNED=true, no se verifica la firma de Meta (solo para desarrollo).");
  } else {
    console.error("Falta la variable de entorno obligatoria: APP_SECRET");
    process.exit(1);
  }
}

// Límites contra abusos (todos ajustables por variable de entorno).
const LIM_USUARIO_MINUTO = entero("LIMITE_USUARIO_POR_MINUTO", 20); // mensajes de un mismo número
const LIM_USUARIO_DIA = entero("LIMITE_USUARIO_POR_DIA", 40);
const LIM_ENVIOS_MINUTO = entero("LIMITE_ENVIOS_POR_MINUTO", 300); // mensajes que envía el bot (tope global)
const LIM_ENVIOS_DIA = entero("LIMITE_ENVIOS_POR_DIA", 1000);
// Tope mensual de mensajes enviados por el bot (el límite gratuito de Meta es de 1.000 por mes).
const LIM_ENVIOS_MES = entero("LIMITE_ENVIOS_POR_MES", 1000);
// Últimos mensajes del mes reservados para avisarle a la gente que se alcanzó el límite.
const RESERVA_AVISOS_MES = Math.min(entero("RESERVA_AVISOS_MES", 10), Math.max(0, LIM_ENVIOS_MES - 1));
const RUTA_CONTADOR = process.env.RUTA_CONTADOR ?? "./contador-mensual.json";
const MAX_PENDIENTES = entero("MAX_PENDIENTES", 200); // webhooks procesándose a la vez
const MAX_MENSAJES_POR_WEBHOOK = entero("MAX_MENSAJES_POR_WEBHOOK", 50);
const MAX_EDAD_MS = entero("MAX_EDAD_MENSAJE_MIN", 15) * 60_000; // se ignoran mensajes más viejos
const BLOQUEADOS = new Set(
  (process.env.BLOQUEADOS ?? "").split(",").map((s) => s.trim()).filter(Boolean),
);
const MINUTO = 60_000;
const HORA = 60 * MINUTO;
const DIA = 24 * HORA;
const MAX_CLAVES = 50_000; // tope de entradas en cada tabla en memoria
const MAX_BODY = 262_144; // 256 KB; los webhooks de WhatsApp pesan unos pocos KB
const DURACIONES_BLOQUEO = [10 * MINUTO, HORA, DIA]; // escalan con cada reincidencia
const AVISO_LIMITE =
  "Detectamos demasiados mensajes en poco tiempo. Por favor, esperá unos minutos antes de volver a escribir.";
const AVISO_MES_AGOTADO =
  "Por el momento el asistente alcanzó su límite de consultas de este mes. Volverá a estar disponible a partir del 1.º del mes próximo.";

// Índices del contenido
const PREGUNTAS = new Map<string, { seccion: number; pregunta: Pregunta }>();
for (const sec of SECCIONES) {
  for (const p of sec.preguntas) PREGUNTAS.set(p.id, { seccion: sec.id, pregunta: p });
}

type MensajeConFecha = MensajeEntrante & { timestamp?: string };

/** Para los logs: no se guarda el número completo de los vecinos. */
function enmascarar(numero: string): string {
  return numero.length > 4 ? `***${numero.slice(-4)}` : numero;
}

// Control de abusos
/** Contador de ventana fija: permite hasta `max` eventos por clave en cada ventana. */
class ContadorVentana {
  private datos = new Map<string, { inicio: number; cuenta: number }>();
  constructor(
    private ventanaMs: number,
    private max: number,
  ) {}

  /** Suma un evento; devuelve true si todavía está dentro del límite. */
  permitir(clave: string, ahora = Date.now()): boolean {
    const d = this.datos.get(clave);
    if (!d || ahora - d.inicio >= this.ventanaMs) {
      this.datos.set(clave, { inicio: ahora, cuenta: 1 });
      return true;
    }
    d.cuenta++;
    return d.cuenta <= this.max;
  }

  limpiar(ahora = Date.now()): void {
    for (const [k, d] of this.datos) {
      if (ahora - d.inicio >= this.ventanaMs) this.datos.delete(k);
    }
    if (this.datos.size > MAX_CLAVES) this.datos.clear();
  }
}

// Límites por usuario (por número de teléfono)
const usuarioMinuto = new ContadorVentana(MINUTO, LIM_USUARIO_MINUTO);
const usuarioDia = new ContadorVentana(DIA, LIM_USUARIO_DIA);
const baneados = new Map<string, { hasta: number; strikes: number }>();

// Tope global de mensajes que envía el bot: corta el gasto si algo se descontrola.
const enviosMinuto = new ContadorVentana(MINUTO, LIM_ENVIOS_MINUTO);
const enviosDia = new ContadorVentana(DIA, LIM_ENVIOS_DIA);
let ultimaAlertaEnvios = 0;

// Tope mensual: se guarda en un archivo para que sobreviva a los reinicios.
interface ContadorMensual {
  mes: string; // "AAAA-MM" (UTC)
  cuenta: number;
}

function mesActual(): string {
  return new Date().toISOString().slice(0, 7);
}

function cargarContador(): ContadorMensual {
  try {
    const d = JSON.parse(readFileSync(RUTA_CONTADOR, "utf8")) as Partial<ContadorMensual>;
    if (typeof d.mes === "string" && Number.isInteger(d.cuenta) && (d.cuenta as number) >= 0) {
      return { mes: d.mes, cuenta: d.cuenta as number };
    }
  } catch {
    /* sin archivo previo o ilegible: se empieza de cero */
    console.warn(
      `No se encontró un contador mensual previo en ${RUTA_CONTADOR}: se empieza en 0. ` +
        "Si esto ocurre después de cada deploy, el disco no es persistente y el tope mensual no es confiable.",
    );
  }
  return { mes: mesActual(), cuenta: 0 };
}

function guardarContador(): void {
  try {
    mkdirSync(dirname(RUTA_CONTADOR), { recursive: true });
    const tmp = `${RUTA_CONTADOR}.tmp`;
    writeFileSync(tmp, JSON.stringify(contadorMes));
    renameSync(tmp, RUTA_CONTADOR);
  } catch (e) {
    console.error("No se pudo guardar el contador mensual:", e);
  }
}

let contadorMes: ContadorMensual = cargarContador();
const avisadosMes = new Set<string>(); // a quién ya se se avisó que se agotó el mes

/** Si cambió el mes, el contador vuelve a cero. */
function actualizarMes(): void {
  const mes = mesActual();
  if (contadorMes.mes !== mes) {
    contadorMes = { mes, cuenta: 0 };
    avisadosMes.clear();
    guardarContador();
    console.log(`Nuevo mes (${mes}): contador de envíos en 0`);
  }
}

/** true si ya no se pueden mandar respuestas normales (solo quedan los avisos reservados). */
function mesAgotado(): boolean {
  actualizarMes();
  return contadorMes.cuenta >= LIM_ENVIOS_MES - RESERVA_AVISOS_MES;
}

function reservarCupoMensual(esAviso: boolean): boolean {
  actualizarMes();
  const tope = esAviso ? LIM_ENVIOS_MES : LIM_ENVIOS_MES - RESERVA_AVISOS_MES;
  if (contadorMes.cuenta >= tope) return false;
  contadorMes.cuenta++;
  guardarContador();
  for (const pct of [0.5, 0.8, 0.9]) {
    if (contadorMes.cuenta === Math.floor(LIM_ENVIOS_MES * pct)) {
      console.warn(`ALERTA: se usó el ${pct * 100}% del límite mensual (${contadorMes.cuenta}/${LIM_ENVIOS_MES})`);
    }
  }
  if (contadorMes.cuenta === LIM_ENVIOS_MES - RESERVA_AVISOS_MES) {
    console.error(`ALERTA: se alcanzó el límite mensual de envíos (${contadorMes.cuenta}/${LIM_ENVIOS_MES}).`);
  }
  return true;
}

/** Si Meta rechazó el envío, ese mensaje no se entregó y no debe contar. */
function devolverCupoMensual(): void {
  if (contadorMes.cuenta > 0) {
    contadorMes.cuenta--;
    guardarContador();
  }
}

function permitirEnvio(esAviso: boolean): boolean {
  const ok = enviosMinuto.permitir("global") && enviosDia.permitir("global");
  if (!ok) {
    if (Date.now() - ultimaAlertaEnvios > MINUTO) {
      ultimaAlertaEnvios = Date.now();
      console.error("ALERTA: se alcanzó el tope global de envíos; los mensajes se descartan hasta que se libere.");
    }
    return false;
  }
  return reservarCupoMensual(esAviso);
}

type Veredicto = "ok" | "avisar" | "ignorar";

/** Decide qué hacer con un mensaje según el comportamiento reciente del número. */
function controlarUsuario(numero: string): Veredicto {
  const ahora = Date.now();
  if (BLOQUEADOS.has(numero)) return "ignorar";
  const ban = baneados.get(numero);
  if (ban && ahora < ban.hasta) return "ignorar"; // bloqueado: no se responde nada

  const okMinuto = usuarioMinuto.permitir(numero, ahora);
  const okDia = usuarioDia.permitir(numero, ahora);
  if (okMinuto && okDia) return "ok";

  // Se pasó del límite: bloqueo temporal, cada vez más largo si reincide.
  const strikes = (ban?.strikes ?? 0) + 1;
  const duracion = DURACIONES_BLOQUEO[Math.min(strikes, DURACIONES_BLOQUEO.length) - 1] ?? DIA;
  baneados.set(numero, { hasta: ahora + duracion, strikes });
  console.warn(
    `Usuario ${enmascarar(numero)} bloqueado ${Math.round(duracion / MINUTO)} min (reincidencia ${strikes})`,
  );
  return strikes === 1 ? "avisar" : "ignorar"; // el aviso se manda una sola vez
}

/** Mensajes ya procesados (id -> momento), para descartar reintentos de Meta. */
const mensajesProcesados = new Map<string, number>();

function limpiarMemoria(): void {
  const ahora = Date.now();
  usuarioMinuto.limpiar(ahora);
  usuarioDia.limpiar(ahora);
  enviosMinuto.limpiar(ahora);
  enviosDia.limpiar(ahora);
  for (const [numero, b] of baneados) {
    if (ahora > b.hasta + DIA) baneados.delete(numero); // se "perdona" tras un día sin problemas
  }
  for (const [id, t] of mensajesProcesados) {
    if (ahora - t > HORA) mensajesProcesados.delete(id);
  }
  if (mensajesProcesados.size > MAX_CLAVES) mensajesProcesados.clear();
  if (baneados.size > MAX_CLAVES) baneados.clear();
  if (avisadosMes.size > MAX_CLAVES) avisadosMes.clear();
}
setInterval(limpiarMemoria, MINUTO).unref();

/** Comparación de textos en tiempo constante (para el token de verificación). */
function igualesSeguro(a: string, b: string): boolean {
  const ha = createHmac("sha256", "comparacion").update(a).digest();
  const hb = createHmac("sha256", "comparacion").update(b).digest();
  return timingSafeEqual(ha, hb);
}

// Envío de mensajes
async function post(payload: object, esAviso = false): Promise<boolean> {
  if (!permitirEnvio(esAviso)) return false;
  try {
    const r = await fetch(GRAPH_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) {
      console.error("Error al enviar:", r.status, await r.text());
      devolverCupoMensual(); // Meta lo rechazó: no se entregó, no cuenta
    }
    return r.ok;
  } catch (e) {
    console.error("Error de red al enviar:", e);
    return false;
  }
}

function interactivo(numero: string, interactive: object): object {
  return {
    messaging_product: "whatsapp",
    to: destinatario(numero),
    type: "interactive",
    interactive,
  };
}

function enviarTexto(numero: string, texto: string, esAviso = false): Promise<boolean> {
  return post(
    {
      messaging_product: "whatsapp",
      to: destinatario(numero),
      type: "text",
      text: { body: texto },
    },
    esAviso,
  );
}

/** botones: máx. 3, título de hasta 20 caracteres. */
function enviarBotones(
  numero: string,
  texto: string,
  botones: { id: string; titulo: string }[],
): Promise<boolean> {
  return post(
    interactivo(numero, {
      type: "button",
      body: { text: texto },
      action: {
        buttons: botones.map((b) => ({ type: "reply", reply: { id: b.id, title: b.titulo } })),
      },
    }),
  );
}

/** filas: máx. 10 en total. */
function enviarLista(
  numero: string,
  texto: string,
  boton: string,
  tituloSeccion: string,
  filas: Fila[],
): Promise<boolean> {
  return post(
    interactivo(numero, {
      type: "list",
      body: { text: texto },
      action: {
        button: boton,
        sections: [
          {
            title: tituloSeccion,
            rows: filas.map((f) => ({
              id: f.id,
              title: f.titulo,
              ...(f.descripcion ? { description: f.descripcion } : {}),
            })),
          },
        ],
      },
    }),
  );
}

/** Recorta un texto al largo máximo, agregando "…" si hizo falta. */
function recortar(texto: string, max: number): string {
  return texto.length <= max ? texto : texto.slice(0, max - 1).trimEnd() + "…";
}

// Pantallas del bot
async function mostrarSecciones(numero: string, texto: string): Promise<void> {
  const filas = SECCIONES.map((s) => ({
    id: `sec_${s.id}`,
    titulo: s.titulo,
    descripcion: s.descripcion,
  }));
  await enviarLista(numero, texto, "Ver secciones", "Secciones", filas);
}

async function mostrarPreguntas(numero: string, n: number): Promise<void> {
  const sec = SECCIONES.find((s) => s.id === n);
  if (!sec) return mostrarSecciones(numero, PREGUNTA_SECCIONES); // id inválido o viejo
  if (sec.preguntas.length === 0) {
    // Sección todavía sin consultas cargadas: se avisa en lugar de mostrar una lista vacía.
    await enviarBotones(
      numero,
      `*Sección ${sec.id} — ${sec.nombre}*\n\nTodavía no hay consultas cargadas en esta sección.`,
      [
        { id: "otra_sec", titulo: "Otra sección" },
        { id: "fin", titulo: "Terminar" },
      ],
    );
    return;
  }
  // Las preguntas completas van numeradas en el cuerpo del mensaje (hasta 1024
  // caracteres); las filas muestran "Pregunta N" y el comienzo de la pregunta.
  const detalle = sec.preguntas.map((p, i) => `${i + 1}. ${p.pregunta}`).join("\n\n");
  const texto = `*Sección ${sec.id} — ${sec.nombre}*\n\n${detalle}\n\nElegí tu consulta:`;
  const filas: Fila[] = sec.preguntas.map((p, i) => ({
    id: p.id,
    titulo: `Pregunta ${i + 1}`,
    descripcion: recortar(p.pregunta, 72),
  }));
  filas.push({ id: "menu", titulo: "Volver a secciones" });
  await enviarLista(numero, texto, "Seleccionar Pregunta", "Preguntas", filas);
}

function botonesPost(n: number): { id: string; titulo: string }[] {
  return [
    { id: `otra_${n}`, titulo: "Otra pregunta" },
    { id: "otra_sec", titulo: "Otra sección" },
    { id: "fin", titulo: "Terminar" },
  ];
}

async function mostrarRespuesta(numero: string, qid: string): Promise<void> {
  const item = PREGUNTAS.get(qid);
  if (!item) return;
  const { seccion, pregunta: p } = item;
  const texto = `*${p.pregunta}*\n\n${p.respuesta}\n\n_Referencia: ${p.referencia}_\n\n${PREGUNTA_SEGUIR}`;
  await enviarBotones(numero, texto, botonesPost(seccion));
}

// Lógica de la conversación (sin estado: cada id lleva su contexto)
/** Maneja el id de una fila de lista o de un botón tocado. */
async function procesarId(numero: string, rid: string): Promise<void> {
  if (rid.startsWith("sec_")) {
    await mostrarPreguntas(numero, Number(rid.split("_")[1]));
  } else if (PREGUNTAS.has(rid)) {
    await mostrarRespuesta(numero, rid);
  } else if (rid === "otra_sec") {
    await mostrarSecciones(numero, PREGUNTA_SECCIONES);
  } else if (rid.startsWith("otra_")) {
    await mostrarPreguntas(numero, Number(rid.split("_")[1]));
  } else if (rid === "fin") {
    await enviarTexto(numero, DESPEDIDA);
  } else {
    // "menu" o cualquier id desconocido (por ejemplo, de una versión anterior)
    await mostrarSecciones(numero, PREGUNTA_SECCIONES);
  }
}

async function procesarMensaje(msg: MensajeEntrante): Promise<void> {
  const numero = msg.from;
  if (msg.type === "reaction") return; // un emoji sobre un mensaje no requiere respuesta
  if (msg.type === "interactive") {
    const crudo = (msg.interactive?.list_reply ?? msg.interactive?.button_reply)?.id;
    const rid = typeof crudo === "string" && crudo.length <= 64 ? crudo : "";
    console.log(`Selección de ${enmascarar(numero)}: ${rid}`);
    await procesarId(numero, rid);
  } else {
    // Texto libre u otro tipo de mensaje: se muestra el saludo y las secciones.
    console.log(`Mensaje de ${enmascarar(numero)} (tipo ${msg.type})`);
    await mostrarSecciones(numero, SALUDO);
  }
}

/** Un mensaje demasiado viejo (reintento tardío o repetición) no se responde. */
function esAntiguo(msg: MensajeConFecha): boolean {
  if (!msg.timestamp) return false;
  const edad = Date.now() - Number(msg.timestamp) * 1000;
  return Number.isFinite(edad) && edad > MAX_EDAD_MS;
}

async function procesarWebhook(body: WebhookBody): Promise<void> {
  let vistos = 0;
  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      for (const m of change.value?.messages ?? []) {
        if (++vistos > MAX_MENSAJES_POR_WEBHOOK) {
          console.warn("Webhook con demasiados mensajes: se descarta el resto");
          return;
        }
        const msg = m as MensajeConFecha;

        // Validación del formato: el número va directo a la API de WhatsApp.
        if (typeof msg.from !== "string" || !/^\d{7,15}$/.test(msg.from)) continue;

        // Reintentos duplicados de Meta
        if (typeof msg.id === "string" && msg.id.length <= 200) {
          if (mensajesProcesados.has(msg.id)) continue;
          mensajesProcesados.set(msg.id, Date.now());
        }
        if (esAntiguo(msg)) continue;

        // Límite por usuario
        const veredicto = controlarUsuario(msg.from);
        if (veredicto === "ignorar") continue;

        // Límite mensual: se avisa una sola vez a cada persona y después no se responde.
        if (veredicto === "ok" && mesAgotado()) {
          if (!avisadosMes.has(msg.from)) {
            avisadosMes.add(msg.from);
            await enviarTexto(msg.from, AVISO_MES_AGOTADO, true);
          }
          continue;
        }

        try {
          if (veredicto === "avisar") await enviarTexto(msg.from, AVISO_LIMITE);
          else await procesarMensaje(msg);
        } catch (e) {
          console.error("Error procesando mensaje:", e);
        }
      }
    }
  }
}

// Servidor HTTP
function leerBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const partes: Buffer[] = [];
    let total = 0;
    req.on("data", (chunk: Buffer) => {
      total += chunk.length;
      if (total > MAX_BODY) {
        reject(new Error("Body demasiado grande"));
        req.destroy();
        return;
      }
      partes.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(partes)));
    req.on("error", reject);
  });
}

/** Comprueba la firma HMAC-SHA256 que Meta agrega a cada webhook. */
function firmaValida(raw: Buffer, cabecera: string | string[] | undefined): boolean {
  if (!APP_SECRET) return PERMITIR_SIN_FIRMA;
  if (typeof cabecera !== "string" || !cabecera.startsWith("sha256=")) return false;
  const esperada = createHmac("sha256", APP_SECRET).update(raw).digest();
  const recibida = Buffer.from(cabecera.slice("sha256=".length), "hex");
  return recibida.length === esperada.length && timingSafeEqual(recibida, esperada);
}

function responder(res: ServerResponse, status: number, texto: string): void {
  res.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-store",
  });
  res.end(texto);
}

/** Respuesta de rechazo rápido: no se lee el cuerpo y se cierra la conexión. */
function rechazar(res: ServerResponse, status: number, texto: string, extra: Record<string, string> = {}): void {
  res.setHeader("Connection", "close");
  for (const [k, v] of Object.entries(extra)) res.setHeader(k, v);
  responder(res, status, texto);
}

// Tareas que siguen corriendo después de responderle 200 a Meta
const pendientes = new Set<Promise<void>>();

// connectionsCheckingInterval: cada cuántos ms Node revisa los timeouts (por defecto, 30 s).
const server = createServer({ connectionsCheckingInterval: 2_000 }, async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://localhost");

    if (req.method === "GET" && url.pathname === "/") {
      return responder(res, 200, "Bot Muni activo"); // health check
    }

    if (req.method === "GET" && url.pathname === "/webhook") {
      // Meta llama a este endpoint una vez para verificar el webhook.
      const ok =
        url.searchParams.get("hub.mode") === "subscribe" &&
        igualesSeguro(url.searchParams.get("hub.verify_token") ?? "", VERIFY_TOKEN);
      return ok
        ? responder(res, 200, url.searchParams.get("hub.challenge") ?? "")
        : responder(res, 403, "Token inválido");
    }

    if (req.method === "POST" && url.pathname === "/webhook") {
      // Contrapresión: si hay demasiado trabajo en curso, Meta reintenta más tarde.
      if (pendientes.size >= MAX_PENDIENTES) {
        return rechazar(res, 503, "Servidor ocupado", { "Retry-After": "30" });
      }
      // Rechazo barato: Meta siempre envía la firma; sin ella no se lee el cuerpo.
      const cab = req.headers["x-hub-signature-256"];
      if (APP_SECRET && (typeof cab !== "string" || !cab.startsWith("sha256="))) {
        return rechazar(res, 401, "Firma inválida");
      }
      if (!(req.headers["content-type"] ?? "").includes("application/json")) {
        return rechazar(res, 415, "Tipo de contenido no soportado");
      }

      const raw = await leerBody(req);
      if (!firmaValida(raw, cab)) {
        console.warn("Webhook rechazado: firma inválida");
        return responder(res, 401, "Firma inválida");
      }
      let body: WebhookBody;
      try {
        body = JSON.parse(raw.toString("utf8")) as WebhookBody;
      } catch {
        return responder(res, 400, "JSON inválido");
      }
      // Se responde 200 enseguida para que Meta no reintente; se procesa después.
      responder(res, 200, "OK");
      const tarea = procesarWebhook(body).catch((e) => console.error("Error en webhook:", e));
      pendientes.add(tarea);
      void tarea.finally(() => pendientes.delete(tarea));
      return;
    }

    responder(res, 404, "No encontrado");
  } catch (e) {
    console.error("Error en el servidor:", e);
    if (!res.headersSent) responder(res, 500, "Error interno");
  }
});

// Timeouts contra conexiones que se quedan abiertas (slowloris)
server.headersTimeout = 10_000;
server.requestTimeout = 15_000;
server.keepAliveTimeout = 5_000;

server.listen(PORT, () => {
  console.log(`Bot Muni escuchando en el puerto ${PORT}`);
  console.log(
    `Límites: ${LIM_USUARIO_MINUTO}/min y ${LIM_USUARIO_DIA}/día por usuario; ` +
      `envíos ${LIM_ENVIOS_MINUTO}/min y ${LIM_ENVIOS_DIA}/día en total`,
  );
  console.log(
    `Tope mensual: ${LIM_ENVIOS_MES} mensajes (${RESERVA_AVISOS_MES} reservados para avisos); ` +
      `usados en ${contadorMes.mes}: ${contadorMes.cuenta}; contador en ${RUTA_CONTADOR}`,
  );
});

// Cierre ordenado: Render envía SIGTERM en cada deploy o reinicio.
async function apagar(senal: string): Promise<void> {
  console.log(`${senal} recibido, cerrando...`);
  server.close();
  await Promise.race([
    Promise.allSettled([...pendientes]),
    new Promise((resolve) => setTimeout(resolve, 8_000)),
  ]);
  process.exit(0);
}
process.on("SIGTERM", () => void apagar("SIGTERM"));
process.on("SIGINT", () => void apagar("SIGINT"));
process.on("unhandledRejection", (e) => console.error("Promesa sin manejar:", e));