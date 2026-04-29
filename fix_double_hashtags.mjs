import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

async function run() {
  console.log('🔍 Buscando posts con hashtags duplicados (##)...\n');

  const { data: posts, error } = await supabase.from('posts').select('id, hashtags');
  if (error) { console.error('Error al leer posts:', error); return; }

  let fixed = 0;
  let skipped = 0;

  for (const post of posts) {
    if (!post.hashtags || !Array.isArray(post.hashtags)) continue;

    const hasDoubleHash = post.hashtags.some(h => h.startsWith('#'));
    if (!hasDoubleHash) { skipped++; continue; }

    const cleanHashtags = post.hashtags.map(h =>
      h.startsWith('#') ? h.slice(1) : h
    );

    const { error: updateError } = await supabase
      .from('posts')
      .update({ hashtags: cleanHashtags })
      .eq('id', post.id);

    if (updateError) {
      console.error(`✗ Error en ${post.id}:`, updateError.message);
    } else {
      console.log(`✓ Corregido ${post.id}`);
      console.log(`  Antes:  ${post.hashtags.slice(0, 3).join(', ')}...`);
      console.log(`  Después: ${cleanHashtags.slice(0, 3).join(', ')}...\n`);
      fixed++;
    }
  }

  console.log(`\n✅ Corregidos: ${fixed} posts`);
  console.log(`⏭️  Sin cambios: ${skipped} posts`);
}

run();
