import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'marta-bayona-mas';

// ─────────────────────────────────────────────────────────────────────────────
// 12 POSTS — NURA HOUSE · Personal Shopper Immobiliari · Instagram
// Tono: elegant, expert, independent. Fons: nurahouse.com
// ─────────────────────────────────────────────────────────────────────────────
const posts = [
  {
    post_number: 13,
    platform: 'IG',
    headline_visual: 'Personal Shopper Immobiliari',
    visual_prompt: 'Post àncora del feed — foto aèria o façana editorial de Barcelona, tipografia fina estil logo Nura House, fons blanc/crema',
    copy: `La recerca d'un immoble és una de les decisions més importants que prendràs.

A Nura House t'acompanyem de principi a fi: identifiquem oportunitats, valorem el potencial real de cada actiu i participem en tot el procés fins a la compra.

Una mirada experta i independent. Alineada sempre amb els teus objectius.

↳ Decideix amb criteri`,
    hashtags: ['personalshopperinmobiliario','personalshopperimmobiliari','barcelona','comprarpisbarcelona','assessoramentimmobiliari','realestate','nurahouse','inversioimmobiliaria','habitatgebarcelona','barcelonarealestate'],
  },
  {
    post_number: 14,
    platform: 'IG',
    headline_visual: 'No treballem per al venedor',
    visual_prompt: 'Imatge minimalista — dues mans en conversa, o consultant mirant plànol amb client. Fons neutre, llum natural',
    copy: `El Personal Shopper Immobiliari no representa el venedor.
Treballa exclusivament per a tu.

Sense comissions d'agència. Sense interessos creuats.

Analitzem cada oportunitat amb independència i criteri, perquè la decisió sigui sempre la millor — la teva.

↳ Una visió global`,
    hashtags: ['personalshopperinmobiliario','assessormentimmobiliari','independencia','comprarpisbarcelona','nurahouse','realestate','barcelona','comprarcasa','assessorimmobiliari','inversioimmobiliaria'],
  },
  {
    post_number: 15,
    platform: 'IG',
    headline_visual: 'Del primer pas a la clau a la mà',
    visual_prompt: 'Carousel 3 pàgines — Slide 1: Identificació (mapa/cerca) · Slide 2: Anàlisi (plànol/dades) · Slide 3: Compra (claus/firma). Estètica editorial, fons crema clar',
    copy: `Un procés immobiliari no hauria de ser estressant. Hauria de ser clar.

↳ Llegeix-ho amb calma

[Slide 1] IDENTIFICACIÓ
Definim amb tu els criteris de cerca i localitzem les oportunitats que realment s'adapten als teus objectius.

[Slide 2] ANÀLISI
Valorem el potencial real de cada actiu: zona, estat, preu i possibilitats de transformació.

[Slide 3] COMPRA
T'acompanyem en les negociacions, la documentació i tot el procés fins a la firma.`,
    hashtags: ['personalshopperinmobiliario','processimmobiliari','comprarpisbarcelona','nurahouse','barcelona','assessoramentimmobiliari','guiacomprar','inversioimmobiliaria','realestatebarcelona','comprarcasa'],
  },
  {
    post_number: 16,
    platform: 'IG',
    headline_visual: 'Per a qui és aquest servei?',
    visual_prompt: 'Dos ambients en una mateixa imatge editorial: pis residencial lluminós (primera residència) i actiu urbà amb caràcter (inversió). Fons blanc.',
    copy: `Tant si busques la teva primera residència com si explores oportunitats d'inversió, el nostre acompanyament s'adapta als teus objectius.

A Nura House treballem amb persones que volen prendre decisions immobiliàries amb criteri i sense improvisar.

No per a tothom.
Per als que valoren el temps i el rigor.

↳ Decideix amb criteri`,
    hashtags: ['personalshopperinmobiliario','inversioimmobiliaria','comprarcasabarcelona','primeravivenda','realestatebarcelona','nurahouse','assessoramentimmobiliari','barcelona','habitatgebarcelona','propietatimmobiliaria'],
  },
  {
    post_number: 17,
    platform: 'IG',
    headline_visual: 'No tot el que brilla és una bona compra',
    visual_prompt: 'Foto d\'un espai amb molt de potencial però poc explotat — llum, estructura neta, sense mobiliari. Atmosfera de descobriment. Fons clar.',
    copy: `Saber llegir el potencial real d'un immoble és una habilitat.
No és intuïció — és experiència i anàlisi.

A Nura House avaluem cada actiu de forma integral: ubicació, estat, mercat, potencial de transformació i retorn a llarg termini.

Perquè el que sembla una ganga pot ser una trampa.
I el que sembla car pot ser l'oportunitat.

↳ Acompanyament real`,
    hashtags: ['personalshopperinmobiliario','potencialimmobiliari','comprarpisbarcelona','inversioimmobiliaria','nurahouse','assessoramentimmobiliari','barcelona','valoracioimmobiliaria','realestatebarcelona','comprarambcriteri'],
  },
  {
    post_number: 18,
    platform: 'IG',
    headline_visual: 'La compra és el principi',
    visual_prompt: 'Díptic editorial: espai buit pre-reforma a l\'esquerra, espai transformat elegant a la dreta. Llum natural, estètica serena.',
    copy: `A Nura House el servei no acaba amb la firma.

Si cal, acompanyem també la transformació i la posada en valor de l'immoble adquirit.

Repensem espais per adaptar-los a noves necessitats, millorant funcionalitat i coherència estètica.

Una visió global, de l'origen al resultat.

↳ Una visió global`,
    hashtags: ['transformacioimmobiliaria','personalshopperinmobiliario','reformabarcelona','posadaenvalor','nurahouse','dissenydeespais','barcelona','comprarireformar','assessoramentimmobiliari','realestatebarcelona'],
  },
  {
    post_number: 19,
    platform: 'IG',
    headline_visual: 'Noves formes de viure',
    visual_prompt: 'Espai co-living modern — àrees comunes elegants, llum càlida, persones en ambient relaxat. Estètica editorial, tons clars.',
    copy: `El co-living i els models intergeneracionals no són tendències.
Són respostes a una nova manera d'entendre la vida en comunitat.

A Nura House desenvolupem i acompanyem projectes vinculats a nous formats d'habitatge, adaptats a contextos socials canviants.

Per als que busquen viure d'una altra manera.

↳ Val la pena llegir-ho`,
    hashtags: ['coliving','nouformathabitatge','colivingbarcelona','nurahouse','habitatgeinnovador','barcelona','habitatgeintergeneracional','realestate','comunitat','personalshopperinmobiliario'],
  },
  {
    post_number: 20,
    platform: 'IG',
    headline_visual: 'Prendre decisions sense incertesa',
    visual_prompt: 'Persona serena mirant per una finestra gran, llum natural abundant, sensació de calma. Composició minimalista, fons blanc/crema.',
    copy: `Comprar un immoble hauria de ser una decisió conscient i segura.
No una font d'ansietat.

El Personal Shopper Immobiliari existeix per eliminar la incertesa: analitzem, acompanyem i assessorem perquè puguis decidir amb tranquil·litat.

Un servei pensat per a decisions importants.

↳ Decideix amb criteri`,
    hashtags: ['personalshopperinmobiliario','tranquilitat','comprarpisbarcelona','nurahouse','assessoramentimmobiliari','barcelona','seguretatimmobiliaria','decidirambcriteri','inversioimmobiliaria','realestate'],
  },
  {
    post_number: 21,
    platform: 'IG',
    headline_visual: 'El nostre criteri és el teu actiu',
    visual_prompt: 'Retrat editorial del consultor/a en ambient professional i proper — escriptori net, plànols, llum natural. Tò càlid i honest.',
    copy: `A Nura House treballem des d'una experiència real en transformació d'habitatges i projectes propis.

No assessorem des de la teoria.
Assessorem des de qui ha viscut el procés.

Escoltant, analitzant i acompanyant amb rigor, honestedat i implicació personal.

↳ Acompanyament real`,
    hashtags: ['personalshopperinmobiliario','honestedat','nurahouse','barcelona','assessoramentimmobiliari','experienciareal','criteriprofessional','realestate','comprarpisbarcelona','confianca'],
  },
  {
    post_number: 22,
    platform: 'IG',
    headline_visual: 'Conèixer el mercat fa la diferència',
    visual_prompt: 'Vista urbana de Barcelona — barri elegant, façanes característiques, llum de tarda daurada. Composició serena i editorial.',
    copy: `No tots els barris es comporten igual.
No tots els actius tenen el mateix potencial.

Conèixer el mercat immobiliari de Barcelona — la seva dinàmica, els seus cicles i les seves oportunitats — és el primer pas per prendre bones decisions.

↳ Una visió global`,
    hashtags: ['barcelonarealestate','mercatimmobiliari','personalshopperinmobiliario','comprarpisbarcelona','nurahouse','barcelona','inversioimmobiliaria','habitatgebarcelona','realestatebarcelona','oportunitat'],
  },
  {
    post_number: 23,
    platform: 'IG',
    headline_visual: 'Com funciona — pas a pas',
    visual_prompt: 'Carousel 4 pàgines — Slide 1: Portada "Com t\'acompanyem" · Slide 2: Primera conversa · Slide 3: Cerca i anàlisi · Slide 4: Negociació i tancament. Tipografia fina, fons crema.',
    copy: `Saps com funciona un Personal Shopper Immobiliari?

↳ Llegeix-ho amb calma

[Slide 1] COM T'ACOMPANYEM A NURA HOUSE

[Slide 2] PRIMERA CONVERSA
Definim els teus objectius, el pressupost i els criteris que guiaran la cerca.

[Slide 3] CERCA I ANÀLISI
Identifiquem oportunitats, les visitem i les valoreu de forma objectiva i independent.

[Slide 4] NEGOCIACIÓ I TANCAMENT
T'acompanyem en l'oferta, la negociació, la due diligence i tot el procés fins a la firma.`,
    hashtags: ['personalshopperinmobiliario','comfunciona','comprarpisbarcelona','nurahouse','assessoramentimmobiliari','barcelona','guiacomprar','inversioimmobiliaria','realestatebarcelona','pasapas'],
  },
  {
    post_number: 24,
    platform: 'IG',
    headline_visual: 'La primera conversa és gratuïta',
    visual_prompt: 'Espai acollidor i elegant — cadira buida davant una finestra gran, llum natural, sensació de benvinguda. Tipografia fina amb CTA. Fons blanc/crema.',
    copy: `Si estàs pensant en comprar un immoble — per viure, per invertir, o per transformar — parlem.

La primera conversa no et compromet a res.
Només a entendre si podem acompanyar-te bé.

📩 info@nurahouse.com
📱 +34 619 29 40 25
🌐 nurahouse.com

↳ La primera conversa és gratuïta`,
    hashtags: ['personalshopperinmobiliario','nurahouse','barcelona','assessoramentimmobiliari','comprarcasabarcelona','inversioimmobiliaria','realestate','personalshopperimmobiliari','habitatgebarcelona','parlem'],
  },
];

async function run() {
  console.log('➕ Afegint posts #13–#24 (sense esborrar els existents)...');

  // Insertar todos
  for (const p of posts) {
    const { error } = await supabase.from('posts').insert({
      id:              `${CLIENT_ID}-${p.post_number}`,
      client_id:       CLIENT_ID,
      post_number:     p.post_number,
      platform:        p.platform,
      headline_visual: p.headline_visual,
      visual_prompt:   p.visual_prompt,
      copy:            p.copy,
      hashtags:        p.hashtags,
      status:          'review',
      feedback:        '',
      image_url:       '',
      webhook_sent_at: null,
    });
    if (error) console.error(`❌ Post #${p.post_number}:`, error.message);
    else        console.log(`✅ Post #${p.post_number} — ${p.headline_visual}`);
  }

  console.log('\n✅ Llest! Posts #13–#24 afegits. Recarrega ContentFlow.');
  console.log('   → https://contentflow-4wos.vercel.app/p/marta-bayona-mas');
}

run();
