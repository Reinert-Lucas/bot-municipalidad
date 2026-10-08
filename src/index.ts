/**
 * Bot Muni - Código de Edificación de Posadas (WhatsApp Cloud API).
 * Versión TypeScript, sin dependencias de runtime (http y fetch nativos).
 *
 * Flujo:
 *   1. El usuario escribe -> saludo + lista de SECCIONES del Código.
 *   2. Elige una sección -> lista de PREGUNTAS de esa sección.
 *   3. Elige una pregunta -> respuesta + referencia + botones:
 *      "Otra pregunta" (misma sección) / "Otra sección" / "Terminar".
 *
 * Variables de entorno: VERIFY_TOKEN, WHATSAPP_TOKEN, PHONE_NUMBER_ID, PORT
 */

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import {
  DESPEDIDA,
  PREGUNTA_SECCIONES,
  PREGUNTA_SEGUIR,
  SALUDO,
  SECCIONES,
  type Pregunta,
} from "./contenido.js";

// ---------------------------------------------------------------------------
// Configuración
// ---------------------------------------------------------------------------
const PORT = Number(process.env.PORT ?? 5000);
const VERIFY_TOKEN = process.env.VERIFY_TOKEN ?? "cambiar-este-token";
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN ?? "";
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID ?? "";
const GRAPH_BASE = process.env.GRAPH_API_BASE ?? "https://graph.facebook.com/v25.0";
const GRAPH_URL = `${GRAPH_BASE}/${PHONE_NUMBER_ID}/messages`;

// Solo para pruebas con el número de prueba de Meta (formato argentino):
// número como llega por webhook -> formato que acepta la lista de destinatarios.
const EQUIVALENCIAS: Record<string, string> = {
  "5493751619821": "54375115619821",
};

// ---------------------------------------------------------------------------
// Tipos del webhook de WhatsApp (solo lo que usamos)
// ---------------------------------------------------------------------------
interface MensajeEntrante {
  id?: string;
  from: string;
  type?: string;
  text?: { body: string };
  interactive?: {
    type?: string;
    list_reply?: { id: string; title?: string };
    button_reply?: { id: string; title?: string };
  };
}

interface WebhookBody {
  entry?: { changes?: { value?: { messages?: MensajeEntrante[] } }[] }[];
}

// ---------------------------------------------------------------------------
// Índices del contenido
// ---------------------------------------------------------------------------
const PREGUNTAS = new Map<string, { seccion: number; pregunta: Pregunta }>();
for (const sec of SECCIONES) {
  for (const p of sec.preguntas) PREGUNTAS.set(p.id, { seccion: sec.id, pregunta: p });
}

// ---------------------------------------------------------------------------
// Estado de las conversaciones (en memoria; se pierde al reiniciar).
// Sin estado = charla nueva o terminada.
// ---------------------------------------------------------------------------
type Estado =
  | { pantalla: "secciones" }
  | { pantalla: "preguntas"; n: number }
  | { pantalla: "post"; n: number };

const estados = new Map<string, Estado>();
const mensajesProcesados = new Set<string>(); // ignora reintentos duplicados de Meta

// ---------------------------------------------------------------------------
// Envío de mensajes
// ---------------------------------------------------------------------------
async function post(payload: object): Promise<boolean> {
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
    if (!r.ok) console.error("Error al enviar:", r.status, await r.text());
    return r.ok;
  } catch (e) {
    console.error("Error de red al enviar:", e);
    return false;
  }
}

function destinatario(numero: string): string {
  return EQUIVALENCIAS[numero] ?? numero;
}

function interactivo(numero: string, interactive: object): object {
  return {
    messaging_product: "whatsapp",
    to: destinatario(numero),
    type: "interactive",
    interactive,
  };
}

