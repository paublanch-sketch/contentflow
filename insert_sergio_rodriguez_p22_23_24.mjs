// insert_sergio_rodriguez_p22_23_24.mjs
// SERGIO RODRIGUEZ CORTAZAR – Indigo DJ School (@indigodjschool)
// Posts 22, 23 y 24 — formato POST ÚNICO (1 foto)
// Estilo visual: fondo oscuro, tipografía bold neon lila/morada, texto muy denso, ligeramente torcido/inclinado
// Run: node FlowAPP/insert_sergio_rodriguez_p22_23_24.mjs

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';
const CLIENT_ID = 'sergio-rodriguez-cortazar';

const posts = [
  {
    id: `${CLIENT_ID}-22`,
    post_number: 22,
    platform: 'IG',
    headline_visual: 'HOY ÚLTIMO DÍA — texto neon lila muy denso e inclinado sobre fondo casi negro',
    visual_prompt: 'Dark near-black background with deep purple grain texture and scanline effect. Main text VERY large, bold italic, slightly tilted ~5° anti-clockwise: "HOY ÚLTIMO DÍA" in neon lilac/electric purple glowing outline. Below, dense stacked lines of white bold text (tight line-spacing, almost overlapping): "PARA ENTRAR" / "EN LA TRIBU DJ". Third block in smaller neon yellow with same tilt: "MÓDULOS · MÚSICA LIBRE · MENTORÍA · COMUNIDAD". Bottom CTA: ">>> LINK EN BIO <<<" in neon pink glowing caps. ÍNDIGO logo top corner. Gritty, rave flyer energy — maximum text density filling ~85% of the frame.',
    copy: `⏳ HOY ES EL ÚLTIMO DÍA.

Si llevas semanas dándole vueltas a entrar en La Tribu DJ...
hoy se acaba el plazo.

No hay prórroga. No hay excepción.

Dentro de La Tribu DJ tienes:
→ Módulos de formación completos
→ Música de uso libre para tus sets
→ Mentorías grupales en vivo
→ Comunidad de DJs que de verdad quieren avanzar

No te pido que seas perfecto.
Te pido que des el paso antes de que se cierre.

Mañana ya no podrás.
Hoy sí.

📲 Reserva en el link en bio.

#UltimoDia #LaTribuDJ #InscripcionesAbiertas #IndigoDJSchool #CursoDJ #DJLife #FormacionDJ #EscuelaDJ #DJEspaña #SergeiRez`,
    hashtags: [
      '#UltimoDia',
      '#LaTribuDJ',
      '#InscripcionesAbiertas',
      '#IndigoDJSchool',
      '#CursoDJ',
      '#DJLife',
      '#FormacionDJ',
      '#EscuelaDJ',
      '#DJEspaña',
      '#SergeiRez',
    ],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-23`,
    post_number: 23,
    platform: 'IG',
    headline_visual: 'MEZCLA ARMÓNICA — texto educativo neon lila denso e inclinado, estilo infografía rave',
    visual_prompt: 'Dark background with subtle purple-to-black gradient and heavy film grain. Central composition: very bold italic white text slightly rotated ~4° clockwise: "MEZCLA ARMÓNICA" at top in massive neon lilac glow. Dense body of stacked short lines in white bold (tight tracking, almost monospaced feel): "BEATMATCHING" / "CAMELOT WHEEL" / "TRANSICIONES PROFESIONALES". Side decorative element: waveform illustration in electric violet. Small neon yellow label block: "GUARDA Y PRACTICA >>>" with underline. ÍNDIGO logo. Same gritty rave-flyer style — text fills 80% of frame, claustrophobic density.',
    copy: `🎧 Dos técnicas que separan al DJ amateur del profesional:

— MEZCLA ARMÓNICA
— BEATMATCHING PRECISO

¿En qué consisten?

𝗠𝗲𝘇𝗰𝗹𝗮 𝗮𝗿𝗺ó𝗻𝗶𝗰𝗮:
Mezclar canciones que están en tonos compatibles.
Resultado: las transiciones suenan naturales, no "rotas".
Herramienta clave: la rueda Camelot.
Cada canción tiene un número y una letra (ej: 8A).
Solo mezclas con vecinos en la rueda → 0 disonancia.

𝗕𝗲𝗮𝘁𝗺𝗮𝘁𝗰𝗵𝗶𝗻𝗴:
Sincronizar los BPM de dos temas antes de hacer la transición.
No se trata de que suene "en el tiempo" un segundo — se trata de mantenerlo y controlarlo.
El sync es una ayuda, no un sustituto de oído entrenado.

Combinados → tus mezclas dejan de sonar a principiante.

📌 Guarda este post y practícalo esta semana.
Si quieres aprender esto con profundidad, el enlace de la bio te espera.

#MezclaArmonica #Beatmatching #MixingSkills #IndigoDJSchool #CursoDJ #TecnicaDJ #AprendeADJ #DJTips #EscuelaDJ #FormacionDJ`,
    hashtags: [
      '#MezclaArmonica',
      '#Beatmatching',
      '#MixingSkills',
      '#IndigoDJSchool',
      '#CursoDJ',
      '#TecnicaDJ',
      '#AprendeADJ',
      '#DJTips',
      '#EscuelaDJ',
      '#FormacionDJ',
    ],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-24`,
    post_number: 24,
    platform: 'IG',
    headline_visual: 'EVOLUCIONA CADA DÍA — texto motivacional neon lila muy torcido e impactante sobre oscuro',
    visual_prompt: 'Foto de alumno DJ en cabina como fondo con overlay lila semitransparente + grain. Main headline extremely bold italic, rotated ~6° anti-clockwise: "EVOLUCIONA" / "CADA DÍA" en neon lila. Bloques densos: HISTORIAS · CONSEJOS · EJERCICIOS. CTA neon amarillo: CURSOS Y LA TRIBU DJ >>> BIO.',
    copy: `📈 El DJ que eres hoy no es el techo.

Crecer como DJ no pasa solo por practicar horas.
Pasa por tener las herramientas correctas cada semana:

→ Historias reales de DJs que han avanzado
→ Consejos aplicables desde el primer día
→ Ejercicios para progresar con intención, no al azar

Eso es lo que trabajamos en La Tribu DJ y en los cursos de Índigo.

No buscamos que suenes bien en casa.
Buscamos que tengas criterio, técnica y dirección de verdad.

¿Listo para el siguiente paso?

🔗 Más info en el link de la bio.
📲 WhatsApp: 622 15 14 11

#EvolucionaDJ #FormacionDJ #IndigoDJSchool #LaTribuDJ #CursoDJ #DJProfesional #AprendeADJ #DJLife #EscuelaDJ #SergeiRez`,
    hashtags: [
      '#EvolucionaDJ',
      '#FormacionDJ',
      '#IndigoDJSchool',
      '#LaTribuDJ',
      '#CursoDJ',
      '#DJProfesional',
      '#AprendeADJ',
      '#DJLife',
      '#EscuelaDJ',
      '#SergeiRez',
    ],
    status: 'review',
  },
];

async function insertPosts() {
  console.log(`\nInsertando ${posts.length} posts para ${CLIENT_ID}...\n`);

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
      const data = await res.json();
      console.log(`✓ Post ${post.post_number} — ${post.headline_visual.substring(0, 60)}...`);
    }
  }

  console.log('\n✅ Posts 22, 23 y 24 insertados para SERGIO RODRIGUEZ CORTAZAR');
}

insertPosts().catch(console.error);
