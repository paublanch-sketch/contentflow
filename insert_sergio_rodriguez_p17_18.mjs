// insert_sergio_rodriguez_p17_18.mjs
// SERGIO RODRIGUEZ CORTAZAR – La Tribu DJ (@latribudj)
// Posts 17 (carrusel) y 18 (reel alumnos prueba final)
// Run: node FlowAPP/insert_sergio_rodriguez_p17_18.mjs

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';
const CLIENT_ID = 'sergio-rodriguez-cortazar';

const posts = [
  {
    id: `${CLIENT_ID}-17`,
    post_number: 17,
    platform: 'IG',
    headline_visual: 'CARRUSEL — La mayoría de DJs está estancada porque NO tiene a quién preguntar',
    visual_prompt: 'https://www.canva.com/d/xCoGey605xBdlNF',
    copy: `La mayoría de DJs está estancada.

No porque no tengan talento.

Sino porque nadie les ha explicado cómo funciona esto de verdad. 👇

La escena no funciona por favores.
Funciona por decisiones económicas.

Cuando te meten en un cartel, están arriesgando taquilla, imagen y credibilidad. No te contratan por pena — te contratan si sumas a su negocio.

Pinchar bien es el mínimo.
Lo que marca la diferencia es si tu proyecto tiene sentido como negocio.

En La Tribu DJ trabajamos eso cada semana:
→ Mentorías grupales en vivo con Sergei y expertos de la industria REAL
→ Qué funciona HOY en la escena
→ Qué te frena y qué corregir YA

Deja de pedir hueco.
Empieza a construir valor. 🔥

📌 Link en bio para entrar a La Tribu DJ`,
    hashtags: ['#LaTribuDJ', '#MentoríaDJ', '#DJCarrera', '#IndustriaMusical', '#DJProfesional', '#SergeiDJ', '#AprendeADJ', '#CarreraDJ', '#MúsicaElectrónica', '#DJLife'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-18`,
    post_number: 18,
    platform: 'IG',
    headline_visual: 'REEL — Alumnos prueba final del curso: su primera vez con público real',
    visual_prompt: '',
    copy: `Esto es lo que pasa cuando alguien que nunca había tocado delante de nadie… sube al escenario por primera vez. 🎧

Estos son mis alumnos.

Acaban de pasar su prueba final del curso.

Para muchos de ellos, era la primera vez con público real.

No con amigos. No en casa. Delante de gente que no los conocía.

Y lo petaron.

Esto no es casualidad — es lo que pasa cuando entrenas en serio, con el enfoque correcto y con alguien que ya ha pasado por donde tú estás.

No existe un atajo para subirte a un escenario con confianza.
Pero sí existe un camino. 🔥

Si quieres ser uno de los que sube al siguiente, escríbeme. 📩

#LaTribuDJ`,
    hashtags: ['#LaTribuDJ', '#CursoDJ', '#AlumnosDJ', '#PrimeraVez', '#EscenarioDJ', '#AprendeADJ', '#DJCourse', '#SergeiDJ', '#DJLife', '#MúsicaElectrónica'],
    status: 'review',
  },
];

async function insertPosts() {
  console.log(`Insertando ${posts.length} posts para ${CLIENT_ID}...`);

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

  console.log('\n✅ Posts 17 y 18 insertados para SERGIO RODRIGUEZ CORTAZAR');
}

insertPosts().catch(console.error);
