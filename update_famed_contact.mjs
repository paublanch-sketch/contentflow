// update_famed_contact.mjs
// Actualiza copy de posts 5-12 de FAMED con contacto correcto
// Run: node FlowAPP/update_famed_contact.mjs

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';
const CLIENT_ID = 'centro-de-especialidades-medicas-famed-sl';

const CONTACTO = `\n📞 +34 91 671 81 32 · +34 675 61 58 75\n🌐 www.clinica-famed.com`;

// Pares [post_number, nuevo bloque de contacto al final]
const updates = [5, 6, 7, 8, 9, 10, 11, 12];

async function patchContact() {
  for (const num of updates) {
    // 1. Leer post actual
    const getRes = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?id=eq.${CLIENT_ID}-${num}&select=id,copy`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    const [post] = await getRes.json();
    if (!post) { console.warn(`⚠ Post ${num} no encontrado`); continue; }

    // 2. Limpiar cualquier contacto viejo y añadir el nuevo
    let copy = post.copy
      .replace(/📞[^\n]*/g, '')
      .replace(/🔗[^\n]*/g, '')
      .replace(/🌐[^\n]*/g, '')
      .replace(/👉[^\n]*/g, '')
      .trimEnd();
    copy += CONTACTO;

    // 3. Actualizar
    const patchRes = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?id=eq.${CLIENT_ID}-${num}`,
      {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ copy }),
      }
    );
    console.log(patchRes.ok ? `✓ Post ${num} actualizado` : `✗ Post ${num}: ${await patchRes.text()}`);
  }
  console.log('\n✅ Contacto actualizado en posts 5-12 de FAMED');
}

patchContact().catch(console.error);
