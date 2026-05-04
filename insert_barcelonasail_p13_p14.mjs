import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'maria-de-los-angeles-matilla-carot';

// ─────────────────────────────────────────────────────────────────────────────
// 2 POSTS NUEVOS — BARCELONASAIL · Experiencias en Barcelona (#13 y #14)
// Estilo: inglés solo · texto grande y vistoso · bold · foto sube el cliente
// ─────────────────────────────────────────────────────────────────────────────
const posts = [
  {
    post_number: 13,
    platform: 'IG',
    headline_visual: 'Parc Güell — Barcelona from above',
    visual_prompt: 'Foto del cliente en Parc Güell — mosaicos de Gaudí, vistas panorámicas de Barcelona, luz cálida. El cliente sube la imagen.',
    copy: `BARCELONA NEVER GETS OLD. 🌿✨

From sailing the Mediterranean to standing in the middle of Gaudí's masterpiece — this city knows how to make you feel alive.

Parc Güell. One of the most iconic views in Barcelona.

And if you want to see it from the sea after? You know where to find us. 🌊⛵

Book your sailing experience → barcelonasail.com
📲 (+34) 722 40 12 99`,
    hashtags: ['barcelona','parcguell','gaudi','barcelonaexperiences','visitbarcelona','barcelonalife','barcelonasail','mediterraneansailing','sailingbarcelona','thingstodoinbarcelona','barcelonacity','travelblogger','travelspain','igtravel','experiencesbarcelona'],
  },
  {
    post_number: 14,
    platform: 'IG',
    headline_visual: 'Hot Air Balloons — Barcelona desde el cielo',
    visual_prompt: 'Foto del cliente en globo aerostático sobre Barcelona o campo catalán — amanecer, colores vibrantes, vistas épicas. El cliente sube la imagen.',
    copy: `BARCELONA FROM ABOVE. 🎈🌅

Hot air balloon over Catalonia. The sea in the distance. The city below. Pure magic.

At BarcelonaSail we believe Barcelona is best experienced from every angle — from the sky, from the land, and especially from the sea. 🌊⛵

Which perspective is YOUR favorite?

Drop a 🎈 if you'd love to fly — or a ⛵ if you'd rather sail.

Book your sailing experience → barcelonasail.com
📲 (+34) 722 40 12 99`,
    hashtags: ['hotairballoon','barcelonaballoon','barcelonaexperiences','visitbarcelona','barcelonalife','barcelonasail','mediterraneansailing','sailingbarcelona','thingstodoinbarcelona','barcelonacity','travelspain','luxuryexperiences','experiencesbarcelona','catalonia','bucketlist'],
  },
];

async function run() {
  console.log('➕ Añadiendo posts #13 y #14 — BarcelonaSail experiencias Barcelona...');

  for (const p of posts) {
    const { error } = await supabase.from('posts').insert({
      id:              `${CLIENT_ID}-${p.post_number}`,
      client_id:       CLIENT_ID,
      post_number:     p.post_number,
      platform:        p.platform,
      headline_visual: p.headline_visual,
      visual_prompt:   p.visual_prompt,
      copy:            p.copy,
      hashtags:        p.hashtags,
      status:          'review',
      feedback:        '',
      image_url:       '',
      webhook_sent_at: null,
    });
    if (error) console.error(`❌ Post #${p.post_number}:`, error.message);
    else        console.log(`✅ Post #${p.post_number} — ${p.headline_visual}`);
  }

  console.log('\n✅ Llest! Posts #13 y #14 añadidos a BarcelonaSail.');
  console.log('   → https://contentflow-4wos.vercel.app/p/maria-de-los-angeles-matilla-carot');
}

run();
