import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'totclinic';

const posts = [
  {
    id: `${CLIENT_ID}-1`,
    client_id: CLIENT_ID,
    post_number: 1,
    platform: 'IG',
    headline_visual: 'Foto clínica de guantes de nitrilo azules sobre fondo blanco/azul claro. Texto: "¿Látex, nitrilo o vinilo?" Diseño limpio azul y blanco TotClinic.',
    copy: `No todos los guantes desechables son iguales. Elegir bien marca la diferencia en protección e higiene. 🧤

🔵 Látex → Alta sensibilidad táctil. Ideal para procedimientos delicados. No recomendado si hay alergia al látex.

🔵 Nitrilo → Sin látex, más resistente a perforaciones y productos químicos. El más usado en clínica hoy.

🔵 Vinilo → Opción económica para tareas de baja exposición a riesgo. Sin látex.

¿Cuál escoges depende del procedimiento, del paciente y del profesional.

En TotClinic tenemos los tres tipos en distintas tallas y presentaciones.

👉 Consulta el catálogo completo en la web.
🌐 totclinic.com`,
    hashtags: ['#TotClinic', '#GuantesDesechables', '#MaterialSanitario', '#Enfermería', '#Clínicas', '#HigieneClínica'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-2`,
    client_id: CLIENT_ID,
    post_number: 2,
    platform: 'IG',
    headline_visual: 'Imagen de gasas estériles en packaging azul sobre superficie blanca clínica. Texto: "¿Gasas estériles o no estériles?" Fondo azul claro y blanco.',
    copy: `No es lo mismo usar una gasa estéril que una no estéril. El error puede costar caro. 💊

✅ Gasas estériles → Para heridas abiertas, postoperatorio y cualquier zona que requiera máxima asepsia. Envasadas individualmente.

✅ Gasas no estériles → Para limpiezas superficiales, absorciones externas o protección general sin contacto directo con tejido abierto.

Usar una gasa no estéril en una herida abierta aumenta el riesgo de infección. Es un detalle que no debe pasarse por alto en ningún protocolo de curas.

En TotClinic las tenemos en diferentes gramajes y tamaños.

👉 Revisa opciones disponibles en la web.
🌐 totclinic.com`,
    hashtags: ['#TotClinic', '#GasasEstériles', '#MaterialSanitario', '#Curas', '#ProtocoloClínico', '#Enfermería'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-3`,
    client_id: CLIENT_ID,
    post_number: 3,
    platform: 'IG',
    headline_visual: 'Foto producto: apósitos autoadhesivos de distintos tamaños sobre fondo blanco azulado. Texto bold: "El apósito correcto para cada herida." Paleta azul-blanco.',
    copy: `Un apósito mal elegido puede frenar la cicatrización. Aquí las claves para no equivocarse. 🩹

Tipos y usos más comunes:

🔹 Apósito simple → Protección de heridas superficiales limpias.
🔹 Apósito hidrocoloide → Heridas con exudado moderado. Mantiene el entorno húmedo favoreciendo la cicatrización.
🔹 Apósito para quemaduras → Con gel refrigerante. Para quemaduras leves o moderadas.
🔹 Apósito transparente → Permite vigilar la herida sin retirar el apósito. Ideal para zonas de catéter.

El tamaño también importa: el apósito debe cubrir al menos 1 cm más allá del borde de la herida.

👉 Consulta tipos y tallas disponibles en totclinic.com
🌐 totclinic.com`,
    hashtags: ['#TotClinic', '#Apósitos', '#Curas', '#MaterialSanitario', '#Cicatrización', '#Clínicas'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-4`,
    client_id: CLIENT_ID,
    post_number: 4,
    platform: 'IG',
    headline_visual: 'Foto clínica de distintos tipos de vendas (elástica, cohesiva, triangular) sobre fondo blanco. Texto: "No todas las vendas son iguales." Azul clínico.',
    copy: `¿Sabes cuándo usar cada tipo de venda? 🏥

En clínica y primeros auxilios hay diferencias importantes:

🔵 Venda elástica de algodón → Para inmovilizaciones y vendajes de soporte en traumatismos leves.

🔵 Venda cohesiva → Se adhiere a sí misma sin pegamento. Ideal para vendajes compresivos o en animales (también muy usada en veterinaria).

🔵 Venda de yeso o escayola → Para inmovilización de fracturas.

🔵 Venda triangular → Imprescindible en botiquines de primeros auxilios. Cabestrillo, protección de quemaduras, compresión.

Tener el tipo correcto en stock evita improvisaciones en situaciones de urgencia.

👉 Consulta disponibilidad y formatos en la web.
🌐 totclinic.com`,
    hashtags: ['#TotClinic', '#Vendas', '#PrimerosAuxilios', '#MaterialSanitario', '#Traumatología', '#Enfermería'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-5`,
    client_id: CLIENT_ID,
    post_number: 5,
    platform: 'IG',
    headline_visual: 'Imagen limpia de varios tipos de esparadrapo sobre superficie azul claro. Texto: "Esparadrapo: más variedad de la que crees." Blanco y azul.',
    copy: `El esparadrapo es uno de los consumibles más básicos en cualquier clínica… y el más subestimado. 🩺

Hay más tipos de los que parece:

🔹 Esparadrapo de tela → El más resistente. Para fijaciones de larga duración.
🔹 Esparadrapo microporoso (papel) → Transpirable. Para pieles sensibles o zonas de difícil fijación. Muy usado con apósitos.
🔹 Esparadrapo de seda → Suave, sin látex. Para pacientes con piel delicada o frágil.
🔹 Esparadrapo de zinc → Con propiedades antisépticas. Para deportistas y zonas de alta fricción.

Tener el tipo correcto en stock mejora el confort del paciente y reduce el riesgo de irritaciones.

👉 Revisa presentaciones disponibles en la web.
🌐 totclinic.com`,
    hashtags: ['#TotClinic', '#Esparadrapo', '#MaterialSanitario', '#Clínicas', '#Enfermería', '#Vendaje'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-6`,
    client_id: CLIENT_ID,
    post_number: 6,
    platform: 'IG',
    headline_visual: 'Gráfico educativo estilo checklist con fondo azul oscuro/marino, texto blanco bold: "¿Tu empresa tiene botiquín obligatorio?" Lista de contenido mínimo.',
    copy: `Si tienes un negocio o empresa en España, el botiquín no es opcional. Es obligatorio por ley. ⚠️

El RD 486/1997 establece que todo centro de trabajo debe contar con un botiquín de primeros auxilios adecuado al número de trabajadores y al tipo de riesgos.

Contenido mínimo recomendado:
✔️ Guantes desechables
✔️ Gasas estériles
✔️ Vendas
✔️ Esparadrapo
✔️ Apósitos adhesivos
✔️ Tijeras y pinzas
✔️ Antiséptico (agua oxigenada o clorhexidina)
✔️ Manta térmica

En TotClinic tenemos botiquines ya completos y también venta por separado para reposición.

👉 Consulta modelos disponibles en la web.
🌐 totclinic.com`,
    hashtags: ['#TotClinic', '#BotiquínEmpresa', '#SeguridadLaboral', '#PrimerosAuxilios', '#MaterialSanitario', '#ObligacionLegal'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-7`,
    client_id: CLIENT_ID,
    post_number: 7,
    platform: 'IG',
    headline_visual: 'Foto clínica de bata desechable azul con guantes y mascarilla quirúrgica sobre fondo blanco. Texto: "Vestuario desechable en clínica." Tono azul profesional.',
    copy: `El vestuario desechable no es un gasto. Es parte del protocolo de seguridad. 🥼

En entornos clínicos y de atención sanitaria, el uso adecuado de EPI desechables reduce el riesgo de contaminación cruzada y protege tanto al profesional como al paciente.

Lo más utilizado en clínica:

🔵 Batas desechables → Protección del uniforme durante procedimientos con riesgo de salpicaduras.
🔵 Gorros desechables → Imprescindibles en quirófanos y zonas estériles.
🔵 Calzas desechables → Para entornos de alta asepsia o visitas domiciliarias.
🔵 Mascarillas quirúrgicas → Barrera básica ante fluidos y aerosoles.

En TotClinic lo tenemos todo en formato individual o caja.

👉 Consulta disponibilidad en la web.
🌐 totclinic.com`,
    hashtags: ['#TotClinic', '#VestuarioDesechable', '#EPIs', '#MaterialSanitario', '#HigieneClínica', '#Clínicas'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-8`,
    client_id: CLIENT_ID,
    post_number: 8,
    platform: 'IG',
    headline_visual: 'Foto de termómetro digital de oído y termómetro infrarrojo frontal sobre fondo azul degradado. Texto: "¿Qué termómetro usar en consulta?" Paleta azul-blanco.',
    copy: `El termómetro correcto depende del entorno y del tipo de paciente. 🌡️

Guía rápida para elegir bien:

🔹 Termómetro digital oral/axilar → Preciso y económico. Para adultos y niños mayores de 5 años. No recomendado en urgencias.

🔹 Termómetro de oído (timpánico) → Rápido (1 segundo). Ideal en pediatría y urgencias. Requiere buen posicionamiento para ser fiable.

🔹 Termómetro infrarrojo frontal → Sin contacto. Muy higiénico. Adecuado para uso masivo o en pacientes que no pueden cooperar.

🔹 Termómetro rectal → Medición más precisa en lactantes. Uso clínico específico.

Para consultas de alta rotación, los modelos infrarrojos o timpánicos son los más eficientes.

👉 Consulta modelos disponibles en la web.
🌐 totclinic.com`,
    hashtags: ['#TotClinic', '#Termómetro', '#Diagnóstico', '#MaterialSanitario', '#Pediatría', '#Enfermería'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-9`,
    client_id: CLIENT_ID,
    post_number: 9,
    platform: 'IG',
    headline_visual: 'Imagen cálida pero clínica: manos de cuidador con guantes atendiendo a persona mayor. Overlay azul suave. Texto: "Material para atención geriátrica." TotClinic.',
    copy: `La atención a personas mayores en domicilio requiere material específico. No todo vale. 👴👵

En TotClinic tenemos productos geriátricos pensados para cuidadores, auxiliares y equipos de atención domiciliaria:

✔️ Guantes de nitrilo sin látex (esenciales para cuidados continuos)
✔️ Empapadores desechables para cama
✔️ Gasas y apósitos para úlceras por presión
✔️ Cremas y productos dermatológicos de uso geriátrico
✔️ Tensiómetros y oxímetros para seguimiento básico en domicilio
✔️ Termómetros de uso sencillo para pacientes con movilidad reducida

Planificar bien el stock evita desplazamientos de urgencia y garantiza una atención continua y de calidad.

👉 Consulta el catálogo de productos geriátricos en la web.
🌐 totclinic.com`,
    hashtags: ['#TotClinic', '#AtenciónGeriátrica', '#CuidadoMayores', '#MaterialSanitario', '#AtenciónDomiciliaria', '#Cuidadores'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-10`,
    client_id: CLIENT_ID,
    post_number: 10,
    platform: 'IG',
    headline_visual: 'Imagen de material piercing/tattoo estéril (agujas, guantes, desinfectante) sobre fondo oscuro azulado con detalles brillantes. Texto: "Material certificado para piercing y tattoo."',
    copy: `En el sector del piercing y el tattoo, la esterilidad no es negociable. ✒️

El uso de material desechable certificado no es solo una buena práctica. Es una obligación legal y ética frente a tu cliente.

Material imprescindible en cualquier estudio profesional:

🔵 Agujas estériles de un solo uso (por calibres)
🔵 Guantes de nitrilo sin látex
🔵 Toallitas desinfectantes homologadas
🔵 Vasos y recipientes desechables para tintas
🔵 Mascarillas quirúrgicas
🔵 Film protector y papel barrera

En TotClinic tenemos material específico para profesionales del sector, con certificaciones de calidad y a precios competitivos.

👉 Consulta disponibilidad en la web.
🌐 totclinic.com`,
    hashtags: ['#TotClinic', '#MaterialPiercing', '#MaterialTattoo', '#HigieneTattoo', '#MaterialSanitario', '#EstudioDeTattoo'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-11`,
    client_id: CLIENT_ID,
    post_number: 11,
    platform: 'IG',
    headline_visual: 'Gráfico corporativo azul: caja de pedido con icono de envío y "ENVÍO GRATIS +100€" en blanco bold. Fondo azul degradado TotClinic limpio y profesional.',
    copy: `¿Sabías que en TotClinic el envío es gratis a partir de 100€? 🚚

Muchos centros sanitarios y clínicas hacen pedidos frecuentes de pequeños importes cuando podrían planificar una compra mensual y ahorrar en costes de envío.

Con un pedido mensual bien planificado:

✔️ Envío gratuito a Península en 24-72h
✔️ Menos tiempo gestionando múltiples pedidos
✔️ Mejor control del stock
✔️ Sin roturas de material en momentos críticos

Atención al cliente de lunes a viernes de 7h a 15h.
📞 617 10 94 91

👉 Haz tu próximo pedido en la web.
🌐 totclinic.com`,
    hashtags: ['#TotClinic', '#EnvíoGratis', '#MaterialSanitario', '#GestiónClínica', '#CompraOnline', '#Clínicas'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-12`,
    client_id: CLIENT_ID,
    post_number: 12,
    platform: 'IG',
    headline_visual: 'Imagen de productos desinfectantes y antisépticos en botes sobre fondo blanco azulado. Texto educativo: "Antiséptico o desinfectante: ¿cuál usar?" Azul clínico.',
    copy: `Antiséptico y desinfectante no son lo mismo. Usarlos mal puede reducir su eficacia. 🧴

Diferencia clave:

🔵 Antiséptico → Se usa sobre piel y tejidos vivos. Elimina o inhibe microorganismos sin dañar el tejido.
Ejemplos: clorhexidina, agua oxigenada, povidona yodada.

🔵 Desinfectante → Se usa sobre superficies inertes (camillas, instrumentos, suelos). No apto para piel.
Ejemplos: hipoclorito sódico (lejía), glutaraldehído, alcohol 70%.

Regla básica: antiséptico para el paciente, desinfectante para el entorno.

Elegir el producto correcto garantiza la eficacia del protocolo de higiene y protege a pacientes y personal.

En TotClinic tenemos ambas categorías con distintas presentaciones.

👉 Consulta el catálogo en la web.
🌐 totclinic.com`,
    hashtags: ['#TotClinic', '#Desinfectantes', '#Antisépticos', '#HigieneClínica', '#MaterialSanitario', '#ProtocoloSanitario'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
];

async function run() {
  console.log(`Insertando ${posts.length} posts para ${CLIENT_ID}...`);

  for (const post of posts) {
    const { error } = await supabase
      .from('posts')
      .upsert(post, { onConflict: 'id' });

    if (error) {
      console.error(`✗ Post #${post.post_number}: ${error.message}`);
    } else {
      console.log(`✓ Post #${post.post_number}: ${post.headline_visual.substring(0, 70)}...`);
    }
  }

  console.log('\n✅ Listo. Recarga ContentFlow para ver los posts de TOTCLINIC.');
}

run();
