// delete_mariangles_wrong_ids.mjs
// Borra posts con IDs incorrectos de MARÍANGELES MARCHESE
// Run: node FlowAPP/delete_mariangles_wrong_ids.mjs

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';

// IDs incorrectos que pueden haberse colado
const WRONG_IDS = [
  'mariangles-marcese',   // primer intento (sin e, sin ch)
  'mariangeles-marcese',  // segundo intento (faltaba ch)
];

async function deleteWrongPosts() {
  for (const wrongId of WRONG_IDS) {
    console.log(`\n🔍 Buscando posts con client_id: "${wrongId}"...`);

    // Primero consultar cuántos hay
    const checkRes = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?client_id=eq.${encodeURIComponent(wrongId)}&select=id,post_number,headline_visual`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    const found = await checkRes.json();

    if (!found.length) {
      console.log(`   ✓ No hay posts con ese ID. Limpio.`);
      continue;
    }

    console.log(`   ⚠️  Encontrados ${found.length} posts:`);
    found.forEach(p => console.log(`      - Post #${p.post_number}: ${p.headline_visual}`));

    // Borrar
    const delRes = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?client_id=eq.${encodeURIComponent(wrongId)}`,
      {
        method: 'DELETE',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: 'return=representation',
        },
      }
    );

    if (delRes.ok) {
      console.log(`   🗑️  ${found.length} posts borrados con client_id "${wrongId}"`);
    } else {
      const err = await delRes.text();
      console.error(`   ❌ Error borrando: ${err}`);
    }
  }

  console.log('\n✅ Limpieza completada.');
  console.log('   Posts correctos en: mariangeles-marchese');
  console.log('   → https://contentflow-4wos.vercel.app/p/mariangeles-marchese');
}

deleteWrongPosts().catch(console.error);
