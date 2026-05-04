import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

// Borra todos los posts del cliente duplicado "pinturas-muse"
// El cliente correcto de Hugo Saiz es: hugo-saiz-salamanca
// URL incorrecta: /p/pinturas-muse  ← esta se borra
// URL correcta:   /p/hugo-saiz-salamanca ← esta se mantiene

async function run() {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('client_id', 'pinturas-muse');

  if (error) {
    console.error('❌ Error al borrar:', error.message);
  } else {
    console.log('✅ Posts de "pinturas-muse" borrados correctamente.');
    console.log('   El cliente Hugo Saiz Salamanca sigue en:');
    console.log('   → https://contentflow-4wos.vercel.app/p/hugo-saiz-salamanca');
  }
}

run();
