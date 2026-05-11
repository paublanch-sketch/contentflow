// insert_sergio_rodriguez_p27_p28.mjs
// SERGIO RODRIGUEZ CORTAZAR – Indigo DJ School (@indigodjschool)
// Posts 27 y 28 — Reels de valor y testimonio
// Estilo: fondo oscuro, tipografía bold neon lila/rosa, energía rave, texto impactante
// Run: node FlowAPP/insert_sergio_rodriguez_p27_p28.mjs

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';
const CLIENT_ID = 'sergio-rodriguez-cortazar';

const posts = [
  {
    id: `${CLIENT_ID}-27`,
    post_number: 27,
    platform: 'IG',
    headline_visual: 'ESTO PASA DENTRO DE LA TRIBU — reel valor comunidad, texto neon lila oscuro',
    visual_prompt: 'Dark near-black background with deep purple grain texture. Bold italic neon lilac headline slightly tilted: "ESTO PASA" / "DENTRO DE LA TRIBU". Dense stacked white lines below: "Contexto. Feedback. Dirección." / "Lo que muchos echan en falta fuera." Side text vertical rotated: "EVOLUCIONA" left, "DJ SCHOOL" right in neon pink. CTA block neon yellow: ">>> LINK EN BIO <<<". ÍNDIGO logo top left. Same gritty rave-flyer energy, text fills 80% of frame.',
    copy: `🎧 Esto pasa dentro de La Tribu.

No es contenido. Es contexto, feedback y dirección.

Lo que pasa aquí dentro es lo que muchos echan en falta fuera:

→ Alguien que te diga exactamente qué mejorar
→ DJs que van en serio, no a perder el tiempo
→ Dirección real para que cada semana avances

No venimos aquí a subir reels.
Venimos a construir DJs con criterio.

¿Lo que pasa dentro te falta fuera?

📲 Más info en el link de la bio.
📞 WhatsApp: 622 15 14 11

#LaTribuDJ #IndigoDJSchool #ComunidadDJ #FormacionDJ #DJLife #CursoDJ #AprendeADJ #EscuelaDJ #DJEspaña #SergeiRez`,
    hashtags: [
      '#LaTribuDJ',
      '#IndigoDJSchool',
      '#ComunidadDJ',
      '#FormacionDJ',
      '#DJLife',
      '#CursoDJ',
      '#AprendeADJ',
      '#EscuelaDJ',
      '#DJEspaña',
      '#SergeiRez',
    ],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-28`,
    post_number: 28,
    platform: 'IG',
    headline_visual: 'LO DICEN ELLOS — reel testimonio DJs reales, texto neon impactante oscuro',
    visual_prompt: 'Dark background with purple-to-black gradient and heavy film grain. Bold italic neon lilac/white massive title: "LO DICEN" / "ELLOS" slightly rotated ~5°. Below, dense testimonial-style stacked lines: "No es una promesa." / "Es lo que está pasando dentro." / "DJs con historias distintas." / "Un objetivo común: avanzar con dirección." Vertical text sides: "EVOLUCIONA" / "DJ SCHOOL" neon pink. CTA block neon yellow: ">>> LINK EN BIO <<<". ÍNDIGO logo top corner. Rave-flyer style, gritty, maximum energy.',
    copy: `💬 Lo dicen ellos.

No es una promesa. Es lo que está pasando dentro.

DJs con historias distintas, pero con algo en común:
querían avanzar con dirección — y lo están consiguiendo.

No te lo digo yo.
Te lo dicen los que llevan semanas dentro de La Tribu DJ.

¿La diferencia?
Dejaron de esperar el momento perfecto
y empezaron a construir el suyo.

¿Cuándo vas a ser el siguiente?

📲 Más info en el link de la bio.
📞 WhatsApp: 622 15 14 11

#Testimonios #LaTribuDJ #IndigoDJSchool #DJLife #FormacionDJ #CursoDJ #AprendeADJ #EscuelaDJ #DJEspaña #SergeiRez`,
    hashtags: [
      '#Testimonios',
      '#LaTribuDJ',
      '#IndigoDJSchool',
      '#DJLife',
      '#FormacionDJ',
      '#CursoDJ',
      '#AprendeADJ',
      '#EscuelaDJ',
      '#DJEspaña',
      '#SergeiRez',
    ],
    status: 'review',
  },
];

async function insertPosts() {
  console.log(`\nInsertando ${posts.length} posts para ${CLIENT_ID}...\n`);

  for (const post of posts) {
    const payload = {
      id:              post.id,
      client_id:       CLIENT_ID,
      post_number:     post.post_number,
      platform:        post.platform,
      headline_visual: post.headline_visual,
      visual_prompt:   post.visual_prompt,
      copy:            post.copy,
      hashtags:        post.hashtags,
      status:          post.status,
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
      method: 'POST',
      headers: {
        apikey:          SUPABASE_KEY,
        Authorization:   `Bearer ${SUPABASE_KEY}`,
        'Content-Type':  'application/json',
        Prefer:          'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`✗ Post ${post.post_number}: ${err}`);
    } else {
      console.log(`✓ Post ${post.post_number} — ${post.headline_visual.substring(0, 60)}...`);
    }
  }

  console.log('\n✅ Posts 27 y 28 insertados para SERGIO RODRIGUEZ CORTAZAR');
  console.log('   → https://contentflow-4wos.vercel.app/p/sergio-rodriguez-cortazar');
}

insertPosts().catch(console.error);
