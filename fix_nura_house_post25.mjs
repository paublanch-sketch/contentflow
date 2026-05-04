import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

// Añade el post ancla de Personal Shopper como #25
// (el #13 ya existía con el contenido anterior de arquitectura)

const { error } = await supabase.from('posts').insert({
  id:              'marta-bayona-mas-25',
  client_id:       'marta-bayona-mas',
  post_number:     25,
  platform:        'IG',
  headline_visual: 'Personal Shopper Immobiliari',
  visual_prompt:   'Post àncora del feed — foto aèria o façana editorial de Barcelona, tipografia fina estil logo Nura House, fons blanc/crema',
  copy: `La recerca d'un immoble és una de les decisions més importants que prendràs.

A Nura House t'acompanyem de principi a fi: identifiquem oportunitats, valorem el potencial real de cada actiu i participem en tot el procés fins a la compra.

Una mirada experta i independent. Alineada sempre amb els teus objectius.

↳ Decideix amb criteri`,
  hashtags:        ['personalshopperinmobiliario','personalshopperimmobiliari','barcelona','comprarpisbarcelona','assessoramentimmobiliari','realestate','nurahouse','inversioimmobiliaria','habitatgebarcelona','barcelonarealestate'],
  status:          'review',
  feedback:        '',
  image_url:       '',
  webhook_sent_at: null,
});

if (error) console.error('❌ Error:', error.message);
else        console.log('✅ Post #25 — Personal Shopper Immobiliari afegit!');
