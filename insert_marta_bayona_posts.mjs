import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'marta-bayona-mas';

const posts = [
  {
    post_number: 1,
    platform: 'IG',
    headline_visual: 'Dissenyem espais com un conjunt',
    visual_prompt: 'Post ancla del feed — layout editorial split-frame, dos marcs cream amb fotos interiors, fons crema clar',
    copy: `Dissenyem espais com un conjunt. Arquitectura, interiorisme i mobiliari s'uneixen per crear entorns funcionals, equilibrats i amb sentit. Cada projecte comença escoltant l'espai, el seu context i el seu ús real.

↳ Disseny, observat`,
    hashtags: ['architecturestudio','interiordesignconcept','designprocess','architecturalspaces','designwithpurpose'],
  },
  {
    post_number: 2,
    platform: 'IG',
    headline_visual: 'Un espai pensat com un tot',
    visual_prompt: 'Plano general + detalls, fons crema, tipografia elegant',
    copy: `Un espai pensat com un tot. Arquitectura, interiorisme i mobiliari treballen junts per crear equilibri, funcionalitat i identitat. Cada decisió respon a l'espai i al seu ús real.

↳ Guarda-ho per referència`,
    hashtags: ['architectureproject','interiordesignstudio','customspaces','spatialdesign','designinspiration'],
  },
  {
    post_number: 3,
    platform: 'IG',
    headline_visual: 'Llum i materials',
    visual_prompt: 'Coherència cromàtica i ritme visual, llum natural, materials honestos',
    copy: `Caràcter industrial, llum natural i materials honestos. Dissenyem espais serens i atemporals, on la llum i la materialitat defineixen l'atmosfera sense elements superflus.

↳ Un detall a tenir en compte`,
    hashtags: ['industrialdesign','naturallightdesign','materiality','architecturaldetails','interiorarchitecture'],
  },
  {
    post_number: 4,
    platform: 'IG',
    headline_visual: 'El procés sobre el resultat',
    visual_prompt: 'Carousel 3 pàgines — storytelling i procés de disseny, fons crema clar',
    copy: `El disseny no comença amb la imatge final. Comença amb idees, proves, materials i moltes decisions. Aquest procés defineix el resultat final.

↳ Llegeix-ho amb calma`,
    hashtags: ['designprocess','architecturestudio','behindthescenesdesign','creativeprocess','designthinking'],
  },
  {
    post_number: 5,
    platform: 'IG',
    headline_visual: 'El mobiliari com a arquitectura',
    visual_prompt: 'Enfocament B2B sense venda directa, mobiliari integrat a l\'espai',
    copy: `El mobiliari no és un complement. Forma part de l'arquitectura i del funcionament de l'espai. L'integrem pensant en l'ús real i les necessitats professionals.

↳ Vist amb intenció`,
    hashtags: ['contractfurniture','architecturalfurniture','professionalspaces','interiordesignsolutions','designintegration'],
  },
  {
    post_number: 6,
    platform: 'IG',
    headline_visual: 'Del concepte a l\'espai',
    visual_prompt: 'Post pensat per guardats, evolució del projecte pas a pas, fons clar',
    copy: `Del concepte a l'espai. Cada projecte evoluciona pas a pas, alineant estètica, funció i context per crear espais coherents i duradors.

↳ Val la pena tornar-hi`,
    hashtags: ['architectureconcept','interiordesignproject','spatialconcept','designworkflow','architectureinspiration'],
  },
  {
    post_number: 7,
    platform: 'IG',
    headline_visual: 'El detall mínim',
    visual_prompt: 'Imatge neta sense text, material i llum en primer pla',
    copy: `Material, llum i equilibri. De vegades la força d'un espai està en allò que es redueix, no en el que s'afegeix.

↳ Un detall a tenir en compte`,
    hashtags: ['materialdesign','lightandspace','architecturalbalance','interiordetails','designcriteria'],
  },
  {
    post_number: 8,
    platform: 'IG',
    headline_visual: 'Decisions invisibles',
    visual_prompt: 'Carousel 3 pàgines — educatiu subtil, decisions tècniques que defineixen l\'espai',
    copy: `Algunes decisions no són visibles a primera vista. Materials, proporcions i solucions tècniques defineixen com es viu un espai amb el temps.

↳ Llegeix-ho amb calma`,
    hashtags: ['designstrategy','architecturaldecisions','interiordesignprocess','spatialexperience','designmethod'],
  },
  {
    post_number: 9,
    platform: 'IG',
    headline_visual: 'Vida d\'estudi',
    visual_prompt: 'Humanitzar la marca, estudi de treball, materials i maquetes',
    copy: `L'estudi també és un espai de treball. Un lloc on es proven idees, es revisen materials i els projectes prenen forma.

↳ Disseny, observat`,
    hashtags: ['architecturestudio','designworkspace','creativeenvironment','studioarchitecture','designculture'],
  },
  {
    post_number: 10,
    platform: 'IG',
    headline_visual: 'Recorregut de l\'espai',
    visual_prompt: 'Únic reel del mes — llum, textures i proporcions en moviment',
    copy: `Recorrent l'espai. La llum, les textures i les proporcions defineixen l'experiència.

↳ Vist amb intenció`,
    hashtags: ['architecturalwalkthrough','spatialdesign','interiorvideo','architectureexperience','designspaces'],
  },
  {
    post_number: 11,
    platform: 'IG',
    headline_visual: 'L\'ús del mobiliari',
    visual_prompt: 'Ús real, mobiliari professional en context diari',
    copy: `Dissenyat per ser utilitzat, no només observat. El mobiliari professional ha de respondre al context, la durabilitat i l'ús diari.

↳ Val la pena tornar-hi`,
    hashtags: ['professionaldesign','contractinteriors','functionaldesign','architecturalfurniture','designsolutions'],
  },
  {
    post_number: 12,
    platform: 'IG',
    headline_visual: 'L\'elecció del material',
    visual_prompt: 'Fomentar comentaris, detall de material i la seva justificació de disseny',
    copy: `Per què aquest material funciona aquí. Cada elecció respon a l'espai, la seva funció i l'atmosfera que volem crear.

↳ Un detall a tenir en compte`,
    hashtags: ['materialselection','designcriteria','architecturalchoices','interiordesignthinking','projectdetails'],
  },
  {
    post_number: 13,
    platform: 'IG',
    headline_visual: 'Col·laborem amb arquitectes',
    visual_prompt: 'Tancament del mes — posicionament B2B, col·laboració professional',
    copy: `Col·laborem amb arquitectes i dissenyadors. Oferim suport tècnic, solucions de mobiliari i una visió compartida durant tot el projecte.

↳ Disseny, observat`,
    hashtags: ['architecturecollaboration','designpartners','b2barchitecture','interiordesignstudio','professionalprojects'],
  },
];

async function run() {
  // Borrar posts existentes del cliente
  const { error: delErr } = await supabase
    .from('posts')
    .delete()
    .eq('client_id', CLIENT_ID);
  if (delErr) { console.error('Error al borrar:', delErr.message); process.exit(1); }
  console.log('🗑️  Posts anteriores borrados');

  // Insertar todos
  for (const p of posts) {
    const { error } = await supabase.from('posts').insert({
      id:             `${CLIENT_ID}-${p.post_number}`,
      client_id:      CLIENT_ID,
      post_number:    p.post_number,
      platform:       p.platform,
      headline_visual: p.headline_visual,
      visual_prompt:  p.visual_prompt,
      copy:           p.copy,
      hashtags:       p.hashtags,
      status:         'review',
      feedback:       '',
      image_url:      '',
      webhook_sent_at: null,
    });
    if (error) console.error(`❌ Post #${p.post_number}:`, error.message);
    else        console.log(`✅ Post #${p.post_number} — ${p.headline_visual}`);
  }
  console.log('\n✅ Listo. Recarga ContentFlow para ver los posts de MARTA BAYONA MAS.');
}

run();
