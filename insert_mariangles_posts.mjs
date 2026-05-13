// insert_mariangles_posts.mjs
// MARÍANGELES MARCHESE – Psicóloga (duelo, depresión, trastornos de conducta, desánimo)
// Red Social: Instagram | Stage: J2 – 12 posts
// Run: node FlowAPP/insert_mariangles_posts.mjs

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';
const CLIENT_ID = 'mariangeles-marchese';

const posts = [
  {
    id: `${CLIENT_ID}-1`,
    post_number: 1,
    platform: 'IG',
    headline_visual: '¿LO RECONOCES? — Desánimo: cuando el cuerpo pide pausa',
    visual_prompt: 'https://www.canva.com/d/lpvLpaTRbIsSER4',
    copy: `¿Te levantas sin energía aunque hayas dormido?
¿Sientes que nada te motiva como antes?
¿Todo parece un esfuerzo enorme?

Eso que sientes tiene nombre: desánimo.

Y es más común de lo que crees.

El desánimo no siempre grita. Llega en silencio: en el cansancio que no cede, en las cosas que dejaste de disfrutar, en esa sensación de que todo pesa.

No estás sola/o. No estás rota/o.
Estás atravesando algo difícil, y mereces apoyo.

💙 ¿Te identificas? Cuéntame en los comentarios.`,
    hashtags: ['#desánimo', '#saludmental', '#psicología', '#apoyoemocional', '#emociones', '#bienestaremocional', '#marianglespsicóloga'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-2`,
    post_number: 2,
    platform: 'IG',
    headline_visual: 'SEÑALES DEL DESÁNIMO — Carrusel 5 señales con muñecos',
    visual_prompt: 'https://www.canva.com/d/04RF1WkSCPLJTP9',
    copy: `¿Tu cuerpo y tu mente te están pidiendo pausa? 👀

Desliza → y reconoce las señales del desánimo:

1️⃣ Cansancio que no descansa aunque duermas
2️⃣ Pierdes el interés por cosas que antes te gustaban
3️⃣ Todo parece un esfuerzo enorme
4️⃣ Te aíslas sin querer hacerlo
5️⃣ Sientes que "algo no está bien" pero no sabes qué

Si te identificas con 3 o más… escúchate.
Tu bienestar importa.

💙 Guarda este post si lo necesitas.`,
    hashtags: ['#desánimo', '#señalesdealarma', '#saludmental', '#psicología', '#bienestar', '#emociones', '#marianglespsicóloga'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-3`,
    post_number: 3,
    platform: 'IG',
    headline_visual: 'NO ES FALTA DE VOLUNTAD — Foto Mariangles fondo celeste',
    visual_prompt: 'https://www.canva.com/d/7dLbT31PkqtHD03',
    copy: `Seamos claras: el desánimo NO es esto:

❌ Pereza
❌ Debilidad
❌ Falta de voluntad
❌ Exageración

El desánimo es una respuesta real de tu sistema nervioso cuando ha cargado demasiado durante demasiado tiempo.

No es que no te esfuerces.
Es que tu cuerpo y tu mente han llegado a un límite.

Y ese límite merece respeto, no juicios.

🤍 ¿Cuántas veces te has dicho "tendría que poder con esto"?`,
    hashtags: ['#desánimo', '#autocompasión', '#saludmental', '#psicología', '#emociones', '#bienestar', '#marianglespsicóloga'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-4`,
    post_number: 4,
    platform: 'IG',
    headline_visual: 'EL DESÁNIMO PASA 💙 — Muñeco mirando hacia la luz',
    visual_prompt: 'https://www.canva.com/d/aVJRm4Qe0w0uEsQ',
    copy: `Quiero que sepas algo importante:

El desánimo no es para siempre.

Aunque ahora sientas que no hay salida, aunque te cueste ver la luz… existe un camino hacia adelante.

Con el acompañamiento adecuado puedes:
✨ Recuperar la energía
✨ Volver a encontrar ilusión
✨ Sentirte tú misma/o otra vez

No tienes que hacerlo sola/o.
Estoy aquí para acompañarte en ese proceso.

💙 Si sientes que necesitas apoyo, escríbeme. Link en bio.`,
    hashtags: ['#desánimo', '#esperanza', '#saludmental', '#terapia', '#psicología', '#apoyoemocional', '#marianglespsicóloga'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-5`,
    post_number: 5,
    platform: 'IG',
    headline_visual: '5 COSAS QUE PUEDES HACER HOY — Carrusel práctico celeste',
    visual_prompt: '',
    copy: `Si hoy sientes el peso del desánimo, prueba esto 👇
Guarda este post para cuando lo necesites 📌

1️⃣ MUÉVETE 10 minutos
No hace falta correr. Sal a caminar, estírate, pon música. El movimiento activa los neurotransmisores que combaten el desánimo.

2️⃣ ALIMÉNTATE BIEN
Aunque no tengas hambre. Tu cerebro necesita nutrientes para funcionar. Un plato completo puede marcar la diferencia en tu energía.

3️⃣ CONÉCTATE con alguien
Llama a una persona de confianza. No hace falta hablar de cómo te sientes. Solo no estés sola/o.

4️⃣ HAZ UNA COSA PEQUEÑA
No pienses en todo lo pendiente. Elige UNA tarea pequeña y hazla. Ese micro-logro reactiva tu sistema de recompensa.

5️⃣ BUSCA APOYO PROFESIONAL
Si el desánimo lleva semanas contigo, no esperes más. Un psicólogo/a puede ayudarte.

💙 ¿Cuál de estas vas a intentar hoy?`,
    hashtags: ['#desánimo', '#consejos', '#saludmental', '#autocuidado', '#bienestar', '#psicología', '#salud', '#marianglespsicóloga'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-6`,
    post_number: 6,
    platform: 'IG',
    headline_visual: '¿QUÉ ES EL DUELO? — Muñeco con manos en el pecho, fondo celeste suave',
    visual_prompt: '',
    copy: `El duelo no es solo lo que sientes cuando alguien fallece.

El duelo aparece en muchas formas:
💙 La pérdida de una relación
💙 Un trabajo que se fue
💙 La salud que cambió
💙 La vida que imaginabas y no fue

El duelo es el proceso natural de adaptarnos a una pérdida. Y tiene su tiempo.

No se supera. Se integra.

No existe un "ya deberías estar bien".
Cada persona vive su proceso de forma única.

🤍 ¿Estás atravesando un duelo ahora mismo?`,
    hashtags: ['#duelo', '#pérdida', '#saludmental', '#psicología', '#emociones', '#acompañamiento', '#marianglespsicóloga'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-7`,
    post_number: 7,
    platform: 'IG',
    headline_visual: 'FASES DEL DUELO — Carrusel celeste/blanco, muñeco por fase',
    visual_prompt: '',
    copy: `Las fases del duelo no son lineales.
Y eso está bien. 💙

Desliza para entender por qué te sientes como te sientes →

😶 Negación → "Esto no puede estar pasando"
😤 Ira → "No es justo"
🙏 Negociación → "Y si hubiera…"
😔 Tristeza → El peso de la realidad
🌱 Aceptación → Aprender a seguir

Pero atención: no siempre ocurren en este orden. No siempre aparecen todas. Puedes ir y volver entre ellas muchas veces.

El objetivo no es "superar" el duelo.
Es aprender a convivir con él y seguir viviendo.

🤍 Guarda este post si lo estás atravesando.`,
    hashtags: ['#duelo', '#fasesdelduelo', '#saludmental', '#psicología', '#pérdida', '#emociones', '#marianglespsicóloga'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-8`,
    post_number: 8,
    platform: 'IG',
    headline_visual: '¿TRISTEZA O DEPRESIÓN? — Imagen dividida celeste / gris, dos muñecos',
    visual_prompt: '',
    copy: `No toda tristeza es depresión.
Pero no toda depresión parece tristeza.

🔵 TRISTEZA
→ Aparece por un motivo concreto
→ Mejora con el tiempo
→ No impide tu día a día

🟣 DEPRESIÓN
→ Puede aparecer sin motivo claro
→ Persiste semanas o meses
→ Afecta el sueño, el apetito, la concentración
→ Pierdes el placer por todo
→ Puede incluir pensamientos negativos persistentes

Si lo que sientes lleva más de 2 semanas y afecta tu vida cotidiana… no lo dejes pasar.

Consultar con un profesional es el primer paso. 💙`,
    hashtags: ['#depresión', '#tristeza', '#saludmental', '#psicología', '#bienestar', '#salud', '#marianglespsicóloga'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-9`,
    post_number: 9,
    platform: 'IG',
    headline_visual: 'SEÑALES DE DEPRESIÓN — Carrusel celeste oscuro, texto blanco',
    visual_prompt: '',
    copy: `La depresión no siempre parece lo que crees.

A veces se disfraza de:

😶 Irritabilidad o mal humor constante
😴 Dormir demasiado o casi nada
🍽️ Comer sin parar o perder el apetito
📵 Aislarse de las personas que quieres
🧠 No poder concentrarte en nada
😶‍🌫️ Sentir que eres una carga para los demás
⬇️ Pensar que las cosas no van a mejorar

Si reconoces 3 o más en ti o en alguien que quieres… pide ayuda.

Buscar apoyo no es rendirse.
Es lo más valiente que puedes hacer. 💙`,
    hashtags: ['#depresión', '#señalesdealarma', '#saludmental', '#psicología', '#ayuda', '#bienestar', '#marianglespsicóloga'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-10`,
    post_number: 10,
    platform: 'IG',
    headline_visual: '¿MAL COMPORTAMIENTO O ALGO MÁS? — Foto familia celeste suave',
    visual_prompt: '',
    copy: `"Mi hijo/a tiene mal comportamiento… ¿o es algo más?"

Esta es una de las preguntas más frecuentes que recibo.

Un trastorno de conducta no es "un niño/a mal educado/a". Es un patrón de comportamiento persistente que interfiere en su vida y en la de los que le rodean.

Algunas señales a tener en cuenta:
🔹 Dificultad constante para seguir normas
🔹 Respuestas muy desproporcionadas ante la frustración
🔹 Conflictos frecuentes en casa, en el cole y con amigos
🔹 Conductas que no mejoran con el tiempo

La detección temprana y el acompañamiento adecuado marcan una diferencia enorme.

💙 Si tienes dudas sobre el comportamiento de tu hijo/a, hablemos.`,
    hashtags: ['#trastornosdeconducta', '#conducta', '#psicologíainfantil', '#familias', '#crianza', '#saludmental', '#marianglespsicóloga'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-11`,
    post_number: 11,
    platform: 'IG',
    headline_visual: '¿CUÁNDO PEDIR AYUDA? — Mariangles con mano extendida, celeste brillante',
    visual_prompt: '',
    copy: `¿Cuándo es el momento de pedir ayuda psicológica?

Cuando sientes que:
💙 Llevas semanas o meses sin encontrarte bien
💙 Tus emociones te desbordan con frecuencia
💙 Tu estado de ánimo afecta tu trabajo o tus relaciones
💙 Te aíslas o dejas de cuidarte
💙 Ya no disfrutas de casi nada
💙 Sientes que no puedes sola/o

No esperes a estar en el punto más bajo.

Pedir ayuda a tiempo es el mayor acto de amor propio que puedes hacer por ti.

Estoy aquí cuando estés lista/o. 💙
👉 Primera consulta → Link en bio.`,
    hashtags: ['#pedirayuda', '#psicología', '#saludmental', '#bienestar', '#terapia', '#apoyoemocional', '#autocuidado', '#marianglespsicóloga'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-12`,
    post_number: 12,
    platform: 'IG',
    headline_visual: 'PRESENTACIÓN MARIANGLES — Foto profesional fondo celeste, elementos lavanda/menta',
    visual_prompt: '',
    copy: `Hola, soy Mariangles 💙

Soy psicóloga y acompaño a personas que sienten que algo no está bien pero no saben muy bien por dónde empezar.

Me especializo en:
🔹 Duelo y pérdida
🔹 Depresión y desánimo
🔹 Trastornos de conducta
🔹 Acompañamiento emocional en adultos e infancia

Mi forma de trabajar es cercana, sin juicios y adaptada a cada persona. Porque cada proceso es único y merece un espacio propio.

Trabajo de forma presencial y online.

💙 Si estás pasando por un momento difícil, no tienes que hacerlo sola/o.
👉 Primera consulta → Link en bio.

¿Qué te trajo hasta aquí hoy? 👇`,
    hashtags: ['#psicóloga', '#psicología', '#saludmental', '#duelo', '#depresión', '#trastornosdeconducta', '#apoyoemocional', '#bienestaremocional', '#marianglespsicóloga'],
    status: 'review',
  },
];

async function insertPosts() {
  console.log(`Insertando ${posts.length} posts para ${CLIENT_ID} (MARÍANGELES MARCHESE)...`);

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

  console.log('\n✅ Todos los posts insertados para MARÍANGELES MARCHESE');
}

insertPosts().catch(console.error);