function enviarTexto(numero: string, texto: string): Promise<boolean> {
  return post({
    messaging_product: "whatsapp",
    to: destinatario(numero),
    type: "text",
    text: { body: texto },
  });
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

interface Fila {
  id: string;
  titulo: string;
  descripcion?: string;
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

// ---------------------------------------------------------------------------
// Pantallas del bot
// ---------------------------------------------------------------------------
async function mostrarSecciones(numero: string, texto: string): Promise<void> {
  const filas = SECCIONES.map((s) => ({
    id: `sec_${s.id}`,
    titulo: s.titulo,
    descripcion: s.descripcion,
  }));
  if (await enviarLista(numero, texto, "Ver secciones", "Secciones", filas)) {
    estados.set(numero, { pantalla: "secciones" });
  }
}

async function mostrarPreguntas(numero: string, n: number, prefijo = ""): Promise<void> {
  const sec = SECCIONES.find((s) => s.id === n);
  if (!sec) return;
  const texto = `${prefijo}*Sección ${sec.id} — ${sec.nombre}*\nElegí tu consulta:`;
  const filas: Fila[] = sec.preguntas.map((p) => ({ id: p.id, titulo: p.corto }));
  filas.push({ id: "menu", titulo: "Volver a secciones" });
  if (await enviarLista(numero, texto, "Ver preguntas", "Preguntas", filas)) {
    estados.set(numero, { pantalla: "preguntas", n });
  }
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
  if (await enviarBotones(numero, texto, botonesPost(seccion))) {
    estados.set(numero, { pantalla: "post", n: seccion });
  }
}

async function mostrarPost(numero: string, n: number, prefijo = ""): Promise<void> {
  if (await enviarBotones(numero, prefijo + PREGUNTA_SEGUIR, botonesPost(n))) {
    estados.set(numero, { pantalla: "post", n });
  }
}

// ---------------------------------------------------------------------------
// Lógica de la conversación
// ---------------------------------------------------------------------------
/** Maneja el id de una fila de lista o de un botón tocado. */
async function procesarId(numero: string, rid: string): Promise<void> {
  if (rid.startsWith("sec_")) {
    await mostrarPreguntas(numero, Number(rid.split("_")[1]));
  } else if (PREGUNTAS.has(rid)) {
    await mostrarRespuesta(numero, rid);
  } else if (rid === "menu" || rid === "otra_sec") {
    await mostrarSecciones(numero, PREGUNTA_SECCIONES);
  } else if (rid.startsWith("otra_")) {
    await mostrarPreguntas(numero, Number(rid.split("_")[1]));
  } else if (rid === "fin") {
    await enviarTexto(numero, DESPEDIDA);
    estados.delete(numero);
  }
}

/** El usuario escribió texto libre en vez de tocar una opción. */
async function procesarTexto(numero: string): Promise<void> {
  const aviso = "Por favor, elegí una de las opciones.\n\n";
  const estado = estados.get(numero);
  if (!estado) {
    await mostrarSecciones(numero, SALUDO); // charla nueva
  } else if (estado.pantalla === "secciones") {
    await mostrarSecciones(numero, aviso + PREGUNTA_SECCIONES);
  } else if (estado.pantalla === "preguntas") {
    await mostrarPreguntas(numero, estado.n, aviso);
  } else {
    await mostrarPost(numero, estado.n, aviso);
  }
}

async function procesarMensaje(msg: MensajeEntrante): Promise<void> {
  const numero = msg.from;
  if (msg.type === "interactive") {
    const rid = (msg.interactive?.list_reply ?? msg.interactive?.button_reply)?.id;
    console.log(`Selección de ${numero}: ${rid}`);
    if (rid) await procesarId(numero, rid);
  } else {
    console.log(`Mensaje de ${numero} (tipo ${msg.type})`);
    await procesarTexto(numero);
  }
}

async function procesarWebhook(body: WebhookBody): Promise<void> {
  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      for (const msg of change.value?.messages ?? []) {
        if (msg.id) {
          if (mensajesProcesados.has(msg.id)) continue;
          if (mensajesProcesados.size > 10_000) mensajesProcesados.clear();
          mensajesProcesados.add(msg.id);
        }
        try {
          await procesarMensaje(msg);
        } catch (e) {
          console.error("Error procesando mensaje:", e);
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Servidor HTTP
// ---------------------------------------------------------------------------
function leerBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: Buffer) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error("Body demasiado grande"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function responder(res: ServerResponse, status: number, texto: string): void {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(texto);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");

  if (req.method === "GET" && url.pathname === "/") {
    return responder(res, 200, "Bot Muni activo"); // útil como health check
  }

  if (req.method === "GET" && url.pathname === "/webhook") {
    // Meta llama a este endpoint una vez para verificar el webhook.
    const ok =
      url.searchParams.get("hub.mode") === "subscribe" &&
      url.searchParams.get("hub.verify_token") === VERIFY_TOKEN;
    return ok
      ? responder(res, 200, url.searchParams.get("hub.challenge") ?? "")
      : responder(res, 403, "Token inválido");
  }

  if (req.method === "POST" && url.pathname === "/webhook") {
    let body: WebhookBody = {};
    try {
      body = JSON.parse(await leerBody(req)) as WebhookBody;
    } catch {
      /* body inválido: se ignora */
    }
    // Se responde 200 enseguida para que Meta no reintente; se procesa después.
    responder(res, 200, "OK");
    procesarWebhook(body).catch((e) => console.error("Error en webhook:", e));
    return;
  }

  responder(res, 404, "No encontrado");
});

server.listen(PORT, () => console.log(`Bot Muni escuchando en el puerto ${PORT}`));
