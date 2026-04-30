// insert_famed_posts.mjs
// CENTRO DE ESPECIALIDADES MEDICAS FAMED SL – Clínicas FAMED (@clinicasfamed_)
// Red Social: Instagram | Stage: Faltan post para J2
// Servicios: Odontología, Medicina Estética, Fisioterapia, Podología, Suelo Pélvico, Pilates, Nutrición, ArtSmile
// Run: node FlowAPP/insert_famed_posts.mjs

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';
const CLIENT_ID = 'famed-sl';

const posts = [
  {
    id: `${CLIENT_ID}-1`,
    post_number: 1,
    platform: 'IG',
    headline_visual: 'MÉDICOS Y ESPECIALISTAS CUIDANDO DE TI',
    visual_prompt: '',
    copy: `¿Cuándo fue la última vez que te cuidaste de verdad? 💙

En Clínicas FAMED llevamos más de 15 años acompañando a las personas de Torrelodones y Coslada en cada paso de su salud.

No somos una clínica más. Somos tu equipo:

🦷 Odontología y ArtSmile
💆 Fisioterapia terapéutica y deportiva
🌸 Suelo pélvico y salud de la mujer
✨ Medicina estética avanzada
🦶 Podología
🥗 Nutrición personalizada
🧘 Pilates e Hipopresivos

Porque tu salud merece especialistas que te traten como a una persona, no como a un número.

📍 Torrelodones · Coslada
📞 918 54 93 77 · 91 671 81 32
🔗 linktr.ee/clinicasfamed_`,
    hashtags: ['#ClínicasFamed', '#Torrelodones', '#Coslada', '#SaludIntegral', '#MédicosEspecialistas', '#TuSaludNuestraPrioridad'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-2`,
    post_number: 2,
    platform: 'IG',
    headline_visual: '¿TU CUERPO LLEGA CANSADO AL VERANO?',
    visual_prompt: '',
    copy: `Mayo ya está aquí… y con él, el cuerpo pide un reset. 🌿

Meses de trabajo, pantallas, poco movimiento y tensión acumulada se notan. La espalda cargada, el cuello rígido, los hombros que no bajan.

No lo normalices. Tu cuerpo te está hablando.

En Clínicas FAMED te ayudamos a llegar al verano sintiéndote bien de verdad:

✅ Fisioterapia terapéutica para contracturas y dolor
✅ Fisioterapia deportiva para volver a moverte sin miedo
✅ Tecnología FMS para recuperación profunda
✅ Tratamientos personalizados para cada caso

Porque estar bien no es un lujo. Es lo que mereces.

📞 91 671 81 32 (Coslada) · 918 54 93 77 (Torrelodones)
👉 Pide tu cita hoy`,
    hashtags: ['#Fisioterapia', '#ClínicasFamed', '#Torrelodones', '#Coslada', '#DolordEspalda', '#Contracturas', '#RecuperaciónMuscular'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-3`,
    post_number: 3,
    platform: 'IG',
    headline_visual: 'TU SUELO PÉLVICO TAMBIÉN NECESITA CUIDADO',
    visual_prompt: '',
    copy: `Hay algo de lo que casi nadie habla… pero que afecta a millones de mujeres. 💛

Pérdidas de orina. Dolor en las relaciones. Presión pélvica. Recuperación postparto lenta. Síntomas de menopausia o perimenopausia que se van normalizando.

No tienes que vivir así.

En Clínicas FAMED cuidamos tu suelo pélvico con:

🌸 Fisioterapia especializada de suelo pélvico
💎 Tratamientos con tecnología INDIBA
🔄 Rehabilitación postparto
✨ Mejora de la salud íntima y sexual en perimenopausia

Porque cuidarte por dentro también importa. Y nosotras (y nosotros) te acompañamos en cada etapa.

📞 918 54 93 77 (Torrelodones) · 91 671 81 32 (Coslada)
💬 Escríbenos sin compromiso`,
    hashtags: ['#SueloPélvico', '#ClínicasFamed', '#SaludFemenina', '#Postparto', '#Perimenopausia', '#FisioterapiaFemenina', '#Torrelodones'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-4`,
    post_number: 4,
    platform: 'IG',
    headline_visual: 'LA SONRISA QUE SIEMPRE QUISISTE — ArtSmile',
    visual_prompt: '',
    copy: `¿Y si este verano fueras a la playa sonriendo sin pensártelo dos veces? 😁

Con ArtSmile, la ortodoncia invisible de Clínicas FAMED, puedes conseguir la sonrisa que siempre quisiste…

✅ Sin brackets visibles
✅ Sin molestias
✅ A tu ritmo y tu estilo de vida
✅ Con estudio y primera visita GRATIS
🎁 + blanqueamiento domiciliario incluido

Y lo mejor: desde menos de 60 € al mes.

No es magia. Es ArtSmile. La ortodoncia que se adapta a ti, no al revés.

¿Lo tienes en mente desde hace tiempo? Quizás este es el momento. 😉

📍 Torrelodones, Madrid
📞 918 54 93 77
💬 Pide tu cita hoy`,
    hashtags: ['#ArtSmile', '#OrtodonciaInvisible', '#ClínicasFamed', '#SonrisaPerfecta', '#Invisalign', '#SaludDental', '#Torrelodones', '#Ortodoncia'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-5`,
    post_number: 5,
    platform: 'IG',
    headline_visual: 'PREPARA TU PIEL PARA EL VERANO — INDIBA',
    visual_prompt: '',
    copy: `El verano se acerca… y tu piel también merece prepararse. ✨

Si notas flacidez, falta de firmeza o simplemente quieres llegar a la temporada con la piel en su mejor versión, en Clínicas FAMED tenemos la solución.

Trabajamos con tecnología INDIBA y tratamientos de medicina estética avanzada para:

💫 Mejorar la firmeza y el tono de la piel
🌸 Tratar la zona íntima y el suelo pélvico
🔄 Estimular el colágeno natural
✨ Resultados naturales y progresivos

Sin cirugía. Sin recuperación larga. Sin que nadie lo note.

Solo tú, sintiéndote mejor en tu propio cuerpo.

📞 918 54 93 77 (Torrelodones) · 91 671 81 32 (Coslada)
👉 Pide tu valoración gratuita`,
    hashtags: ['#MedicinaEstética', '#INDIBA', '#ClínicasFamed', '#CuidadoPiel', '#Torrelodones', '#FirmezaPiel', '#BellezaNatural'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-6`,
    post_number: 6,
    platform: 'IG',
    headline_visual: '¿TUS PIES ESTÁN LISTOS PARA EL VERANO?',
    visual_prompt: '',
    copy: `Llega el calor, llegan las sandalias… y llegan los problemas de pies que habías olvidado. 🦶

Durezas, uñas encarnadas, hongos, fascitis, juanetes. El pie aguanta todo el año y en verano lo ponemos a prueba.

En Clínicas FAMED, nuestro equipo de podología te ayuda a llegar a la temporada con los pies en perfecto estado:

✅ Quiropodología y durezas
✅ Uñas encarnadas
✅ Plantillas personalizadas
✅ Tratamiento de hongos
✅ Cuidado del pie diabético

Porque tus pies te llevan a todos lados. Cuídalos.

📞 91 671 81 32 (Coslada) · 918 54 93 77 (Torrelodones)
🔗 linktr.ee/clinicasfamed_`,
    hashtags: ['#Podología', '#ClínicasFamed', '#CuidadoPies', '#Torrelodones', '#Coslada', '#SaludPodológica', '#VeranoPies'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-7`,
    post_number: 7,
    platform: 'IG',
    headline_visual: 'RECUPERA TU SONRISA COMPLETA — Implante desde 60€/mes',
    visual_prompt: '',
    copy: `¿Llevas tiempo con ese hueco en tu boca que intenta evitar sonreír en las fotos? 🦷

Tienes solución. Y es más sencillo de lo que crees.

En Clínicas FAMED realizamos un diagnóstico personalizado y diseñamos el tratamiento que mejor se adapta a ti.

💎 Implante + corona desde menos de 60 € al mes
🎁 Blanqueamiento domiciliario GRATIS para las próximas citas
📍 Torrelodones y Coslada, Madrid

¿Por qué seguir esperando? Tu sonrisa completa te espera.

Recupera la confianza de sonreír sin pensarlo.

📞 918 54 93 77 (Torrelodones) · 91 671 81 32 (Coslada)
💬 Pide tu valoración hoy`,
    hashtags: ['#Implantes', '#ClínicasFamed', '#SaludDental', '#ImplanteDental', '#Odontología', '#SonrisaPerfecta', '#Torrelodones', '#Coslada'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-8`,
    post_number: 8,
    platform: 'IG',
    headline_visual: 'NUTRICIÓN QUE SE ADAPTA A TI',
    visual_prompt: '',
    copy: `Dietas de moda, apps que prometen milagros, el cuñado que sabe de todo… 😅

Y mientras tanto, tú sin resultados reales.

La clave no está en comer menos. Está en comer bien para ti, con un plan diseñado para tu cuerpo, tu ritmo y tu objetivo.

En Clínicas FAMED te acompañamos con nutrición personalizada de verdad:

🥗 Análisis de tu situación real
📋 Plan nutricional adaptado a ti
🔄 Seguimiento y ajuste continuo
💪 Compatible con tu tratamiento de fisioterapia o estética

Porque la salud empieza en lo que comes. Y tú mereces un plan que funcione.

📞 91 671 81 32 (Coslada) · 918 54 93 77 (Torrelodones)
👉 Pide tu primera consulta`,
    hashtags: ['#Nutrición', '#ClínicasFamed', '#NutriciónPersonalizada', '#HábitosSaludables', '#Torrelodones', '#Coslada', '#SaludIntegral'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-9`,
    post_number: 9,
    platform: 'IG',
    headline_visual: 'PILATES E HIPOPRESIVOS — Más que ejercicio',
    visual_prompt: '',
    copy: `¿Sabías que hay una forma de fortalecer el core, mejorar la postura y cuidar el suelo pélvico… al mismo tiempo? 🧘

Se llama Pilates con Hipopresivos. Y en Clínicas FAMED lo practicamos de forma terapéutica, es decir, adaptado a tu cuerpo y tu momento de vida.

Ideal para:

✅ Postparto y recuperación del suelo pélvico
✅ Dolor lumbar o de espalda crónico
✅ Mejorar la postura y la respiración
✅ Prevenir lesiones deportivas
✅ Reducir el volumen abdominal

Sin impacto. Sin riesgo. Con resultados reales.

Tu cuerpo cambia cuando le das lo que necesita. 💙

📞 918 54 93 77 (Torrelodones) · 91 671 81 32 (Coslada)
👉 Reserva tu clase de prueba`,
    hashtags: ['#Pilates', '#Hipopresivos', '#ClínicasFamed', '#SueloPélvico', '#Torrelodones', '#FisioterapiaTerapéutica', '#Core'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-10`,
    post_number: 10,
    platform: 'IG',
    headline_visual: 'LÁSER CO2 — Resetea tu piel desde dentro',
    visual_prompt: '',
    copy: `¿Y si pudieras resetear tu piel en un solo tratamiento? 🔑✨

Pocos lo conocen… pero todos quieren sus resultados.

El Láser CO2 con bioestimulación profunda activa las 3 capas de tu piel:

1️⃣ Epidermis — Renueva la superficie
2️⃣ Dermis — Estimula el colágeno
3️⃣ Hipodermis — Mejora desde dentro

El resultado: esa "piel nueva" que todo el mundo busca. Luminosa, firme y rejuvenecida.

En Clínicas FAMED te hacemos una valoración personalizada para saber si eres candidata/o y qué resultado esperar en tu caso.

💎 Sin cirugía. Con resultados visibles.

📞 918 54 93 77 (Torrelodones) · 91 671 81 32 (Coslada)
👉 Pide tu valoración gratuita`,
    hashtags: ['#LáserCO2', '#MedicinaEstética', '#ClínicasFamed', '#BioestimulacióFacial', '#RejuvenecimientoFacial', '#Torrelodones', '#PielLuminosa'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-11`,
    post_number: 11,
    platform: 'IG',
    headline_visual: '¿ENTRENAS PERO ALGO NO FUNCIONA BIEN?',
    visual_prompt: '',
    copy: `Empiezas la temporada de deporte con todo… y a las pocas semanas, el cuerpo dice stop. ⚠️

La rodilla que molesta. El isquio que tira. El pie que duele después de correr.

No es mala suerte. Es una señal que hay que escuchar antes de que se convierta en lesión.

En Clínicas FAMED hacemos fisioterapia deportiva de verdad:

🏃 Valoración biomecánica completa
⚡ Tecnología FMS de estimulación magnética
🔄 Recuperación muscular profunda
💪 Plan de prevención personalizado

Porque el mejor tratamiento es el que evita que llegues a lesionarte.

¿Sientes algo que no cuadra? Ven a que te veamos.

📞 91 671 81 32 (Coslada) · 918 54 93 77 (Torrelodones)`,
    hashtags: ['#FisioterapiaDeportiva', '#ClínicasFamed', '#PrevenciónLesiones', '#Torrelodones', '#Coslada', '#Fisioterapia', '#DeporteSano'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-12`,
    post_number: 12,
    platform: 'IG',
    headline_visual: 'TU SALUD, NUESTRA PRIORIDAD — Pide tu cita hoy',
    visual_prompt: '',
    copy: `En Clínicas FAMED no esperamos a que el problema sea grande para ayudarte. 💙

Estamos aquí desde el principio: para escucharte, diagnosticarte y diseñar el tratamiento que realmente necesitas.

Más de 15 años cuidando a las personas de Torrelodones y Coslada con:

🦷 Odontología · ArtSmile
✨ Medicina Estética · Láser · INDIBA
💪 Fisioterapia Terapéutica y Deportiva
🌸 Suelo Pélvico · Pilates e Hipopresivos
🦶 Podología
🥗 Nutrición

Porque tú te mereces un equipo que te cuide de verdad.

Empieza hoy.

📍 FAMED Torrelodones · L-V 9h-19h
📞 918 54 93 77 · 695 79 24 37

📍 FAMED Coslada · L-V 10h-20h
📞 91 671 81 32 · 675 61 58 75

🔗 linktr.ee/clinicasfamed_`,
    hashtags: ['#ClínicasFamed', '#Torrelodones', '#Coslada', '#TuSaludNuestraPrioridad', '#SaludIntegral', '#PideTuCita', '#MédicosEspecialistas'],
    status: 'review',
  },
];

async function insertPosts() {
  console.log(`Insertando ${posts.length} posts para ${CLIENT_ID} (FAMED)...`);

  for (const post of posts) {
    const payload = {
      id: post.id,
      client_id: CLIENT_ID,
      post_number: post.post_number,
      platform: post.platform,
      headline_visual: post.headline_visual,
      visual_prompt: post.visual_prompt,
      copy: post.copy,
      hashtags: post.hashtags,
      status: post.status,
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`✗ Post ${post.post_number}: ${err}`);
    } else {
      console.log(`✓ Post ${post.post_number}: ${post.headline_visual}`);
    }
  }

  console.log('\n✅ Todos los posts insertados para FAMED SL');
}

insertPosts().catch(console.error);
