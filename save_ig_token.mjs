// save_ig_token.mjs
// Guarda manualmente el token de Instagram en Supabase
// Run: node FlowAPP/save_ig_token.mjs

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';

// ─── RELLENA ESTOS DATOS CON LO QUE TE DA META ───────────────────────────────
const CLIENT_ID    = 'interactivos';       // cliente en ContentFlow
const ACCESS_TOKEN = 'PEGA_AQUI_EL_TOKEN'; // token largo que da Meta
const IG_USER_ID   = 'PEGA_AQUI_EL_USER_ID'; // numeric ID de tu cuenta IG Business
const IG_USERNAME  = 'PEGA_AQUI_TU_USUARIO'; // @usuario sin @
// ─────────────────────────────────────────────────────────────────────────────

if (ACCESS_TOKEN === 'PEGA_AQUI_EL_TOKEN') {
  console.error('❌ Rellena ACCESS_TOKEN, IG_USER_ID e IG_USERNAME antes de ejecutar');
  process.exit(1);
}

const expires_at = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(); // 60 días

const res = await fetch(`${SUPABASE_URL}/rest/v1/ig_tokens`, {
  method: 'POST',
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'resolution=merge-duplicates,return=representation',
  },
  body: JSON.stringify({
    client_id:    CLIENT_ID,
    ig_user_id:   IG_USER_ID,
    ig_username:  IG_USERNAME,
    access_token: ACCESS_TOKEN,
    expires_at,
    updated_at:   new Date().toISOString(),
  }),
});

if (res.ok) {
  console.log(`✅ Token guardado para "${CLIENT_ID}" (@${IG_USERNAME})`);
  console.log(`   Expira: ${expires_at}`);
  console.log(`\n   Ya puedes publicar desde ContentFlow.`);
} else {
  const err = await res.text();
  console.error('❌ Error:', err);
}
