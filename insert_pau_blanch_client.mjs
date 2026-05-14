// insert_pau_blanch_client.mjs
// Inserta "Pau Blanch" como cliente en Supabase
// Run: node FlowAPP/insert_pau_blanch_client.mjs

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';

// Solo las columnas que existen en la tabla
const client = {
  id:       'pau-blanch',
  name:     'PAU BLANCH',
  platform: 'IG',
  email:    'pau.blanch@interactivos.net',
};

async function run() {
  console.log('Insertando cliente:', client.name);

  const res = await fetch(`${SUPABASE_URL}/rest/v1/clients`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer':        'resolution=merge-duplicates',
    },
    body: JSON.stringify(client),
  });

  const text = await res.text();
  if (res.ok || res.status === 201) {
    console.log('✅ Cliente insertado correctamente');
  } else {
    console.error('❌ Error:', res.status, text);
  }
}

run();
