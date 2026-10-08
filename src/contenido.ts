// Contenido del bot: textos y preguntas frecuentes del Código de Edificación.
// Límites de WhatsApp para listas: máx. 10 filas en total, título de fila
// hasta 24 caracteres, descripción hasta 72, texto del botón hasta 20.

import type { Seccion } from "./types.js";

export const SALUDO =
  "¡Hola! Soy el asistente del Código de Edificación de la Municipalidad de Posadas.\n¿Qué sección querés consultar?\n\n_Las respuestas son síntesis de los artículos indicados; para casos concretos debe consultarse el texto completo y la normativa aplicable._\n*Nota:* Usa los botones de la parte inferior 👇";
export const PREGUNTA_SECCIONES = "¿Qué sección querés consultar?";
export const PREGUNTA_SEGUIR = "¿Qué querés hacer ahora?";
export const DESPEDIDA = "¡Gracias por tu consulta! Si necesitás algo más, escribinos cuando quieras.";
export const SECCIONES: Seccion[] = [
  {
    "id": 1,
    "titulo": "Generalidades",
    "nombre": "Generalidades",
    "descripcion": "Alcance, idioma, F.O.S., F.I.S., ochava",
    "preguntas": [
      {
        "id": "q_1",
        "corto": "Alcance del Código",
        "pregunta": "¿A qué tipo de propiedades e intervenciones se aplica el Código de Edificación?",
        "respuesta": "Se aplica tanto a propiedades públicas como privadas y alcanza el diseño, construcción, reforma, ampliación, demolición y mantenimiento de edificios, estructuras e instalaciones mecánicas, eléctricas, electromecánicas, sanitarias, térmicas y de inflamables.",
        "referencia": "Art. 1.1.2"
      },
      {
        "id": "q_2",
        "corto": "Idioma y unidades",
        "pregunta": "¿En qué idioma y sistema de unidades debe presentarse la documentación?",
        "respuesta": "La documentación debe estar escrita en idioma nacional, salvo tecnicismos sin equivalente, y todas las unidades de medida deben expresarse en el sistema métrico decimal.",
        "referencia": "Art. 1.1.3"
      },
      {
        "id": "q_3",
        "corto": "¿Qué es el F.O.S.?",
        "pregunta": "¿Qué es el F.O.S.?",
        "respuesta": "El Factor de Ocupación del Suelo (F.O.S.) es el porcentaje del terreno ocupado por la edificación o cubierto por su proyección sobre planta baja.",
        "referencia": "Art. 1.1.4"
      },
      {
        "id": "q_4",
        "corto": "¿Qué es el F.I.S.?",
        "pregunta": "¿Qué es el F.I.S.?",
        "respuesta": "El Factor de Infiltración del Suelo (F.I.S.) es el porcentaje de la superficie total del lote que debe quedar libre de edificación y/o pavimento que impida o dificulte la permeabilidad o infiltración del agua en el suelo.",
        "referencia": "Art. 1.1.4"
      },
      {
        "id": "q_5",
        "corto": "¿Qué es la ochava?",
        "pregunta": "¿Qué se entiende por ochava?",
        "respuesta": "Es la superficie en planta baja sobre la que rige una restricción al dominio particular y donde no se permite edificar. Se aplica a terrenos de esquina y se calcula formando un triángulo isósceles cuya hipotenusa es de 4,00 m.",
        "referencia": "Art. 1.1.4"
      },
      {
        "id": "q_6",
        "corto": "Obras no registradas",
        "pregunta": "¿Qué son las obras no registradas?",
        "respuesta": "Son las obras realizadas o habitadas sin haber cumplido los trámites correspondientes ante la Municipalidad.",
        "referencia": "Art. 1.1.4"
      }
    ]
  },
  {
    "id": 2,
    "titulo": "Administración",
    "nombre": "De la Administración",
    "descripcion": "Permisos, plazos, cartel y cuaderno de obra",
    "preguntas": [
      {
        "id": "q_7",
        "corto": "Permiso de construcción",
        "pregunta": "¿Cómo se realizan los trámites para solicitar el permiso de construcción?",
        "respuesta": "Los trámites para solicitar el permiso de construcción se realizan íntegramente mediante la plataforma digital municipal. Los códigos QR colocados en los planos por las direcciones certifican la validez de la documentación.",
        "referencia": "Art. 2.1.2"
      },
      {
        "id": "q_8",
        "corto": "Validez factibilidades",
        "pregunta": "¿Cuánto tiempo tienen de validez las factibilidades?",
        "respuesta": "Las factibilidades tienen una validez de ciento ochenta (180) días desde su fecha de emisión y deben presentarse al iniciar los demás trámites relacionados con la obra.",
        "referencia": "Art. 2.1.2"
      },
      {
        "id": "q_9",
        "corto": "Vencimiento del permiso",
        "pregunta": "¿Cuándo se considera vencido el permiso de inicio de obra si la obra no comenzó?",
        "respuesta": "Se considera vencido cuando transcurren dos (2) años desde su otorgamiento, contados a partir de la fecha de pago de los derechos, sin que la obra haya comenzado. En ese caso se invalida la documentación técnica y debe reiniciarse el trámite.",
        "referencia": "Art. 2.1.8.4"
      },
      {
        "id": "q_10",
        "corto": "Profesional en obra",
        "pregunta": "¿Qué función cumple el profesional en obra?",
        "respuesta": "El profesional debe estar en la obra todas las veces que la Dirección de Obras Privadas lo requiera.",
        "referencia": "Art. 2.2.7"
      },
      {
        "id": "q_11",
        "corto": "Cartel de obra",
        "pregunta": "¿Qué características debe tener el cartel de obra?",
        "respuesta": "Es obligatorio colocarlo al frente de toda obra. Debe ser el cartel reglamentario con la imagen proporcionada por la Municipalidad, impreso a color sobre material impermeable y rígido, en formato A1 (841 × 594 mm).",
        "referencia": "Art. 2.2.10"
      },
      {
        "id": "q_12",
        "corto": "Cuaderno de obra",
        "pregunta": "¿Cuándo se exige el cuaderno de obra?",
        "respuesta": "Se exige en obras a partir de trescientos metros cuadrados (300 m²) y también en los casos que determine la Dirección de Obras Privadas. Cumple la función del Libro de Actas de Inspecciones y Órdenes de Servicio del director de obra.",
        "referencia": "Art. 2.2.11"
      }
    ]
  },
  {
    "id": 3,
    "titulo": "Proyecto de las obras",
    "nombre": "Del Proyecto de las Obras",
    "descripcion": "Cercas, fachadas, locales, salidas y rampas",
    "preguntas": [
      {
        "id": "q_13",
        "corto": "Cerca frente al predio",
        "pregunta": "¿Cuándo es obligatorio colocar una cerca frente a un predio?",
        "respuesta": "Todo propietario de un predio baldío o edificado con frente a la vía pública debe construir y conservar la cerca cuando no exista fachada sobre la Línea Municipal, conforme al Código.",
        "referencia": "Art. 3.1.1.1"
      },
      {
        "id": "q_14",
        "corto": "Fachadas y aprobación",
        "pregunta": "¿Las fachadas visibles desde la vía pública necesitan aprobación municipal?",
        "respuesta": "Sí. Las fachadas de edificios sobre lugares públicos y visibles desde ellos están sujetas a aprobación especial del Municipio, y deben presentarse planos detallados con materiales, acabados y colores.",
        "referencia": "Art. 3.2.2.1"
      },
      {
        "id": "q_15",
        "corto": "Área mínima de cocina",
        "pregunta": "¿Cuál es el área mínima de una cocina?",
        "respuesta": "Una cocina debe tener un área mínima de 3,00 m² y un lado no inferior a 1,50 m.",
        "referencia": "Art. 3.3.3.2"
      },
      {
        "id": "q_16",
        "corto": "Luz y ventilación",
        "pregunta": "¿Qué condiciones generales establece el Código para la iluminación y ventilación de un local de primera clase?",
        "respuesta": "Debe iluminar y ventilar al espacio urbano o a patios de primera clase. El patio mínimo debe tener un lado de 3,00 m y una superficie de 12,00 m². Además, debe utilizarse ventilación cruzada.",
        "referencia": "Art. 3.3.4.2"
      },
      {
        "id": "q_17",
        "corto": "Puertas de salida",
        "pregunta": "¿Cuál es el ancho mínimo acumulado de las puertas de salida para hasta 50 personas?",
        "respuesta": "El ancho acumulado mínimo es de 0,90 m cuando la capacidad de uso es de hasta 50 personas. Se agregan 0,15 m por cada 50 personas de exceso o fracción, salvo las reglas específicas para lugares de espectáculos públicos.",
        "referencia": "Art. 3.4.4.1"
      },
      {
        "id": "q_18",
        "corto": "Rampas de accesibilidad",
        "pregunta": "¿Qué medidas básicas deben cumplir las rampas de accesibilidad?",
        "respuesta": "La pendiente máxima indicada es del 12 % cuando cuentan con barandas y cordones; la longitud máxima de cada plano inclinado es de 5,00 m, con descansos de al menos 1,50 m; el ancho mínimo es de 0,90 m y deben contar con dos pasamanos a cada lado, a 0,70 m y 0,90 m de altura.",
        "referencia": "Art. 3.10.4.1"
      }
    ]
  },
  {
    "id": 4,
    "titulo": "Ejecución de las obras",
    "nombre": "De la Ejecución de las Obras",
    "descripcion": "Vallas, excavaciones, suelos y cimientos",
    "preguntas": [
      {
        "id": "q_19",
        "corto": "Valla provisoria",
        "pregunta": "¿Cuándo debe colocarse una valla provisoria al frente de la obra?",
        "respuesta": "Antes de iniciar una obra debe colocarse una valla provisoria al frente del predio, abarcando toda su extensión, cuando el trabajo sea peligroso o signifique un obstáculo para el tránsito en la vía pública.",
        "referencia": "Art. 4.1.1.1"
      },
      {
        "id": "q_20",
        "corto": "Altura de la valla",
        "pregunta": "¿Qué altura mínima debe tener la valla provisoria?",
        "respuesta": "La valla provisoria al frente de una obra debe tener una altura no menor de 2,50 m.",
        "referencia": "Art. 4.1.1.3"
      },
      {
        "id": "q_21",
        "corto": "Plazo de excavaciones",
        "pregunta": "¿En cuánto tiempo debe terminarse una excavación que afecta a linderos o a la vía pública?",
        "respuesta": "Debe terminarse dentro de los 180 días corridos desde su comienzo, salvo que la Municipalidad acuerde un plazo mayor para obras de gran magnitud.",
        "referencia": "Art. 4.2.2.4"
      },
      {
        "id": "q_22",
        "corto": "Estudio de suelos",
        "pregunta": "¿Cuándo se exige un estudio de suelos?",
        "respuesta": "Debe presentarse para obras a partir de tres plantas, es decir, planta baja y dos pisos, o subsuelo, planta baja y un piso. La Municipalidad también puede exigirlo cuando lo considere necesario.",
        "referencia": "Art. 4.3.2.1"
      },
      {
        "id": "q_23",
        "corto": "Calidad de materiales",
        "pregunta": "¿Qué facultades tiene la Municipalidad respecto de la calidad de los materiales?",
        "respuesta": "Puede impedir el empleo de materiales o productos que considere impropios, exigir determinadas proporciones de mezclas y hormigones y establecer requisitos de resistencia y calidad mediante resoluciones o dictámenes. También puede disponer ensayos para verificar calidad y resistencia.",
        "referencia": "Arts. 4.4.2.1 y 4.4.2.2"
      },
      {
        "id": "q_24",
        "corto": "Cimiento muro interior",
        "pregunta": "¿Cuál es la profundidad mínima de un cimiento para un muro interior que no sea de sostén?",
        "respuesta": "La profundidad mínima es de 0,30 m, medida desde el suelo próximo más bajo. Si el tabique tiene un espesor no mayor de 0,10 m, puede apoyarse directamente sobre el contrapiso.",
        "referencia": "Art. 4.6.2.1"
      }
    ]
  },
  {
    "id": 5,
    "titulo": "Instalaciones",
    "nombre": "De las Instalaciones Complementarias",
    "descripcion": "Instalaciones complementarias: ascensores, sanitarias, gas",
    "preguntas": [
      {
        "id": "q_25",
        "corto": "Plano de ascensor",
        "pregunta": "¿Qué información básica debe figurar en el plano de obra civil de un ascensor?",
        "respuesta": "Debe incluir, entre otros datos, el estudio de tráfico, dimensiones de la caja, claros superior e inferior, sala de máquinas, accesos, ventilación e iluminación, cantidad y tipo de ascensores, capacidad máxima, velocidad y acceso desde la vía pública hasta el rellano.",
        "referencia": "Art. 5.1.1"
      },
      {
        "id": "q_26",
        "corto": "Número de ocupantes",
        "pregunta": "¿Cómo se determina el número teórico de ocupantes de un edificio?",
        "respuesta": "Se determina mediante el coeficiente de ocupación, que expresa el número teórico de personas que puede acomodarse según la superficie de piso y la proporción de personas por metros cuadrados indicada en el cuadro correspondiente.",
        "referencia": "Art. 5.2.1.1"
      },
      {
        "id": "q_27",
        "corto": "Servicios de salubridad",
        "pregunta": "¿Qué servicios mínimos de salubridad debe haber en todo predio donde se habite o trabaje?",
        "respuesta": "Debe existir, como mínimo, un retrete con solado impermeable y paredes revestidas con material resistente, una pileta de cocina, una ducha con desagüe de piso y las demás exigencias que correspondan según las normas de O.S.N./S.A.M.S.A.",
        "referencia": "Art. 5.6.1.1"
      },
      {
        "id": "q_28",
        "corto": "Pozo absorbente",
        "pregunta": "¿Qué requisitos básicos tiene un pozo absorbente en zonas sin red cloacal?",
        "respuesta": "Debe integrar el sistema cloacal estático/cerrado junto con la cámara de inspección y cámara séptica, o un sistema equivalente. El pozo absorbente debe tener como mínimo 1,00 m de diámetro y 3,00 m de profundidad; además, debe estar a 15 m como mínimo del pozo de agua, 1,50 m del eje medianero y 1,00 m de la Línea Municipal.",
        "referencia": "Art. 5.6.5"
      },
      {
        "id": "q_29",
        "corto": "Aguas pluviales",
        "pregunta": "¿Cómo deben manejarse las aguas pluviales de techos, azoteas y terrazas?",
        "respuesta": "Deben conducirse de manera que no caigan directamente sobre la vía pública ni sobre predios linderos. El edificio y su terreno deben estar preparados para permitir el escurrimiento de las aguas hacia la vía pública, conforme a las condiciones del Código.",
        "referencia": "Art. 5.6.10"
      },
      {
        "id": "q_30",
        "corto": "Garrafas de gas",
        "pregunta": "¿Dónde deben colocarse las garrafas de menos de 45 kg?",
        "respuesta": "Deben instalarse en una casilla ubicada en patio abierto, tanto en viviendas como en edificios públicos, comerciales y otros. La casilla puede ubicarse bajo escalera si ventila a patio abierto y descubierto, y debe ser de material incombustible.",
        "referencia": "Art. 5.7.1"
      }
    ]
  }
];