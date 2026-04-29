import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'gregoriojerez';

const post = {
  id: `${CLIENT_ID}-13`,
  client_id: CLIENT_ID,
  post_number: 13,
  platform: 'IG',
  headline_visual: 'Fondo cálido de piedra natural. Titular grande: "Esto es lo que pasa cuando el cliente sabe lo que quiere." Lista de materiales del proyecto. Estilo editorial BdB.',
  copy: `Esto es lo que pasa cuando el cliente sabe lo que quiere y el material acompaña. 🏠

Fachada de piedra natural.
Pavimento de porcelato exterior.
Piscina con piedra.
Muro de jardín.
Proyecto completo.

Todo con material de BdB.

En BdB no vendemos solo metros cuadrados de cerámica o piedra. Trabajamos con arquitectos, constructores y particulares para que el proyecto salga como se imaginó desde el principio.

Desde la elección del material hasta el asesoramiento en la instalación.

¿El tuyo, cuándo empieza?
📩 adrian@gregoriojerez.com
🌐 gregoriojerez.com`,
  hashtags: ['BdB', 'ProyectoCompleto', 'PiedraYCerámica', 'ProyectoReal', 'FachadaPiedra', 'Porcelato', 'Piscina', 'CasaConEstilo', 'LespedreresBdB', 'Construir'],
  status: 'review',
  feedback: '',
  image_url: 'https://www.canva.com/d/OdNM8nP0QFW7Rcf',
  webhook_sent_at: null,
};

async function run() {
  const { error } = await supabase.from('posts').upsert(post, { onConflict: 'id' });
  if (error) {
    console.error('❌ Error:', error.message);
  } else {
    console.log('✅ Post gregoriojerez-13 insertado correctamente');
    console.log('   Canva: https://www.canva.com/d/OdNM8nP0QFW7Rcf');
  }
}

run();
