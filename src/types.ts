// Tipos del webhook de WhatsApp (solo lo que usamos)
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

// Estado de las conversaciones (en memoria; se pierde al reiniciar).
// Sin estado = charla nueva o terminada.
type Estado =
  | { pantalla: "secciones" }
  | { pantalla: "preguntas"; n: number }
  | { pantalla: "post"; n: number };

interface Fila {
  id: string;
  titulo: string;
  descripcion?: string;
}

interface Pregunta {
  id: string; // "q_1" ... "q_30"
  corto: string; // título de la fila (máx. 24 caracteres)
  pregunta: string;
  respuesta: string;
  referencia: string;
  url?: string
}

interface Seccion {
  id: number;
  titulo: string; // título corto para la lista (máx. 24 caracteres)
  nombre: string; // nombre oficial de la sección
  descripcion: string; // máx. 72 caracteres
  preguntas: Pregunta[];
}

export type { MensajeEntrante, WebhookBody, Estado, Fila, Pregunta, Seccion };