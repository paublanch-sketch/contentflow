// fix_entelsat_posts.mjs
// Ejecutar con: node fix_entelsat_posts.mjs
// Corrige contactos cruzados en los posts de ENTELSAT / SATFRIO

import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'entelsat-instalaciones-y-promociones-integrales-slu';

// ─── Reglas de corrección ─────────────────────────────────────────────────────
// Posts SatFrio (climatización): #4 y #11
//   → teléfono correcto: 951 834 295
//   → web correcta: satfrio.com / www.satfrio.com
//   → email correcto: info@satfrio.com
// Posts Entelsat (telecomunicaciones): resto
//   → teléfono correcto: 952 23 80 79
//   → web correcta: entelsat.com / www.entelsat.com
//   → email correcto: entelsat@entelsat.com

const SATFRIO_POSTS = [4, 11];

function fixCopy(postNumber, copy) {
  let fixed = copy;
  const isSatFrio = SATFRIO_POSTS.includes(postNumber);

  if (isSatFrio) {
    // En posts SatFrio: corregir teléfono y web si son de Entelsat
    fixed = fixed.replace(/952\s?23\s?80\s?79/g, '951 834 295');
    fixed = fixed.replace(/entelsat@entelsat\.com/gi, 'info@satfrio.com');
    fixed = fixed.replace(/www\.entelsat\.com/gi, 'www.satfrio.com');
    fixed = fixed.replace(/entelsat\.com(?!\.)/gi, 'satfrio.com');
  } else {
    // En posts Entelsat: corregir si aparece teléfono SatFrio
    fixed = fixed.replace(/951\s?834\s?295/g, '952 23 80 79');
    fixed = fixed.replace(/951\s?83\s?42\s?95/g, '952 23 80 79');
    fixed = fixed.replace(/info@satfrio\.com/gi, 'entelsat@entelsat.com');
    // No tocar satfrio.com si aparece como referencia de marca — solo teléfono/email
  }

  return fixed;
}

async function run() {
  console.log('🔍 Leyendo posts de ENTELSAT...\n');
  const { data, error } = await sb
    .from('posts')
    .select('id, post_number, copy')
    .eq('client_id', CLIENT_ID)
    .order('post_number');

  if (error) { console.error('❌ Error:', error.message); return; }

  let changes = 0;
  for (const post of data) {
    const fixed = fixCopy(post.post_number, post.copy);
    if (fixed !== post.copy) {
      console.log(`✏️  Post #${post.post_number} — corrigiendo...`);
      console.log('   ANTES:', post.copy.slice(-80));
      console.log('   AHORA:', fixed.slice(-80));
      const { error: upErr } = await sb
        .from('posts')
        .update({ copy: fixed })
        .eq('id', post.id);
      if (upErr) console.error(`   ❌ Error en #${post.post_number}:`, upErr.message);
      else { console.log(`   ✅ Post #${post.post_number} actualizado`); changes++; }
    } else {
      console.log(`   ✓ Post #${post.post_number} ya correcto`);
    }
  }
  console.log(`\n🏁 Listo. ${changes} posts corregidos.`);
}

run();
