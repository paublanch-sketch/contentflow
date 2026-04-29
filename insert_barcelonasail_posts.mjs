// insert_barcelonasail_posts.mjs
// Ejecutar con: node insert_barcelonasail_posts.mjs
// Inserta posts 1–12 de MARIA DE LOS ANGELES MATILLA CAROT (@barcelona.sail) en Supabase
// Cliente: BarcelonaSail — Instagram — EN INGLÉS
//
// ⚠️  Verifica el CLIENT_ID buscando el cliente en https://contentflow-4wos.vercel.app
//     Si es incorrecto, cámbialo antes de ejecutar.

import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'maria-de-los-angeles-matilla-carot'; // ← verifica en ContentFlow

const POSTS = [
  {
    post_number: 1,
    platform: 'IG',
    scheduled_date: '2026-05-05',
    headline_visual: 'SPRING IS HERE — foto velero en horizonte abierto, overlay oscuro, texto bold blanco apilado',
    visual_prompt: 'BarcelonaSail Instagram post. Full-bleed photo of a sailboat on open Mediterranean sea, clear blue sky, spring light. Dark semi-transparent overlay (40%). Small circular BarcelonaSail anchor logo top-center in white. Bold white stacked text center: "SPRING" line break "IS HERE". Tiny white text bottom: "barcelonasail.com". Clean, minimal, slow-travel aesthetic. No filler text.',
    copy: `The Mediterranean wakes up slowly in spring. Longer days, softer light and a sea that feels entirely yours.

This is the season we love most — quieter, warmer and full of possibility.

Book your spring experience — link in bio.`,
    hashtags: ['SpringSailing', 'BarcelonaSailing', 'MediterraneanSpring', 'SailBarcelona', 'TravelSpain', 'SlowTravelSpain', 'BarcelonaCoast', 'MediterraneanLifestyle', 'SeaVibes', 'SailingLife'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 2,
    platform: 'IG',
    scheduled_date: '2026-05-08',
    headline_visual: 'TRUSTED EXPERIENCES — foto grupo a bordo catamaran, 5 estrellas doradas, overlay oscuro',
    visual_prompt: 'BarcelonaSail Instagram post. Full-bleed photo of smiling guests on a catamaran at sea, Barcelona skyline in background, golden afternoon light. Dark overlay. Small anchor logo top-center in white. Bold white text center: "TRUSTED" line break "EXPERIENCES". Row of 5 small gold stars below the text. No extra text. Clean premium aesthetic.',
    copy: `"Best experience we had in Barcelona — the crew was incredible, the boat stunning and the whole day felt effortless."

Real words from real guests. We're grateful for every single one.

See more reviews & book — link in bio.`,
    hashtags: ['5StarExperience', 'TrustedByTravelers', 'BarcelonaBoatTour', 'RealReviews', 'AuthenticTravel', 'MediterraneanExperience', 'SailingBarcelona', 'TravelReviews', 'GuestExperience', 'VisitBarcelona'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 3,
    platform: 'IG',
    scheduled_date: '2026-05-12',
    headline_visual: 'GOLDEN HOUR ONBOARD — foto cócteles en cubierta, overlay dorado cálido, texto bold blanco',
    visual_prompt: 'BarcelonaSail Instagram post. Full-bleed photo of champagne glasses and cocktails being served on the deck of a boat at golden hour, Barcelona coast blurred in background. Warm golden semi-transparent overlay. Anchor logo top-center white. Bold white text: "GOLDEN HOUR" line break "ONBOARD". Tiny subtitle: "Sunset sailing · barcelonasail.com". Luxury warm aesthetic.',
    copy: `There are few things better than watching Barcelona's skyline fade into gold from the deck of a boat.

Drink in hand. Wind in your hair. Nowhere else to be.

Sunset charters available — DM us to reserve yours.`,
    hashtags: ['SunsetSailing', 'GoldenHour', 'BarcelonaSunset', 'CocktailsAtSea', 'MediterraneanSunset', 'SailingLife', 'BarcelonaLife', 'SlowLiving', 'SunsetVibes', 'PrivateSailing'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 4,
    platform: 'IG',
    scheduled_date: '2026-05-15',
    headline_visual: 'LUXURY AZIMUT YACHT — foto yate desde ángulo bajo, overlay oscuro profundo, texto elegante',
    visual_prompt: 'BarcelonaSail Instagram post. Full-bleed low-angle photo of a sleek white Azimut motor yacht on blue Mediterranean water. Very dark deep navy overlay (55%). Anchor logo top-center white. Bold white text: "LUXURY" line break "AZIMUT YACHT". Small white subtitle below: "Up to 11 guests · From 390€ · barcelonasail.com". Premium product aesthetic. No filler text.',
    copy: `12 meters of pure Mediterranean elegance.

The Azimut welcomes up to 11 guests with drinks, snacks and paddleboards included. Choose your duration: 2, 3 or 4 hours — and let Barcelona's coastline do the rest.

Book via link in bio.`,
    hashtags: ['AzimutYacht', 'LuxuryYacht', 'BarcelonaYacht', 'YachtCharter', 'PrivateSailing', 'LuxuryCharter', 'BarcelonaCoast', 'YachtLife', 'MediterraneanLuxury', 'SailBarcelona'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 5,
    platform: 'IG',
    scheduled_date: '2026-05-19',
    headline_visual: 'DIVE IN — foto velero inclinado navegando, overlay navy suave, texto bold blanco + subtitle',
    visual_prompt: 'BarcelonaSail Instagram post. Full-bleed dynamic side-angle photo of a sailing boat heeling in the wind on turquoise Mediterranean water. Light navy semi-transparent overlay. Anchor logo top-center white. Bold white text center: "DIVE IN". Smaller white text below: "Paddleboards & snorkeling onboard". Energetic yet refined aesthetic.',
    copy: `The Mediterranean in spring is clearer, calmer and entirely yours.

Onboard: paddleboards, snorkeling gear and all the time in the world to stop, breathe and float.

Book your sailing experience — link in bio.`,
    hashtags: ['Snorkeling', 'PaddleBoard', 'MediterraneanSea', 'BarcelonaBoatTour', 'SailAndSwim', 'SummerReady', 'BarcelonaOcean', 'WaterSports', 'SlowTravel', 'BarcelonaSailing'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 6,
    platform: 'IG',
    scheduled_date: '2026-05-22',
    headline_visual: 'THE PERFECT MOMENT — foto pareja íntima a bordo, overlay muy oscuro, texto minimal',
    visual_prompt: 'BarcelonaSail Instagram post. Full-bleed intimate photo of a couple on the bow of a sailboat, calm sea, warm Mediterranean light, candid and romantic. Very dark overlay (60%). Small anchor logo top-center white. Bold white stacked text center: "THE PERFECT" line break "MOMENT". No subtitle — minimalist luxury. No filler text.',
    copy: `Sometimes the most important moments deserve the most extraordinary settings.

The Mediterranean has witnessed proposals, anniversaries and quiet declarations of love — each one different, each one unforgettable.

Plan your private moment. DM us.`,
    hashtags: ['RomanticSailing', 'ProposalBarcelona', 'BarcelonaProposal', 'LoveAtSea', 'PrivateCharter', 'CouplesSailing', 'RomanticEscape', 'MediterraneanMoments', 'SpecialOccasion', 'SailBarcelona'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 7,
    platform: 'IG',
    scheduled_date: '2026-05-26',
    headline_visual: 'CELEBRATE DIFFERENTLY — foto grupo amigos en cubierta riendo, overlay oscuro, texto bold energético',
    visual_prompt: 'BarcelonaSail Instagram post. Full-bleed photo of a group of friends laughing and celebrating on the deck of a catamaran, sunny day, sea in background. Dark overlay. Anchor logo top-center white. Bold white text: "CELEBRATE" line break "DIFFERENTLY". Small white text below: "Private group charters — 12 to 30 people". Fun premium aesthetic.',
    copy: `Birthdays are better at sea.

Trade the restaurant table for an open deck, surrounded by water, sky and the people who matter most. We take care of everything — you just show up.

Private group charters from 12 to 30 people. DM us.`,
    hashtags: ['BirthdayAtSea', 'CelebrationSailing', 'PrivateCharter', 'BarcelonaBirthday', 'GroupSailing', 'FriendsAtSea', 'BarcelonaExperiences', 'PartyOnBoard', 'MediterraneanParty', 'SailBarcelona'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 8,
    platform: 'IG',
    scheduled_date: '2026-05-29',
    headline_visual: 'HEN PARTY AT SEA — foto champagne en cubierta festiva, overlay rosado suave, texto bold blanco',
    visual_prompt: 'BarcelonaSail Instagram post. Full-bleed photo of champagne bottles and glasses on a yacht deck, festive atmosphere, sea background, warm light. Subtle rose/champagne tinted overlay. Anchor logo top-center white. Bold white text: "HEN PARTY" line break "AT SEA". Small white subtitle: "BarcelonaSail — Private charters". Celebratory premium aesthetic.',
    copy: `Because the bride deserves the best send-off — and the Mediterranean delivers.

Champagne, coastline views and the people she loves most. We handle the rest.

Private bachelorette charters available. DM us to plan the perfect celebration.`,
    hashtags: ['BacheloretteParty', 'HenParty', 'SailingBarcelona', 'BrideToBeBarcelona', 'PrivateSailing', 'HenDo', 'BarcelonaHenParty', 'CelebrationAtSea', 'GirlsTrip', 'SailBarcelona'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 9,
    platform: 'IG',
    scheduled_date: '2026-06-02',
    headline_visual: 'TEAM BUILDING AT SEA — skyline Barcelona desde mar, overlay azul marino, texto corporativo bold',
    visual_prompt: 'BarcelonaSail Instagram post. Full-bleed photo of Barcelona skyline (W Hotel, Port Olímpic) seen from the sea on a clear day. Deep navy blue overlay (45%). Anchor logo top-center white. Bold white text: "TEAM BUILDING" line break "AT SEA". Small white subtitle: "Private corporate charters — barcelonasail.com". Clean corporate-premium aesthetic.',
    copy: `Some ideas come to life when you step away from the office.

There's something about open water that shifts perspective — conversations flow differently, connections form naturally and the horizon has a way of clearing the mind.

Private corporate charters available. DM us for pricing.`,
    hashtags: ['CorporateSailing', 'TeamBuilding', 'PrivateCharter', 'BarcelonaEvents', 'CorporateExperiences', 'TeamOuting', 'BarcelonaBusiness', 'OfficeEscape', 'WorkAndSail', 'MediterraneanTeamBuilding'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 10,
    platform: 'IG',
    scheduled_date: '2026-06-05',
    headline_visual: '13 YEARS AT SEA — velero en mar abierto vista lateral, overlay oscuro, texto heritage bold',
    visual_prompt: 'BarcelonaSail Instagram post. Full-bleed photo of a sailboat on open Mediterranean water, wide-angle side view, soft natural light. Dark overlay (50%). Anchor logo top-center white. Bold white text: "13 YEARS" line break "AT SEA". Small white text: "barcelonasail.com". Heritage, trust, minimal aesthetic. No filler text.',
    copy: `Thirteen years of Mediterranean sailing. Thousands of guests. One constant: the belief that the best experiences are born on the water.

We've sailed with families, couples, friends and companies — each journey different, each one memorable.

See you on board.`,
    hashtags: ['BarcelonaSailing', 'TrustedByTravelers', 'SailingExperts', 'MediterraneanExperience', 'AuthenticExperiences', '13Years', 'BarcelonaBoatTour', 'SailingLife', 'SeaMemories', 'VisitBarcelona'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 11,
    platform: 'IG',
    scheduled_date: '2026-06-09',
    headline_visual: 'SUMMER IS BOOKING FAST — velero en mar azul intenso cielo despejado, overlay mínimo, texto urgente bold',
    visual_prompt: 'BarcelonaSail Instagram post. Full-bleed vibrant photo of a sailboat on deep blue Mediterranean water under a perfectly clear summer sky. Very minimal dark overlay (25%) — keep the vivid blue. Anchor logo top-center white. Bold white text: "SUMMER IS" line break "BOOKING FAST". Small white text: "June · July · August — link in bio". Bright, energetic, seasonal.',
    copy: `The best summer plans don't happen by chance — they happen on the water.

Spots are already filling for June, July and August. If you're planning a Barcelona escape, now is the time.

Book your sailing experience — link in bio.`,
    hashtags: ['SummerSailing', 'BookNow', 'BarcelonaSummer', 'SailBarcelona', 'MediterraneanSummer', 'SummerPlans', 'BarcelonaTravel', 'SummerEscape', 'SailLife', 'TravelSpain'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 12,
    platform: 'IG',
    scheduled_date: '2026-06-12',
    headline_visual: 'GIVE THE SEA — velero al atardecer luz dorada, overlay dorado cálido, texto bold + gift CTA',
    visual_prompt: 'BarcelonaSail Instagram post. Full-bleed photo of a sailboat at golden sunset, warm amber and orange light reflecting on calm water, silhouette feel. Warm golden overlay (35%). Anchor logo top-center white. Bold white text: "GIVE" line break "THE SEA". Small white subtitle: "Gift vouchers available — barcelonasail.com". Emotional, warm, gift aesthetic.',
    copy: `Some gifts are forgotten by the next morning. A sailing experience in Barcelona stays with you for years.

Because experiences shape us in ways that things never can.

Gift vouchers available — contact us directly.`,
    hashtags: ['GiftExperience', 'SailingGift', 'BarcelonaGift', 'ExperienceGifts', 'MediterraneanExperience', 'GiftIdeas', 'TravelGift', 'PrivateSailing', 'UnforgettableGifts', 'BarcelonaSailing'],
    status: 'review',
    image_url: '',
  },
];

async function run() {
  console.log('📝 Insertando 12 posts de BARCELONA SAIL (posts 13–24)...\n');
  let ok = 0;
  for (const p of POSTS) {
    const record = {
      id:             `${CLIENT_ID}-${p.post_number}`,
      client_id:      CLIENT_ID,
      post_number:    p.post_number,
      platform:       p.platform,
      headline_visual: p.headline_visual,
      visual_prompt:  p.visual_prompt,
      copy:           p.copy,
      hashtags:       p.hashtags,
      status:         p.status,
      feedback:       '',
      image_url:      p.image_url || '',
      webhook_sent_at: null,
    };
    const { error } = await sb.from('posts').upsert(record);
    if (error) console.error(`❌ Post #${p.post_number}:`, error.message);
    else {
      console.log(`✅ Post #${p.post_number} (${p.scheduled_date}) — ${p.headline_visual.slice(0, 55)}...`);
      ok++;
    }
  }
  console.log(`\n🏁 Listo. ${ok}/12 posts insertados (posts 1–12).`);
  console.log(`🔗 Ver en: https://contentflow-4wos.vercel.app (busca MARIA DE LOS ANGELES MATILLA CAROT)`);
}

run();
