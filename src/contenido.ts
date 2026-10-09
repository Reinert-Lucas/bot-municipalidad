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
    "descripcion": "Alcance del Código de Edificación",
    "preguntas": [
      {
        "id": "q_1",
        "corto": "Alcance del Código",
        "pregunta": "¿Qué alcances tiene el Código de Edificación vigente?",
        "respuesta": "Se aplica a propiedades públicas y privadas, y abarca el diseño, la construcción, reforma, ampliación, demolición y mantenimiento de edificios, estructuras e instalaciones mecánicas, eléctricas, electromecánicas, sanitarias, térmicas y de inflamables. Establece las especificaciones técnicas mínimas para garantizar la habitabilidad y la seguridad de las obras dentro del ejido de la ciudad.",
        "referencia": "Art. 1.1.2"
      }
    ]
  },
  {
    "id": 2,
    "titulo": "Administración",
    "nombre": "De la Administración",
    "descripcion": "Trámites, planos, permisos y vencimientos",
    "preguntas": [
      {
        "id": "q_2",
        "corto": "Trámite de planos",
        "pregunta": "¿Cómo se tramita la aprobación o regularización de planos municipales?",
        "respuesta": "Todos los trámites para solicitar el permiso de construcción se realizan íntegramente en la plataforma digital GOP: https://posadas.gestiondeobrasprivadas.com.ar",
        "referencia": "Art. 2.1.2"
      },
      {
        "id": "q_3",
        "corto": "Obras a declarar",
        "pregunta": "¿Qué tipo de obras debo declarar ante el Municipio?",
        "respuesta": "Todo tipo de obras, sin importar su estado, deben declararse y controlarse ante las Direcciones de Catastro, Edificación, Obras Privadas y Urbanismo: obras nuevas, reformas, ampliaciones y existentes, con o sin permiso.\n\nLos trámites los gestionan quienes acrediten interés legítimo (poseedores a título de dueño, adjudicatarios de viviendas que sean tenedores precarios o tengan dominio sobre ellas) y los profesionales habilitados en el Sistema de Gestión de Obras (apartados 2.3.10.4 y 2.3.10.5). La gestión de los trámites es responsabilidad exclusiva de los profesionales involucrados.",
        "referencia": "Art. 2.1.1"
      },
      {
        "id": "q_4",
        "corto": "Trabajos preliminares",
        "pregunta": "¿Qué trabajos pueden hacerse solo con permiso de trabajos preliminares?",
        "respuesta": "Trabajos de poca importancia en fachadas sobre la línea municipal o hasta 1,00 m de ella: cambio de pintura, limpieza de frente (aunque requiera andamios o cerrar parcialmente la vereda), tabiquería e iluminación, cambio de puertas y ventanas que no afecten la fachada o la estructura, cercos, veredas y reparaciones de revoque. En edificios de uso público, además: alfombrados, mobiliario, refacciones simples, pintura y cielorraso.\n\nSolo si no cambian ni aumentan la superficie, en edificaciones posteriores a 1960 y no incluidas en la Ordenanza Patrimonial. Se indica el tipo de trabajo y su duración y, si hace falta, un croquis firmado por profesional matriculado. Donde haya red de gas, se adjunta la factibilidad de GAS NEA.",
        "referencia": "Art. 2.1.6"
      },
      {
        "id": "q_5",
        "corto": "Plano de estructuras",
        "pregunta": "¿Qué debe incluir un plano de estructuras?",
        "respuesta": "• Carátula reglamentaria (punto 2.1.7.2, fig. 7).\n• Plantas de replanteo, de fundaciones y de cada nivel, con la cota de fundación y la tensión del suelo utilizada; incluir estructuras de ascensor y sala de máquinas.\n• Planillas de cálculo de zapatas, losas, vigas, columnas y tabiques, con la sobrecarga de uso de cada una (numeradas igual que en los planos).\n• Planos de detalle de cimientos, elementos estructurales, cubiertas pesadas y encastres de canaleta (esc. 1:20 si la Dirección lo solicita) y plano de techo liviano si corresponde.\n• Memoria de cálculo solo en PDF, al terminar el trámite de aprobación.\n\nAdemás: estudio de suelos (punto 2.3.8.3) y, si la Dirección lo considera necesario, verificación de estructuras de edificios existentes.",
        "referencia": "Art. 2.1.3.d"
      },
      {
        "id": "q_6",
        "corto": "Pedir inicio de obra",
        "pregunta": "¿Cuándo puedo pedir el inicio de obra?",
        "respuesta": "Una vez aprobado el plano de arquitectura y abonados los derechos de construcción, se puede solicitar el inicio de obra.",
        "referencia": "Art. 2.1.8.3"
      },
      {
        "id": "q_7",
        "corto": "Plano aprobado",
        "pregunta": "¿Cuándo se considera aprobado un plano?",
        "respuesta": "Los planos se aprueban si cumplen los requisitos del Código y presentan toda otra documentación que soliciten las direcciones pertinentes. Para la aprobación se debe abonar el importe de los derechos y permisos de construcción.",
        "referencia": "Art. 2.1.8.3"
      },
      {
        "id": "q_8",
        "corto": "Permiso preliminares",
        "pregunta": "¿Puedo pedir un permiso de trabajos preliminares?",
        "respuesta": "Se puede solicitar cuando ya se inició el trámite de aprobación de planos y siempre que no se trate de edificaciones que pudieran tener interés patrimonial.",
        "referencia": "Art. 2.1.8.7"
      },
      {
        "id": "q_9",
        "corto": "Trabajos menores",
        "pregunta": "¿Cómo se tramita un permiso para trabajos menores?",
        "respuesta": "Para pequeñas reformas, trabajos en fachadas, etc., el profesional debe comunicarlo por nota. Se puede solicitar en GOP mediante el trámite de trabajos preliminares, con una memoria descriptiva de las tareas a ejecutar y, si es necesario, planos y otra documentación técnica.",
        "referencia": "Art. 2.1.8.7"
      },
      {
        "id": "q_10",
        "corto": "Vencimiento del permiso",
        "pregunta": "¿Tiene vencimiento el permiso de inicio de obra?",
        "respuesta": "• Obra iniciada y no terminada: pasados dos años del otorgamiento, se puede pedir una prórroga del plazo de caducidad, a consideración de la autoridad. Si se rechaza con fundamentos, hay que gestionar una nueva solicitud cumpliendo todos los requisitos.\n• Obra sin comenzar: el permiso vence a los dos años, contados desde el pago de los derechos. Se invalida toda la documentación técnica y debe reiniciarse el trámite de aprobación.",
        "referencia": "Art. 2.1.8.4"
      }
    ]
  },
  {
    "id": 3,
    "titulo": "Proyecto de las obras",
    "nombre": "Del Proyecto de las Obras",
    "descripcion": "Cercos, desagües y salientes de la línea municipal",
    "preguntas": [
      {
        "id": "q_11",
        "corto": "Cerco en baldíos",
        "pregunta": "¿Estoy obligado a construir un cerco en el frente de un terreno baldío?",
        "respuesta": "Sí. Todo propietario de un predio baldío o edificado con frente a la vía pública debe construir y conservar la cerca en su frente si no hay fachada sobre la Línea Municipal. La cerca separa la propiedad privada del espacio público.\n\nEl dueño de un predio edificado queda eximido si mantiene frente a su predio un jardín o solado en buen estado y genera límites materiales que indiquen la división.",
        "referencia": "Art. 3.1.1.1"
      },
      {
        "id": "q_12",
        "corto": "Desagües a la vereda",
        "pregunta": "¿Puedo desagotar aires acondicionados y desagües pluviales a la vereda?",
        "respuesta": "Los conductos de lluvia, desagües pluviales y de aires acondicionados pueden ser visibles en la fachada principal si respetan su estilo, pero deben conectarse bajo la vereda a la red pluvial.\n\nLos caños de ventilación de cloacas domiciliarias u otros conductos no pueden ejecutarse sobre la vía pública, salvo que se traten arquitectónicamente junto con la fachada. La tubería vertical se adosa al muro divisorio, salvo prohibición en las normas de instalaciones para usos especiales.",
        "referencia": "Art. 3.2.2.4"
      },
      {
        "id": "q_13",
        "corto": "Salientes de la L.M.",
        "pregunta": "¿Qué puedo construir por fuera de la Línea Municipal?",
        "respuesta": "En la fachada principal solo se permite sobresalir:\n• Hasta 3,00 m de altura: umbrales y antepechos hasta 0,02 m; ménsulas de balcones o voladizos, listeles, guardapolvos y otros motivos de ornato a más de 2,30 m de altura. No pueden sobresalir hojas de puertas o ventanas, cortinas, celosías, barandas, rejas ni otro elemento fijo o móvil.\n• Sobre 3,00 m: en calles y avenidas de 10 a 20 m de ancho, cuerpos cerrados y balcones hasta 1/12 del ancho de la calle; en avenidas de 23 m o más, desde 1/12 del ancho hasta 2,00 m.\n\nNo rige en sectores con regulaciones específicas del Código de Planeamiento Urbano. En esquina, las salientes de los niveles superiores mantienen la medida permitida de la calle más angosta.",
        "referencia": "Art. 3.2.3.1"
      },
      {
        "id": "q_27",
        "corto": "Columnas en Ochava",
        "pregunta": "¿Se pueden construir columnas en ochava?",
        "respuesta": "No se admite la ejecución de columnas en ochavas, está prohibido.",
        "referencia": "Art. 3.2.3.5"
      },
      {
        "id": "q_28",
        "corto": "Local de primera clase",
        "pregunta": "¿Cuál es el patio permitido para iluminar y ventilar un local de primera clase?",
        "respuesta": "Un local de primera clase debe iluminar y ventilar al espacio urbano o a patios de primera clase, según las dimensiones indicadas por las normativas urbanísticas vigentes. El patio mínimo tendrá un lado mínimo de 3.00 m y una superficie mínima de 12.00 m2. Los patios no podrán cubrirse con elementos fijos ni claraboyas vidriadas ni corredizas. Solo se aceptan pérgolas de madera, metálicas o toldos.",
        "referencia": "Art. 3.3.4.2"
      },
      {
        "id": "q_29",
        "corto": "Accesos Vehiculares",
        "pregunta": "¿Existe una cantidad máxima de accesos vehiculares según el ancho del terreno?",
        "respuesta": "Un local de primera clase debe iluminar y ventilar al espacio urbano o a patios de primera clase, según las dimensiones indicadas por las normativas urbanísticas vigentes. El patio mínimo tendrá un lado mínimo de 3.00 m y una superficie mínima de 12.00 m2. Los patios no podrán cubrirse con elementos fijos ni claraboyas vidriadas ni corredizas. Solo se aceptan pérgolas de madera, metálicas o toldos.",
        "referencia": "Art. 3.4.10.1"
      },
      {
        "id": "q_30",
        "corto": "Altura Minima de un Local",
        "pregunta": "¿Cuál es la altura mínima permitida de un local?",
        "respuesta": "Un local de primera clase debe iluminar y ventilar al espacio urbano o a patios de primera clase, según las dimensiones indicadas por las normativas urbanísticas vigentes. El patio mínimo tendrá un lado mínimo de 3.00 m y una superficie mínima de 12.00 m2. Los patios no podrán cubrirse con elementos fijos ni claraboyas vidriadas ni corredizas. Solo se aceptan pérgolas de madera, metálicas o toldos.",
        "referencia": "Art. 3.2.3.5"
      },
      {
        "id": "q_31",
        "corto": "Acceso a cochera en Ochava",
        "pregunta": "¿Puedo poner el acceso a cochera por la ochava?",
        "respuesta": "Una salida para vehículos no puede ubicarse en la línea municipal de esquina (ochava) y, cuando ésta exista, la salida estará alejada no menos de tres metros (3,00 m) del encuentro de las líneas municipales de las calles concurrentes.",
        "referencia": "Art. 3.4.10.2"
      }, 
      {
        "id": "q_32",
        "corto": "Ventana sobre Medianero",
        "pregunta": "¿Puedo construir una ventana sobre muro medianero?",
        "respuesta": "No se permiten vistas a predios colindantes, ni entre unidades de uso independiente de un mismo predio, desde cualquier lugar situado a menor distancia que tres metros (3,00 m) del eje divisorio entre predios, o entre paramentos exteriores de locales correspondientes a unidades independientes. Si tiene un tapial de un metro con ochenta centímetros (1,80 m) como mínimo, es considerado interceptor de vista.",
        "referencia": "Art. 3.7.1"
      }
    ]
  },
  {
    "id": 4,
    "titulo": "Ejecución de las obras",
    "nombre": "De la Ejecución de las Obras",
    "descripcion": "Vallas, carteles, horarios, demoliciones y andamios",
    "preguntas": [
      {
        "id": "q_14",
        "corto": "Vallas de obra",
        "pregunta": "¿Debo colocar vallas al frente de las obras?",
        "respuesta": "Sí. Antes de iniciar la obra se debe colocar una valla provisoria al frente del predio, en toda su extensión, para cualquier trabajo peligroso o que obstaculice el tránsito en la vía pública. No puede tener puntas filosas ni elementos salientes, debe evitar daños o dificultades de paso a los peatones e impedir que escurran materiales sólidos.\n\nPuede ser de tablas de madera cepilladas, placas lisas de metal u otro material que acepte la Municipalidad, de altura uniforme y sin interrupciones; las puertas nunca abren hacia afuera. En zonas con red de gas se debe obtener la factibilidad de GAS NEA.",
        "referencia": "Art. 4.1.1.1"
      },
      {
        "id": "q_15",
        "corto": "Medidas de la valla",
        "pregunta": "¿Qué medidas y ubicación debe tener la valla? ¿Y si obstaculiza el paso?",
        "respuesta": "La valla debe tener una altura mínima de 2,50 m. Su separación de la línea municipal no puede superar la mitad del ancho de la vereda, y debe dejar un paso libre de 1,00 m entre la valla y el cordón (o la línea de árboles). No puede rebasar los límites laterales de la vereda del predio.\n\nSi no queda un paso libre de al menos 0,70 m, se ejecuta una pasarela de 0,90 m de ancho con baranda exterior pintada con franjas inclinadas rojas y blancas, y luz roja de noche en el ángulo exterior que enfrenta al tránsito de vehículos.",
        "referencia": "Art. 4.1.1.3"
      },
      {
        "id": "q_16",
        "corto": "Retiro del vallado",
        "pregunta": "¿Cuándo debo retirar el vallado de obra?",
        "respuesta": "Cuando deja de ser necesaria la ocupación de la vía pública a juicio de la Municipalidad, o cuando la obra está paralizada por 3 meses: en ese caso la valla debe trasladarse a la línea municipal. Cuando se libera el ancho total de la vereda, se ejecuta sobre ella el solado definitivo reglamentario.",
        "referencia": "Cap. 4.1"
      },
      {
        "id": "q_17",
        "corto": "Cartel de obra",
        "pregunta": "¿Es obligatorio colocar un cartel de obra?",
        "respuesta": "Sí, al frente de toda obra con permiso. Debe indicar: nombre completo (sin abreviaturas), título y matrícula de los profesionales y empresas (con sus Representantes Técnicos) que firmen en el expediente; número de expediente de obra; fecha de concesión del permiso; y destino de la obra.\n\nSe coloca en el cerco de obra o en la línea municipal, a una altura no mayor de 3 m.",
        "referencia": "Art. 4.1.2"
      },
      {
        "id": "q_18",
        "corto": "Horario de obra",
        "pregunta": "¿En qué horario se puede trabajar en una obra?",
        "respuesta": "De 7:00 a 17:00 hs, respetando las horas de descanso fijadas por las Ordenanzas correspondientes. Se pueden solicitar permisos especiales ante la Municipalidad.",
        "referencia": "Art. 4.1.3.6"
      },
      {
        "id": "q_19",
        "corto": "Permiso de demolición",
        "pregunta": "¿Se necesita permiso para demoler?",
        "respuesta": "Sí. No puede iniciarse ningún trabajo de demolición sin el permiso de la Municipalidad.\n\nSi el polvo o los escombros molestan al tránsito, el responsable debe limpiar la calle las veces que sea necesario. Si la demolición genera peligro para el tránsito, se deben usar todos los recursos técnicos disponibles para evitarlo, colocar señales visibles de precaución y ubicar a cada costado de la obra personas que avisen del peligro a los transeúntes.",
        "referencia": "Arts. 4.5.1.2, 4.5.2.2 y 4.5.2.3"
      },
      {
        "id": "q_20",
        "corto": "Tipos de andamios",
        "pregunta": "¿Qué tipos de andamios están permitidos?",
        "respuesta": "Los materiales y accesorios deben estar en buen estado y ser suficientemente resistentes. La madera debe tener fibras largas y nudos que no tomen más de 1/4 de la sección de la pieza; las partes metálicas no pueden estar abiertas, agrietadas, deformadas ni corroídas; los cables y cuerdas deben tener un coeficiente de seguridad de al menos 10 según la carga máxima.\n\nPara albañilería se usan andamios fijos o pesados suspendidos; para revoque, pintura, limpieza o reparaciones también livianos suspendidos u otros autorizados por el Código o la Municipalidad.",
        "referencia": "Art. 4.13.1.1"
      },
      {
        "id": "q_21",
        "corto": "Andamios en vereda",
        "pregunta": "¿Puedo colocar andamios en la vereda?",
        "respuesta": "Sí, dentro del recinto autorizado para la valla provisoria, sin ocultar chapas de nomenclatura, señalización de alumbrado ni bocas de incendio. Si se afectan soportes de alumbrado u otros servicios públicos, hay que avisar con al menos 15 días de anticipación.\n\nDeben retirarse 24 hs después de concluida la obra, o 15 días después de paralizada (salvo fuerza mayor); si la obra se paraliza más de 2 meses, se quitan también la valla y cualquier obstáculo al tránsito. Si no se cumple, la Municipalidad ejecuta los trabajos a costa del responsable, sin perjuicio de las penalidades.",
        "referencia": "Cap. 4.13"
      },
      {
        "id": "q_22",
        "corto": "Descarga de materiales",
        "pregunta": "¿Puedo usar la vereda para descargar materiales?",
        "respuesta": "No. Está prohibido descargar y ocupar la vía pública (calzada y espacio fuera de la valla) con materiales, máquinas o escombros: deben pasar directamente del camión al interior de la obra y viceversa. Son responsables solidarios el constructor y el propietario.\n\nExcepción: contenedores, que pueden quedar en la vereda hasta 24 hs, de hasta 3,30 m x 1,70 m y con su lado mayor paralelo a la línea municipal. No pueden ir sobre la calzada ni entre la valla y el cordón, salvo que ese espacio mida 3,00 m o más: allí se ubican junto a la valla, dejando 1,30 m libres para peatones.",
        "referencia": "Art. 4.14.4"
      }
    ]
  },
  {
    "id": 5,
    "titulo": "Instalaciones",
    "nombre": "De las Instalaciones Complementarias",
    "descripcion": "Instalaciones complementarias: cloacas y pozo absorbente",
    "preguntas": [
      {
        "id": "q_23",
        "corto": "Sin red cloacal",
        "pregunta": "¿Cómo procedo si no hay red cloacal cercana al terreno donde voy a construir?",
        "respuesta": "Las zonas sin red cloacal deben instalar un sistema cloacal estático/cerrado, compuesto al final por cámara de inspección, cámara séptica y pozo absorbente, o los sistemas equivalentes del Código.\n\nEl pozo absorbente debe tener como mínimo 1,00 m de diámetro y 3,00 m de profundidad, y estar a 15 m del pozo de agua, a 1,50 m del eje medianero y a 1,00 m de la Línea Municipal.",
        "referencia": "Art. 5.6.5"
      }
    ]
  },
  {
    "id": 6,
    "titulo": "Reglamentos técnicos",
    "nombre": "De los Reglamentos Técnicos",
    "descripcion": "Próximamente",
    "preguntas": []
  },
  {
    "id": 7,
    "titulo": "Integración patrimonial",
    "nombre": "Integración y Preservación Patrimonial",
    "descripcion": "Próximamente",
    "preguntas": []
  },
  {
    "id": 8,
    "titulo": "Usos específicos",
    "nombre": "Usos Específicos",
    "descripcion": "Cocheras",
    "preguntas": [
      {
        "id": "q_24",
        "corto": "Módulo de cochera",
        "pregunta": "¿Cuál es el módulo mínimo reglamentario de cochera?",
        "respuesta": "Cada cochera debe tener una longitud igual a la del vehículo más un 20 %, con un mínimo de 2,50 m por 5,00 m. Para vehículos adaptados, la superficie mínima es de 20 m² con un lado mínimo de 4,00 m. Cada módulo de cochera corresponde a un solo vehículo.",
        "referencia": "Art. 8.8.4.1"
      }
    ]
  },
  {
    "id": 9,
    "titulo": "Veredas",
    "nombre": "De las Veredas",
    "descripcion": "Responsabilidad, pendientes y niveles de las veredas",
    "preguntas": [
      {
        "id": "q_25",
        "corto": "Ejecución de veredas",
        "pregunta": "¿De quién es la responsabilidad de ejecutar las veredas?",
        "respuesta": "Donde exista cordón cuneta, con o sin pavimento, los propietarios de inmuebles, baldíos o edificados, deben ejecutar las veredas según las condiciones del Código y mantenerlas en óptimas condiciones para garantizar la transitabilidad, la limpieza y la seguridad peatonal.",
        "referencia": "Art. 9.1.1"
      },
      {
        "id": "q_26",
        "corto": "Pendiente de veredas",
        "pregunta": "¿Cuál es la pendiente máxima permitida para una vereda reglamentaria?",
        "respuesta": "La pendiente transversal debe ser de 2 % a 5 % entre la línea de edificación y el cordón cuneta; la longitudinal la determina el cordón cuneta. Si dos inmuebles lindantes tienen veredas a distinto nivel, la transición se hace con un plano inclinado de pendiente máxima 12 %, nunca con escalón, en el terreno de la vereda que no esté a nivel definitivo y a cargo de su propietario.\n\nSi se supera la pendiente transversal, se puede ejecutar una rampa o escalera en la franja de servicios. Los desniveles de ingreso deben resolverse dentro de la línea municipal, sin invadir la franja de circulación. Los terrenos escarpados tienen consideraciones particulares.",
        "referencia": "Art. 9.1.4.2"
      }
    ]
  },
  {
    "id": 10,
    "titulo": "Inspecciones y sanciones",
    "nombre": "Inspecciones, Infracciones y Sanciones",
    "descripcion": "Próximamente",
    "preguntas": []
  }
];