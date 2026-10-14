// Contenido del bot: textos y preguntas frecuentes del Código de Edificación.
// Límites de WhatsApp para listas: máx. 10 filas en total, título de fila
// hasta 24 caracteres, descripción hasta 72, texto del botón hasta 20.

import type { Seccion } from "./types.js";

export const SALUDO =
  `Hola🙋‍♂️ 
Soy el asistente del Código de Edificación de la Municipalidad de Posadas.
¿Qué sección querés consultar?
  
_Las respuestas son síntesis de los artículos indicados y pueden contener errores; ante cualquier duda debe consultarse el texto completo y la normativa aplicable._
  
*Nota:* Usa los botones de la parte inferior 👇`;
export const PREGUNTA_SECCIONES = "¿Qué sección querés consultar?🤔";
export const PREGUNTA_SEGUIR = "¿Qué querés hacer ahora?🤔";
export const DESPEDIDA = `¡Gracias por tu consulta!😁 Si necesitás algo más, escribinos cuando quieras.
*Links que te pueden interesar:*
✅ Sistema GOP: https://posadas.gestiondeobrasprivadas.com.ar/
✅ Web de la Municipalidad: https://posadas.gov.ar/
✅ Web de la Secretaría de Planificación: https://posadas.gov.ar/planurbano/
✅ Instagram de la Secretaría de Planificación: https://instagram.com/planiestrategicayterritorial/
✅ Facebook de la Secretaría de Planificación: https://facebook.com/secretariadeplanificacionestrategicayterritorial/
✅ Código de Edificación: https://drive.google.com/file/d/1eyLxb_MMhSKjQor9YqzGRm3XGLKgSDh_/view/`;
export const SECCIONES: Seccion[] = [
  {
    "id": 2,
    "titulo": "Administración",
    "nombre": "De la Administración",
    "descripcion": "Trámites, planos, permisos y vencimientos",
    "preguntas": [
      {
        "id": "q_1",
        "corto": "Factibilidad de EMSA",
        "pregunta": "¿Cuándo debo presentar la factibilidad de EMSA?",
        "respuesta": "En el caso de que la potencia total supere los cincuenta kilowatts (50 kW) o cuarenta kilo volt amper (40 kVA), a partir de cuatro (4) unidades funcionales o su complejidad lo exija, se deberá adjuntar factibilidad de EMSA antes de iniciar la corrección de las instalaciones complementarias. Se deberá presentar la documentación con las propuestas aceptadas por Energía de Misiones para subestaciones transformadoras para sesenta y tres kilo volt amper (63 kVA) y doscientos kilo volt amper (200 kVA) o bien subestaciones externas en casos excepcionales estipulados por Energía Misiones y acorde a la factibilidad de veredas autorizadas por el municipio. Ver gráficos en 5.15.1 'cámaras transformadoras en edificios'.",
        "referencia": "Art. 2.1.2.2.b"
      },
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
    "descripcion": "Cercos, desagües, salientes, alturas, columnas",
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
        "id": "q_14",
        "corto": "Hojas de ventanas y puertas sobre LM",
        "pregunta": "¿Se pueden batir hojas de ventanas o puertas sobre la línea municipal?",
        "respuesta": "Queda prohibido batir las hojas de puertas y portones o ventanas hacia la vereda cuando sobrepasen la línea municipal, como así también la colocación de carpintería con salientes que sobrepasan la línea municipal.",
        "referencia": "Art. 3.2.3.4"
      },
      {
        "id": "q_15",
        "corto": "Local de primera clase",
        "pregunta": "¿Cuál es el patio permitido para iluminar y ventilar un local de primera clase?",
        "respuesta": "Un local de primera clase debe iluminar y ventilar al espacio urbano o a patios de primera clase, según las dimensiones indicadas por las normativas urbanísticas vigentes. El patio mínimo tendrá un lado mínimo de 3.00 m y una superficie mínima de 12.00 m2. Los patios no podrán cubrirse con elementos fijos ni claraboyas vidriadas ni corredizas. Solo se aceptan pérgolas de madera, metálicas o toldos.",
        "referencia": "Art. 3.3.4.2"
      },
      {
        "id": "q_16",
        "corto": "Accesos Vehiculares",
        "pregunta": "¿Existe una cantidad máxima de accesos vehiculares según el ancho del terreno?",
        "respuesta": "Según el/los frentes que tiene el lote se tendrá las cantidades y dimensión de salidas para vehículos [Ver Tabla ☝️].",
        "referencia": "Art. 3.4.10.1"
      },
      {
        "id": "q_17",
        "corto": "Altura Minima de un Local",
        "pregunta": "¿Cuál es la altura mínima permitida de un local?",
        "respuesta": "La altura mínima de cada local varía de acuerdo a su clase y uso. La altura libre y la distancia entre solados, mínimas, son las siguientes [Ver Tabla ☝️].",
        "referencia": "Art. 3.2.3.5"
      },
      {
        "id": "q_18",
        "corto": "Accesos y Columnas en Ochava",
        "pregunta": "¿Puedo poner un acceso a cochera y/o columnas en la ochava?",
        "respuesta": "Una salida para vehículos no puede ubicarse en la línea municipal de esquina (ochava) y, cuando ésta exista, la salida estará alejada no menos de tres metros (3,00 m) del encuentro de las líneas municipales de las calles concurrentes. Tampoco se admite la ejecución de columnas en ochavas, está prohibido.",
        "referencia": "Art. 3.4.10.2 y 3.2.3.5"
      }, 
      {
        "id": "q_19",
        "corto": "Ventana sobre Medianero",
        "pregunta": "¿Puedo construir una ventana sobre muro medianero?",
        "respuesta": "No se permiten vistas a predios colindantes, ni entre unidades de uso independiente de un mismo predio, desde cualquier lugar situado a menor distancia que tres metros (3,00 m) del eje divisorio entre predios, o entre paramentos exteriores de locales correspondientes a unidades independientes. Si tiene un tapial de un metro con ochenta centímetros (1,80 m) como mínimo, es considerado interceptor de vista.",
        "referencia": "Art. 3.7.1"
      },
      {
        "id": "q_20",
        "corto": "Aires acondicionados sobre LM",
        "pregunta": "¿Se pueden colocar unidades externas de aire acondicionado sobre LM?",
        "respuesta": "Las salientes de fachadas fuera de la línea municipal para aires acondicionados: tienen una altura mínima de dos metros con treinta centímetros (2,30 m) a tres metros (3,00 m), según cada caso, y la saliente máxima sobre estas alturas es de cincuenta centímetros (0,50 m).",
        "referencia": "Art. 3.2.3.4"
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
        "id": "q_21",
        "corto": "Vallas de obra",
        "pregunta": "¿Debo colocar vallas al frente de las obras?",
        "respuesta": "Sí. Antes de iniciar la obra se debe colocar una valla provisoria al frente del predio, en toda su extensión, para cualquier trabajo peligroso o que obstaculice el tránsito en la vía pública. No puede tener puntas filosas ni elementos salientes, debe evitar daños o dificultades de paso a los peatones e impedir que escurran materiales sólidos.\n\nPuede ser de tablas de madera cepilladas, placas lisas de metal u otro material que acepte la Municipalidad, de altura uniforme y sin interrupciones; las puertas nunca abren hacia afuera. En zonas con red de gas se debe obtener la factibilidad de GAS NEA.",
        "referencia": "Art. 4.1.1.1"
      },
      {
        "id": "q_22",
        "corto": "Medidas de la valla",
        "pregunta": "¿Qué medidas y ubicación debe tener la valla? ¿Y si obstaculiza el paso?",
        "respuesta": "La valla debe tener una altura mínima de 2,50 m. Su separación de la línea municipal no puede superar la mitad del ancho de la vereda, y debe dejar un paso libre de 1,00 m entre la valla y el cordón (o la línea de árboles). No puede rebasar los límites laterales de la vereda del predio.\n\nSi no queda un paso libre de al menos 0,70 m, se ejecuta una pasarela de 0,90 m de ancho con baranda exterior pintada con franjas inclinadas rojas y blancas, y luz roja de noche en el ángulo exterior que enfrenta al tránsito de vehículos.",
        "referencia": "Art. 4.1.1.3"
      },
      {
        "id": "q_23",
        "corto": "Retiro del vallado",
        "pregunta": "¿Cuándo debo retirar el vallado de obra?",
        "respuesta": "Cuando deja de ser necesaria la ocupación de la vía pública a juicio de la Municipalidad, o cuando la obra está paralizada por 3 meses: en ese caso la valla debe trasladarse a la línea municipal. Cuando se libera el ancho total de la vereda, se ejecuta sobre ella el solado definitivo reglamentario.",
        "referencia": "Cap. 4.1"
      },
      {
        "id": "q_24",
        "corto": "Cartel de obra",
        "pregunta": "¿Es obligatorio colocar un cartel de obra?",
        "respuesta": "Sí, al frente de toda obra con permiso. Debe indicar: nombre completo (sin abreviaturas), título y matrícula de los profesionales y empresas (con sus Representantes Técnicos) que firmen en el expediente; número de expediente de obra; fecha de concesión del permiso; y destino de la obra.\n\nSe coloca en el cerco de obra o en la línea municipal, a una altura no mayor de 3 m.",
        "referencia": "Art. 4.1.2"
      },
      {
        "id": "q_25",
        "corto": "Horario de obra",
        "pregunta": "¿En qué horario se puede trabajar en una obra?",
        "respuesta": "De 7:00 a 17:00 hs, respetando las horas de descanso fijadas por las Ordenanzas correspondientes. Se pueden solicitar permisos especiales ante la Municipalidad.",
        "referencia": "Art. 4.1.3.6"
      },
      {
        "id": "q_26",
        "corto": "Permiso de demolición",
        "pregunta": "¿Se necesita permiso para demoler?",
        "respuesta": "Sí. No puede iniciarse ningún trabajo de demolición sin el permiso de la Municipalidad.\n\nSi el polvo o los escombros molestan al tránsito, el responsable debe limpiar la calle las veces que sea necesario. Si la demolición genera peligro para el tránsito, se deben usar todos los recursos técnicos disponibles para evitarlo, colocar señales visibles de precaución y ubicar a cada costado de la obra personas que avisen del peligro a los transeúntes.",
        "referencia": "Arts. 4.5.1.2, 4.5.2.2 y 4.5.2.3"
      },
      {
        "id": "q_27",
        "corto": "Tipos de andamios",
        "pregunta": "¿Qué tipos de andamios están permitidos?",
        "respuesta": "Los materiales y accesorios deben estar en buen estado y ser suficientemente resistentes. La madera debe tener fibras largas y nudos que no tomen más de 1/4 de la sección de la pieza; las partes metálicas no pueden estar abiertas, agrietadas, deformadas ni corroídas; los cables y cuerdas deben tener un coeficiente de seguridad de al menos 10 según la carga máxima.\n\nPara albañilería se usan andamios fijos o pesados suspendidos; para revoque, pintura, limpieza o reparaciones también livianos suspendidos u otros autorizados por el Código o la Municipalidad.",
        "referencia": "Art. 4.13.1.1"
      },
      {
        "id": "q_28",
        "corto": "Andamios en vereda",
        "pregunta": "¿Puedo colocar andamios en la vereda?",
        "respuesta": "Sí, dentro del recinto autorizado para la valla provisoria, sin ocultar chapas de nomenclatura, señalización de alumbrado ni bocas de incendio. Si se afectan soportes de alumbrado u otros servicios públicos, hay que avisar con al menos 15 días de anticipación.\n\nDeben retirarse 24 hs después de concluida la obra, o 15 días después de paralizada (salvo fuerza mayor); si la obra se paraliza más de 2 meses, se quitan también la valla y cualquier obstáculo al tránsito. Si no se cumple, la Municipalidad ejecuta los trabajos a costa del responsable, sin perjuicio de las penalidades.",
        "referencia": "Cap. 4.13"
      },
      {
        "id": "q_29",
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
        "id": "q_30",
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
    "descripcion": "Inmuebles de interés patrimonial: protección, obras y sanciones",
    "preguntas": [
      {
        "id": "q_31",
        "corto": "Concepto y protección",
        "pregunta": "¿Qué es un inmueble de interés patrimonial y cómo se determina su protección?",
        "respuesta": "Es un inmueble con valores históricos, arquitectónicos, culturales o urbanos que justifican algún grado de protección, aunque no tenga una declaratoria específica. La protección alcanza a inmuebles públicos y privados incluidos en los registros, preinventarios y categorías de la normativa.\n\nEl grado se determina mediante una evaluación patrimonial que considera esos valores. El Código contempla las categorías de protección integral, estructural, ambiental o de conjunto, cautelar y cautela arqueológica, en grados de protección 0, 1, 2, 3 y 4.",
        "referencia": "Arts. 7.1, 7.2.3, 7.5 y 7.6"
      },
      {
        "id": "q_32",
        "corto": "Antes de intervenir",
        "pregunta": "¿Qué debo hacer antes de intervenir un inmueble patrimonial?",
        "respuesta": "Toda intervención en inmuebles protegidos o de interés patrimonial debe ser evaluada y visada previamente por la Municipalidad mediante trámite de factibilidad urbanística: no se puede modificar un inmueble patrimonial sin autorización municipal. La obra solo puede iniciarse una vez aprobada, conforme a los criterios patrimoniales y los procedimientos vigentes.\n\n• Fachadas: depende del grado de protección; las modificaciones deben respetar los elementos significativos y los criterios de integración patrimonial, y requieren aprobación municipal.\n• Cambio de uso: puede admitirse según el grado de protección y la compatibilidad del nuevo uso con el inmueble, previa evaluación municipal.",
        "referencia": "Arts. 7.1, 7.5, 7.6 y 7.7"
      },
      {
        "id": "q_33",
        "corto": "Grados 1 y 2",
        "pregunta": "¿Qué permiten los grados de protección 1 y 2?",
        "respuesta": "• Grado 1 (protección baja): permite intervenciones y sustituciones controladas, con integración armónica al entorno. Se admiten modificaciones, ampliaciones y reformas, sujetas a aprobación municipal.\n• Grado 2 (protección ambiental o de conjunto): busca conservar fachadas, elementos singulares y características del conjunto. Se admiten intervenciones controladas y ampliaciones que respeten la tipología, los elementos significativos y la integración con el entorno.\n\nUn volumen nuevo sobre un inmueble preinventariado depende del grado y de las condiciones de integración; para el grado 2, el Código fija criterios específicos de retiro del nuevo volumen respecto de la fachada.",
        "referencia": "Arts. 7.6.b y 7.6.c"
      },
      {
        "id": "q_34",
        "corto": "Grados 3 y 4",
        "pregunta": "¿Qué permiten los grados de protección 3 y 4?",
        "respuesta": "• Grado 3: exige conservar los elementos tipológicos, compositivos y espaciales significativos (p. ej., fachada y primera línea de habitaciones), con intervenciones limitadas y controladas. Fachada: sin alterar los elementos significativos ni la composición original, con aprobación municipal. Se admiten demoliciones parciales o anexiones de volúmenes que no afecten la integridad tipológica y compositiva ni la singularidad del conjunto.\n• Grado 4: protección integral máxima para edificios de valor excepcional. No se permiten modificaciones del volumen, de la superficie construida ni de los entrepisos existentes, ni ocupar patios interiores con construcciones. Se admiten mantenimiento, conservación, consolidación, restauración y adecuaciones compatibles con sus valores; el uso puede cambiarse si es compatible con las características físicas del edificio y el carácter del área.",
        "referencia": "Arts. 7.6.d y 7.6.e"
      },
      {
        "id": "q_35",
        "corto": "Demolición y linderas",
        "pregunta": "¿Qué rige para demoliciones, ruinas y obras linderas a un inmueble patrimonial?",
        "respuesta": "• Demolición: requiere evaluación y autorización municipal previa; su admisibilidad depende de la protección del inmueble y de la normativa aplicable. En demoliciones parciales se exige un protocolo específico con las operaciones y técnicas previstas, las partes a restituir, las planimetrías del edificio previo y el inventario de elementos y materiales a preservar.\n• Estado ruinoso: la Municipalidad evalúa si corresponde declararlo; no implica necesariamente que deba demolerse.\n• Obras linderas: en demoliciones o excavaciones se deben tomar precauciones adicionales para evitar daños estructurales o alteraciones morfológicas del inmueble protegido. Si hay daños por negligencia o vicios ocultos de la obra, además de las sanciones, los responsables deben restaurar el inmueble o las partes afectadas.",
        "referencia": "Arts. 7.1, 7.6 a 7.8.2"
      },
      {
        "id": "q_36",
        "corto": "Instalaciones y acceso",
        "pregunta": "¿Cómo se resuelven instalaciones, accesibilidad y línea de edificación en un edificio patrimonial?",
        "respuesta": "• Instalaciones: deben proyectarse con el menor impacto posible sobre los materiales, la imagen, las fachadas y los espacios significativos del inmueble.\n• Accesibilidad: debe adecuarse a la normativa vigente, evitando alterar o destruir elementos significativos. Si la adaptación resulta inviable, el organismo competente evalúa alternativas justificadas.\n• Línea de edificación: en tramos patrimoniales coherentes debe preservarse la continuidad de la línea municipal de construcción existente, según las condiciones establecidas por el Código.",
        "referencia": "Arts. 7.9.1, 7.9.2 y 7.9.3"
      },
      {
        "id": "q_37",
        "corto": "Marquesinas y carteles",
        "pregunta": "¿Qué reglas hay para marquesinas, toldos y carteles en inmuebles patrimoniales?",
        "respuesta": "• Marquesinas: no se permiten elementos corpóreos salientes, salvo marquesinas integradas a una rehabilitación completa de fachada aprobada por la Municipalidad.\n• Toldos: textiles, rebatibles, de un único color por obra y acordes con la fachada; sin publicidad, salvo la marca comercial del establecimiento.\n• Carteles salientes: uno por unidad funcional o parcela y por fachada; con frentes a distintas calles, uno en cada fachada, salvo en ochavas y zonas de seguridad de bocacalles.\n• Carteles frontales: en vanos o sectores sin elementos significativos que puedan distorsionarse, respetando las dimensiones y salientes del Código.\n• La Municipalidad puede exigir adecuar carteles y retirar toldos, marquesinas o cableados que no cumplan, con plazo de dos años desde la notificación fehaciente.",
        "referencia": "Arts. 7.10.2.1 a 7.10.3.2 y 7.10.6"
      },
      {
        "id": "q_38",
        "corto": "Color y señalética",
        "pregunta": "¿Puedo cambiar el color de la fachada o colocar señalética patrimonial?",
        "respuesta": "• Color: la intervención debe tender a recuperar el color original. Se presenta una investigación técnico-histórica para evaluación y autorización municipal.\n• Señalética (carteles o placas patrimoniales): se admite en inmuebles con grado de protección 3 y 4, siempre que generen el menor impacto posible y cuenten con aprobación municipal.",
        "referencia": "Arts. 7.10.4 y 7.10.5"
      },
      {
        "id": "q_39",
        "corto": "Sanciones y beneficios",
        "pregunta": "¿Qué sanciones y qué beneficios hay para los inmuebles patrimoniales?",
        "respuesta": "• Sanciones: intervenir sin permisos ni controles es una contravención grave. Si se elimina sin permiso un bien patrimonial declarado o preinventariado, se aplican sanciones vía Tribunal de Faltas.\n• Beneficios: según el proyecto y el grado de intervención admitido, pueden solicitarse compensaciones, como ampliación de altura, reducción del aporte al Fondo de Desarrollo Urbano o transferencia de beneficios de plusvalía. Requieren evaluación y acuerdo urbanístico: se presenta una propuesta a la Municipalidad, sujeta a la viabilidad del proyecto mediante trámite de factibilidad urbanística.",
        "referencia": "Arts. 7.11.1, 7.11.2 y 7.12"
      }
    ]
  },
  {
    "id": 8,
    "titulo": "Usos específicos",
    "nombre": "Usos Específicos",
    "descripcion": "Cocheras",
    "preguntas": [
      {
        "id": "q_40",
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
        "id": "q_41",
        "corto": "Ejecución de veredas",
        "pregunta": "¿De quién es la responsabilidad de ejecutar las veredas?",
        "respuesta": "Donde exista cordón cuneta, con o sin pavimento, los propietarios de inmuebles, baldíos o edificados, deben ejecutar las veredas según las condiciones del Código y mantenerlas en óptimas condiciones para garantizar la transitabilidad, la limpieza y la seguridad peatonal.",
        "referencia": "Art. 9.1.1"
      },
      {
        "id": "q_42",
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