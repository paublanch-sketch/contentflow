// insert_javier_manrique_posts.mjs
// JAVIER MANRIQUE DE LARA – TAO CENTER MADRID (@taocentermadrid)
// Red Social: Instagram | Stage: Faltan post para J2
// Tai Chi, Tao Yin, Chi Kung, Chi Nei Tsang, seminarios y formaciones en Madrid
// Run: node FlowAPP/insert_javier_manrique_posts.mjs

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';
const CLIENT_ID = 'javier-manrique-de-lara';

const posts = [
  {
    id: `${CLIENT_ID}-1`,
    post_number: 1,
    platform: 'IG',
    headline_visual: 'EL TAO NO ES UNA RELIGIÓN — Presentación Tao Center',
    visual_prompt: 'https://www.canva.com/d/F7JFk6kIWPes_zu',
    copy: `El Tao no es una religión. Es un camino. 🌿

Un camino hacia el equilibrio entre cuerpo, energía y consciencia.

En Tao Center llevamos años enseñando las disciplinas del TAO para que cualquier persona —sin importar su punto de partida— pueda transformar su vida desde adentro:

🌀 Tao Yin K.Y.
🥋 Tai Chi
🌬️ Chi Kung / Qigong
🤲 Chi Nei Tsang

Somos el centro de referencia del Tao Yin K.Y. en España, con instructores certificados por el maestro Mantak Chia.

¿Listo para empezar tu camino?
👉 taocenter.es`,
    hashtags: ['#TaoCenter', '#TaoMadrid', '#TaiChi', '#ChiKung', '#BienestarMadrid', '#TaoYin', '#Consciencia'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-2`,
    post_number: 2,
    platform: 'IG',
    headline_visual: 'TAO YIN K.Y. — El método que lo cambia todo',
    visual_prompt: 'https://www.canva.com/d/CoPHt3vOM6IW-R-',
    copy: `¿Qué es el Tao Yin K.Y. y por qué está cambiando la vida de tantas personas? ✨

El Tao Yin es una práctica ancestral taoísta que trabaja de forma simultánea el cuerpo físico, el sistema energético y la consciencia.

A diferencia de otras disciplinas, el Tao Yin K.Y. ha sido adaptado específicamente para occidentales —por nuestra fundadora Mª Stella Murias— para que su práctica sea profunda, accesible y transformadora.

Sus beneficios:
🌱 Flexibilidad y fuerza interior
⚡ Activación del sistema energético
🧠 Claridad mental y equilibrio emocional
🙏 Conexión cuerpo-mente-espíritu

Clases semanales y formación de profesores en Madrid.
📍 taocenter.es`,
    hashtags: ['#TaoYin', '#TaoCenter', '#BienestarHolistico', '#EnergiaVital', '#MeditacionMadrid', '#TaoYinKY', '#EquilibrioCuerpoMente'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-3`,
    post_number: 3,
    platform: 'IG',
    headline_visual: 'TAI CHI — Moverse desde el centro',
    visual_prompt: 'https://www.canva.com/d/Waj2KtJ94evCTw_',
    copy: `Moverse despacio no es moverse lento. Es moverse con consciencia. 🌙

El Tai Chi es el arte de encontrar el centro en medio del movimiento.

Los antiguos taoístas lo desarrollaron no solo como arte marcial, sino como una práctica de trabajo interno para armonizar el cuerpo físico, la energía y el espíritu.

Hoy, en nuestra agitada vida cotidiana, el Tai Chi es más necesario que nunca:

✔️ Reduce el estrés y la ansiedad
✔️ Mejora el equilibrio y la coordinación
✔️ Fortalece el sistema inmune
✔️ Calma la mente y abre la consciencia

En Tao Center Madrid lo practicamos y lo enseñamos.
¿Te unes a nosotros? 🙏`,
    hashtags: ['#TaiChi', '#TaoCenter', '#ArtesMarciales', '#Meditacion', '#BienestarMadrid', '#TaiChiMadrid', '#MindBody'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-4`,
    post_number: 4,
    platform: 'IG',
    headline_visual: 'CHI NEI TSANG — El masaje que libera el alma',
    visual_prompt: 'https://www.canva.com/d/AbbcDHaxj5Ly4df',
    copy: `¿Sabías que guardamos nuestras emociones en el vientre? 💫

El Chi Nei Tsang —o Masaje de Órganos Internos— es una técnica milenaria del Tao que trabaja directamente sobre el abdomen para liberar los bloqueos emocionales y energéticos acumulados.

Estrés, miedos, tristeza, tensiones crónicas… todo esto deja huella en nuestros órganos.

El Chi Nei Tsang los libera.

✨ Una sesión puede transformar lo que años de tensión han construido.

Sesiones individuales disponibles en Tao Center Madrid.
📩 Consulta disponibilidad en taocenter.es`,
    hashtags: ['#ChiNeiTsang', '#MasajeOrganosInternos', '#TerapiasNaturales', '#TaoCenter', '#BienestarEmocional', '#SaludHolistica', '#MeditacionMadrid'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-5`,
    post_number: 5,
    platform: 'IG',
    headline_visual: 'CHI KUNG / QIGONG — La energía que ya tienes',
    visual_prompt: 'https://www.canva.com/d/MmDO-O3D_5eEeF7',
    copy: `El Chi no se crea. Se despierta. ⚡

El Chi Kung (o Qigong) es la práctica de cultivar, mover y equilibrar la energía vital del cuerpo.

Llevamos siglos ignorando que tenemos dentro una fuente de salud y vitalidad que está esperando ser activada.

A través de movimientos suaves, respiración consciente y meditación, el Chi Kung:

🌬️ Revitaliza el cuerpo y reduce la fatiga
🧘 Calma el sistema nervioso
💪 Fortalece los órganos internos
🌀 Armoniza cuerpo, energía y mente

No necesitas experiencia previa. Solo curiosidad y ganas de explorar.

Próximas clases en Tao Center Madrid 👉 taocenter.es`,
    hashtags: ['#ChiKung', '#Qigong', '#EnergiaChi', '#TaoCenter', '#BienestarMadrid', '#SaludNatural', '#PracticasTaoistas'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-6`,
    post_number: 6,
    platform: 'IG',
    headline_visual: 'IRON SHIRT CHI KUNG — Raíces que sostienen',
    visual_prompt: 'https://www.canva.com/d/dA1NrHIggd7DU20',
    copy: `Un árbol fuerte no lo tumba cualquier viento. 🌳

El Iron Shirt Chi Kung es una práctica avanzada del Tao que fortalece desde adentro: órganos, tendones, fascias y huesos.

Pero más allá de lo físico, el Iron Shirt te da algo que pocas cosas pueden dar: presencia y arraigo.

Una energía que te sostiene cuando el mundo a tu alrededor se mueve.

🛡️ Órganos internos más fuertes
🌍 Conexión con la tierra (grounding)
⚡ Circulación energética profunda
🧠 Unificación cuerpo-mente-espíritu

Seminario intensivo próximamente en Madrid.
Plazas muy limitadas 🙏
📍 Más info: taocenter.es`,
    hashtags: ['#IronShirtChiKung', '#TaoCenter', '#ChiKung', '#SeminarioMadrid', '#BienestarHolistico', '#EnergiaTao', '#PracticasTaoistas'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-7`,
    post_number: 7,
    platform: 'IG',
    headline_visual: 'YIN Y YANG — El equilibrio que todo lo explica',
    visual_prompt: 'https://www.canva.com/d/ngKhd4BxZRFMwNW',
    copy: `Toda enfermedad, toda crisis, todo malestar… tiene una raíz común: el desequilibrio. ☯️

En la filosofía taoísta, la salud es el resultado de la armonía entre las dos polaridades energéticas fundamentales del cuerpo: el Yin y el Yang.

Cuando una domina sobre la otra, aparece el sufrimiento.
Cuando están en equilibrio, la vida fluye.

Esto no es solo filosofía. Es la base de miles de años de medicina y sabiduría oriental.

En Tao Center enseñamos a reconocer, comprender y equilibrar estas energías en ti.

¿Y si la respuesta que buscas está en el equilibrio? ✨`,
    hashtags: ['#YinYang', '#TaoCenter', '#FilosofiaTaoista', '#Equilibrio', '#SaludHolistica', '#EnergiaVital', '#BienestarMadrid'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-8`,
    post_number: 8,
    platform: 'IG',
    headline_visual: 'FORMACIÓN DE PROFESORES — Certifícate en Tao Yin K.Y.',
    visual_prompt: 'https://www.canva.com/d/ry5BMX99Z6pw2e3',
    copy: `¿Y si pudieras convertir tu práctica en tu vocación? 🌱

En Tao Center ofrecemos la única Formación de Profesores en Tao Yin K.Y. en España, avalada por más de 20 años de experiencia y certificada por el maestro Mantak Chia.

Una formación diseñada para quienes quieren profundizar en las disciplinas del TAO y compartirlas con otros:

📚 Tao Yin K.Y. avanzado
🧬 Fundamentos energéticos y taoístas
🤝 Metodología y pedagogía para occidentales
📜 Certificación oficial

Próxima convocatoria en Madrid.
¿Hablamos? 📩 tao@taocenter.es`,
    hashtags: ['#FormacionProfesores', '#TaoYin', '#TaoCenter', '#CertificacionTao', '#FormaciónHolistica', '#ProfesoresBienestar', '#TaoYinKY'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-9`,
    post_number: 9,
    platform: 'IG',
    headline_visual: 'SEMINARIO — Transforma tu energía en un fin de semana',
    visual_prompt: 'https://www.canva.com/d/bJsVyixr9NZ7Kks',
    copy: `A veces un fin de semana puede cambiarte la vida. 💫

Nuestros seminarios intensivos son experiencias de inmersión en las prácticas del TAO: profundas, transformadoras y diseñadas para que salgas siendo una versión más equilibrada de ti.

Próximos seminarios en Tao Center Madrid:

🌿 Iron Shirt Chi Kung
🤲 Chi Nei Tsang
🌀 Tao Yin Intensivo

Plazas muy limitadas para garantizar la calidad de la práctica.

No esperes a que el cuerpo te avise. El momento de cuidarte es ahora. 🙏

📍 Fechas y registro: taocenter.es`,
    hashtags: ['#SeminarioMadrid', '#TaoCenter', '#RetiroBienestar', '#ChiKung', '#TaoYin', '#TransformacionPersonal', '#BienestarHolistico'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-10`,
    post_number: 10,
    platform: 'IG',
    headline_visual: 'MÁ STELLA MURIAS — La maestra detrás del método',
    visual_prompt: 'https://www.canva.com/d/3KA4Ld3MOqx33Pu',
    copy: `El Tao Yin llegó a España gracias a una mujer con visión y valentía. ✨

Mª Stella Murias es la fundadora de Tao Center y la primera española en difundir el Tao Yin en nuestro país.

Tras formarse con el maestro Mantak Chia, creó el sistema pedagógico de Tao Yin K.Y. especialmente adaptado para occidentales: más accesible, más profundo, más transformador.

Llevar el conocimiento milenario del TAO a personas como tú, aquí en Madrid, con un método claro y probado.

Más de 20 años de práctica y enseñanza.
Una comunidad que sigue creciendo.

Si sientes que hay algo más por descubrir dentro de ti… quizá es hora de que te acerques. 🌿`,
    hashtags: ['#TaoCenter', '#MaStellaMurias', '#TaoYin', '#MaestrosTao', '#Mantak Chia', '#BienestarMadrid', '#CentroReferencia'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-11`,
    post_number: 11,
    platform: 'IG',
    headline_visual: 'CLASES SEMANALES — Tu práctica, tu ritmo',
    visual_prompt: 'https://www.canva.com/d/nKl2FwHrZ0idVlX',
    copy: `La transformación no ocurre en un día. Ocurre semana a semana, clase a clase. 🌱

En Tao Center Madrid ofrecemos clases semanales de Tai Chi y Tao Yin K.Y. para todos los niveles, con grupos reducidos para garantizar una atención personalizada y una práctica de calidad.

¿Por qué clases semanales y no solo talleres?

Porque el TAO se vive. Se practica. Se integra.
No es una información que se lee. Es una experiencia que se habita.

📅 Consulta horarios en taocenter.es
📍 Madrid centro

¿Te unes este mes? 🙏`,
    hashtags: ['#ClasesSemanales', '#TaoCenter', '#TaiChiMadrid', '#TaoYin', '#GruposReducidos', '#BienestarMadrid', '#PracticaConsciente'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-12`,
    post_number: 12,
    platform: 'IG',
    headline_visual: 'EL CAMINO EMPIEZA AQUÍ — CTA final Tao Center',
    visual_prompt: 'https://www.canva.com/d/weJ-4wRB4Sd5Drt',
    copy: `Hay un camino que lleva hacia adentro. El TAO te lo muestra. ☯️

Si has llegado hasta aquí, es porque algo en ti está listo para explorar.

En Tao Center Madrid te esperamos con:

🌿 Clases semanales de Tai Chi y Tao Yin
🌀 Seminarios y retiros intensivos
🤲 Sesiones de Chi Nei Tsang
📜 Formación de Profesores certificada

No importa tu punto de partida. Importa que des el primer paso.

El equilibrio no es un destino. Es una práctica diaria.

Empieza hoy. 🌙

👉 taocenter.es
📩 tao@taocenter.es`,
    hashtags: ['#TaoCenter', '#TaoMadrid', '#BienestarMadrid', '#TaiChi', '#TaoYin', '#ElCaminoEmpiezaAqui', '#TransformacionPersonal'],
    status: 'review',
  },
];

async function insertPosts() {
  console.log(`Insertando ${posts.length} posts para ${CLIENT_ID} (TAO CENTER MADRID)...`);

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

  console.log('\n✅ Todos los posts insertados para JAVIER MANRIQUE DE LARA (TAO CENTER MADRID)');
}

insertPosts().catch(console.error);
