import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'javier-manrique-de-lara';

async function run() {
  console.log('🔄 Actualizando platform de IG → FB para Tao Center Madrid...\n');

  const { data, error } = await supabase
    .from('posts')
    .update({ platform: 'FB' })
    .eq('client_id', CLIENT_ID)
    .eq('platform', 'IG');

  if (error) {
    console.error('❌ Error:', error.message);
  } else {
    console.log(`✅ Posts actualizados a platform=FB`);
    console.log(`   → https://contentflow-4wos.vercel.app/p/${CLIENT_ID}`);
  }
}

run();
