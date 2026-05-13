import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'maria-de-los-angeles-matilla-carot';

// ─────────────────────────────────────────────────────────────────────────────
// 3 POSTS NUEVOS — BARCELONASAIL · Posts #15, #16 y #17
// Estilo: inglés solo · texto grande y vistoso · bold · foto sube el cliente
// ─────────────────────────────────────────────────────────────────────────────
const posts = [
  {
    post_number: 15,
    platform: 'IG',
    headline_visual: 'A different Tour at Sea',
    visual_prompt: 'Foto aérea de velero blanco en el Mediterráneo, personas nadando alrededor, agua azul profundo. Texto en imagen: "A different Tour at Sea". Logo BarcelonaSail esquina superior izquierda. El cliente sube la imagen.',
    copy: `A different tour at sea. 🌊⛵

No buses. No crowds. No ordinary views.

Just you, the open water, and Barcelona's coastline from a whole new angle.
Dive in, drift off, and discover the city the way it was meant to be seen — from the sea.

📍 Barcelona, Mediterranean Sea
Book your spot → barcelonasail.com
📲 (+34) 722 40 12 99`,
    hashtags: ['barcelonasail','adifferenttouratsea','sailingbarcelona','mediterraneanlife','barcelonafromthesea','sailandswim','travelbarcelona','experiencebarcelona','summersailing','oceanvibes'],
  },
  {
    post_number: 16,
    platform: 'IG',
    headline_visual: 'Enjoy our Cocktail Workshop and Sailing Cruise',
    visual_prompt: 'Foto interior velero: grupo de personas sonriendo con cocteleras, mesa con ingredientes de cóctel, luz cálida de atardecer entrando por cubierta. Texto en imagen: "ENJOY OUR COCKTAIL WORKSHOP AND SAILING CRUISE". Logo BarcelonaSail esquina superior izquierda. El cliente sube la imagen.',
    copy: `Shake it. Sip it. Sail it. 🍹⛵☀️

Enjoy our Cocktail Workshop & Sailing Cruise — the perfect mix of skill, sun, and sea.

Learn to craft your own cocktails while cruising the Mediterranean with the best company on board.

No experience needed. Just good vibes.

📩 DM us or book your place → barcelonasail.com
📲 (+34) 722 40 12 99`,
    hashtags: ['barcelonasail','cocktailworkshop','sailingcruise','enjoybarcelona','sailandsip','cocktailclass','boatexperience','mediterraneansummer','thingstodoinbarcelona','barcelonaactivities'],
  },
  {
    post_number: 17,
    platform: 'IG',
    headline_visual: 'Ready for your next chapter?',
    visual_prompt: 'Foto en cubierta de velero: grupo de chicas celebrando despedida de soltera, novia con velo, champaña, gafas de corazón, cielo azul y puerto de fondo. Texto en imagen: "READY FOR YOUR NEXT CHAPTER?". Logo BarcelonaSail esquina superior izquierda. El cliente sube la imagen.',
    copy: `Ready for your next chapter? 💍🥂⛵

Because the best way to celebrate the bride-to-be is sailing Barcelona's coast with her favourite people.

Sun, sea, champagne, and memories she'll never forget. 🌊

📩 DM us to plan the perfect bachelorette at sea.
Book now → barcelonasail.com
📲 (+34) 722 40 12 99`,
    hashtags: ['barcelonasail','readyforyournextchapter','bacheloretteparty','henparty','bridevibes','lastsailbeforetheveil','bacheloretteinbarcelona','sailingbarcelona','bridalparty','barcelonaevents'],
  },
];

async function run() {
  console.log('➕ Añadiendo posts #15, #16 y #17 — BarcelonaSail...');

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

  console.log('\n✅ Listo! Posts #15, #16 y #17 añadidos a BarcelonaSail.');
  console.log('   → https://contentflow-4wos.vercel.app/p/maria-de-los-angeles-matilla-carot');
}

run();
