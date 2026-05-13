// check_interactivos_post.mjs
// node FlowAPP/check_interactivos_post.mjs

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';

const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?client_id=eq.interactivos&select=id,post_number,headline_visual,image_url,status`, {
  headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
});
const posts = await res.json();

console.log('\n📋 Posts de INTERACTIVOS (Pau Blanch):\n');
for (const p of posts) {
  console.log(`Post #${p.post_number} — ${p.headline_visual}`);
  console.log(`  status:    ${p.status}`);
  console.log(`  image_url: ${p.image_url || '⚠️  VACÍO — sin imagen'}`);
  console.log('');
}

// También revisar ig_tokens
const t = await fetch(`${SUPABASE_URL}/rest/v1/ig_tokens?client_id=eq.interactivos&select=ig_username,ig_user_id,expires_at`, {
  headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
});
const tokens = await t.json();
console.log('🔑 Token Instagram conectado:');
if (!tokens.length) {
  console.log('  ⚠️  No hay token. Reconecta la cuenta Instagram.');
} else {
  const tk = tokens[0];
  console.log(`  username:   @${tk.ig_username}`);
  console.log(`  user_id:    ${tk.ig_user_id}`);
  console.log(`  expires_at: ${tk.expires_at || 'no definido'}`);
}
