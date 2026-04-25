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
    headline_visual: 'Designing spaces as a whole',
    visual_prompt: 'Post ancla del feed, presentación de marca',
    copy: `We design spaces as a whole. Architecture, interior design and furniture come together to create environments that are functional, balanced and meaningful. Every project starts with listening to the space, its context and its real use.

— Dissenyem els espais com un conjunt. Arquitectura, interiorisme i mobiliari s'uneixen per crear entorns funcionals, equilibrats i amb sentit. Cada projecte comença escoltant l'espai, el seu context i el seu ús real.

↳ Design, observed`,
    hashtags: ['architecturestudio','interiordesignconcept','designprocess','architecturalspaces','designwithpurpose'],
  },
  {
    post_number: 2,
    platform: 'IG',
    headline_visual: 'Project as a whole',
    visual_prompt: 'Plano general + detalles',
    copy: `A space designed as a whole. Architecture, interior design and furniture work together to create balance, functionality and identity. Every decision responds to the space and the way it will be used.

— Un espai pensat com un tot. Arquitectura, interiorisme i mobiliari treballen junts per crear equilibri, funcionalitat i identitat. Cada decisió respon a l'espai i al seu ús real.

↳ Save for reference`,
    hashtags: ['architectureproject','interiordesignstudio','customspaces','spatialdesign','designinspiration'],
  },
  {
    post_number: 3,
    platform: 'IG',
    headline_visual: 'Light and materials',
    visual_prompt: 'Coherencia cromática y ritmo visual',
    copy: `Industrial character, natural light and honest materials. We design calm and timeless spaces, where light and materiality define the atmosphere without unnecessary elements.

— Caràcter industrial, llum natural i materials honestos. Dissenyem espais serens i atemporals, on la llum i la materialitat defineixen l'atmosfera sense elements superflus.

↳ A detail to keep in mind`,
    hashtags: ['industrialdesign','naturallightdesign','materiality','architecturaldetails','interiorarchitecture'],
  },
  {
    post_number: 4,
    platform: 'IG',
    headline_visual: 'Process over result',
    visual_prompt: 'Introducir storytelling y proceso',
    copy: `Design doesn't start with the final image. It begins with ideas, tests, materials and many decisions along the way. This process defines the final result.

— El disseny no comença amb la imatge final. Comença amb idees, proves, materials i moltes decisions. Aquest procés defineix el resultat final.

↳ Read it slowly`,
    hashtags: ['designprocess','architecturestudio','behindthescenesdesign','creativeprocess','designthinking'],
  },
  {
    post_number: 5,
    platform: 'IG',
    headline_visual: 'Furniture as architecture',
    visual_prompt: 'Enfoque B2B sin venta directa',
    copy: `Furniture is not an accessory. It is part of the architecture and the way a space works. We integrate furniture thinking about real use and professional needs.

— El mobiliari no és un complement. Forma part de l'arquitectura i del funcionament de l'espai. L'integrem pensant en l'ús real i les necessitats professionals.

↳ Seen with intention`,
    hashtags: ['contractfurniture','architecturalfurniture','professionalspaces','interiordesignsolutions','designintegration'],
  },
  {
    post_number: 6,
    platform: 'IG',
    headline_visual: 'Concept to space',
    visual_prompt: 'Post pensado para guardados',
    copy: `From concept to space. Each project evolves step by step, aligning aesthetics, function and context to create coherent and lasting spaces.

— Del concepte a l'espai. Cada projecte evoluciona pas a pas, alineant estètica, funció i context per crear espais coherents i duradors.

↳ Worth revisiting`,
    hashtags: ['architectureconcept','interiordesignproject','spatialconcept','designworkflow','architectureinspiration'],
  },
  {
    post_number: 7,
    platform: 'IG',
    headline_visual: 'Minimal detail',
    visual_prompt: 'Imagen limpia, sin texto',
    copy: `Material, light and balance. Sometimes the strength of a space lies in what is reduced, not in what is added.

— Material, llum i equilibri. De vegades la força d'un espai està en allò que es redueix, no en el que s'afegeix.

↳ A detail to keep in mind`,
    hashtags: ['materialdesign','lightandspace','architecturalbalance','interiordetails','designcriteria'],
  },
  {
    post_number: 8,
    platform: 'IG',
    headline_visual: 'Invisible decisions',
    visual_prompt: 'Educativo sutil',
    copy: `Some decisions are not immediately visible. Materials, proportions and technical solutions define how a space is experienced over time.

— Algunes decisions no són visibles a primera vista. Materials, proporcions i solucions tècniques defineixen com es viu un espai amb el temps.

↳ Read it slowly`,
    hashtags: ['designstrategy','architecturaldecisions','interiordesignprocess','spatialexperience','designmethod'],
  },
  {
    post_number: 9,
    platform: 'IG',
    headline_visual: 'Studio life',
    visual_prompt: 'Humanizar la marca',
    copy: `Our studio is also a workspace. A place where ideas are tested, materials are reviewed and projects take shape.

— L'estudi també és un espai de treball. Un lloc on es proven idees, es revisen materials i els projectes prenen forma.

↳ Design, observed`,
    hashtags: ['architecturestudio','designworkspace','creativeenvironment','studioarchitecture','designculture'],
  },
  {
    post_number: 10,
    platform: 'IG',
    headline_visual: 'Space walkthrough',
    visual_prompt: 'Único reel del mes',
    copy: `Walking through the space. Light, textures and proportions define the experience.

— Recorrent l'espai. La llum, les textures i les proporcions defineixen l'experiència.

↳ Seen with intention`,
    hashtags: ['architecturalwalkthrough','spatialdesign','interiorvideo','architectureexperience','designspaces'],
  },
  {
    post_number: 11,
    platform: 'IG',
    headline_visual: 'Furniture use',
    visual_prompt: 'Uso real',
    copy: `Designed to be used, not just seen. Professional furniture must respond to context, durability and daily use.

— Dissenyat per ser utilitzat, no només observat. El mobiliari professional ha de respondre al context, la durabilitat i l'ús diari.

↳ Worth revisiting`,
    hashtags: ['professionaldesign','contractinteriors','functionaldesign','architecturalfurniture','designsolutions'],
  },
  {
    post_number: 12,
    platform: 'IG',
    headline_visual: 'Material choice',
    visual_prompt: 'Fomentar comentarios',
    copy: `Why this material works here. Each choice responds to the space, its function and the atmosphere we want to create.

— Per què aquest material funciona aquí. Cada elecció respon a l'espai, la seva funció i l'atmosfera que volem crear.

↳ A detail to keep in mind`,
    hashtags: ['materialselection','designcriteria','architecturalchoices','interiordesignthinking','projectdetails'],
  },
  {
    post_number: 13,
    platform: 'IG',
    headline_visual: 'B2B positioning',
    visual_prompt: 'Cierre del mes',
    copy: `We collaborate with architects and designers. Providing technical support, furniture solutions and a shared vision throughout the project.

— Col·laborem amb arquitectes i dissenyadors. Oferim suport tècnic, solucions de mobiliari i una visió compartida durant tot el projecte.

↳ Design, observed`,
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
