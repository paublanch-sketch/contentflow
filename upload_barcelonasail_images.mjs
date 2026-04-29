// upload_barcelonasail_images.mjs
// Inserta los 12 posts de MARIA DE LOS ANGELES MATILLA CAROT en Supabase
// Las imágenes se añaden manualmente desde Canva después
// Ejecutar con: node upload_barcelonasail_images.mjs

import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'maria-de-los-angeles-matilla-carot';

const POSTS = [
  {
    post_number: 1,
    platform: 'IG',
    scheduled_date: '2026-05-05',
    headline_visual: 'SPRING IS HERE — velero horizonte abierto, overlay oscuro, texto bold blanco',
    copy: `The Mediterranean wakes up slowly in spring. Longer days, softer light and a sea that feels entirely yours.\n\nThis is the season we love most — quieter, warmer and full of possibility.\n\nBook your spring experience — link in bio.`,
    hashtags: ['SpringSailing','BarcelonaSailing','MediterraneanSpring','SailBarcelona','TravelSpain','SlowTravelSpain','BarcelonaCoast','MediterraneanLifestyle','SeaVibes','SailingLife'],
  },
  {
    post_number: 2,
    platform: 'IG',
    scheduled_date: '2026-05-08',
    headline_visual: 'TRUSTED EXPERIENCES — catamarán grupo a bordo, 5 estrellas doradas, overlay oscuro',
    copy: `"Best experience we had in Barcelona — the crew was incredible, the boat stunning and the whole day felt effortless."\n\nReal words from real guests. We're grateful for every single one.\n\nSee more reviews & book — link in bio.`,
    hashtags: ['5StarExperience','TrustedByTravelers','BarcelonaBoatTour','RealReviews','AuthenticTravel','MediterraneanExperience','SailingBarcelona','TravelReviews','GuestExperience','VisitBarcelona'],
  },
  {
    post_number: 3,
    platform: 'IG',
    scheduled_date: '2026-05-12',
    headline_visual: 'GOLDEN HOUR ONBOARD — cócteles en cubierta, overlay dorado cálido, texto bold blanco',
    copy: `There are few things better than watching Barcelona's skyline fade into gold from the deck of a boat.\n\nDrink in hand. Wind in your hair. Nowhere else to be.\n\nSunset charters available — DM us to reserve yours.`,
    hashtags: ['SunsetSailing','GoldenHour','BarcelonaSunset','CocktailsAtSea','MediterraneanSunset','SailingLife','BarcelonaLife','SlowLiving','SunsetVibes','PrivateSailing'],
  },
  {
    post_number: 4,
    platform: 'IG',
    scheduled_date: '2026-05-15',
    headline_visual: 'LUXURY AZIMUT YACHT — yate desde ángulo bajo, overlay oscuro profundo, texto elegante',
    copy: `12 meters of pure Mediterranean elegance.\n\nThe Azimut welcomes up to 11 guests with drinks, snacks and paddleboards included. Choose your duration: 2, 3 or 4 hours — and let Barcelona's coastline do the rest.\n\nBook via link in bio.`,
    hashtags: ['AzimutYacht','LuxuryYacht','BarcelonaYacht','YachtCharter','PrivateSailing','LuxuryCharter','BarcelonaCoast','YachtLife','MediterraneanLuxury','SailBarcelona'],
  },
  {
    post_number: 5,
    platform: 'IG',
    scheduled_date: '2026-05-19',
    headline_visual: 'DIVE IN — velero inclinado navegando, overlay navy suave, texto bold blanco',
    copy: `The Mediterranean in spring is clearer, calmer and entirely yours.\n\nOnboard: paddleboards, snorkeling gear and all the time in the world to stop, breathe and float.\n\nBook your sailing experience — link in bio.`,
    hashtags: ['Snorkeling','PaddleBoard','MediterraneanSea','BarcelonaBoatTour','SailAndSwim','SummerReady','BarcelonaOcean','WaterSports','SlowTravel','BarcelonaSailing'],
  },
  {
    post_number: 6,
    platform: 'IG',
    scheduled_date: '2026-05-22',
    headline_visual: 'THE PERFECT MOMENT — pareja íntima a bordo, overlay muy oscuro, texto minimal',
    copy: `Sometimes the most important moments deserve the most extraordinary settings.\n\nThe Mediterranean has witnessed proposals, anniversaries and quiet declarations of love — each one different, each one unforgettable.\n\nPlan your private moment. DM us.`,
    hashtags: ['RomanticSailing','ProposalBarcelona','BarcelonaProposal','LoveAtSea','PrivateCharter','CouplesSailing','RomanticEscape','MediterraneanMoments','SpecialOccasion','SailBarcelona'],
  },
  {
    post_number: 7,
    platform: 'IG',
    scheduled_date: '2026-05-26',
    headline_visual: 'CELEBRATE DIFFERENTLY — grupo amigos en cubierta riendo, overlay oscuro, texto bold',
    copy: `Birthdays are better at sea.\n\nTrade the restaurant table for an open deck, surrounded by water, sky and the people who matter most. We take care of everything — you just show up.\n\nPrivate group charters from 12 to 30 people. DM us.`,
    hashtags: ['BirthdayAtSea','CelebrationSailing','PrivateCharter','BarcelonaBirthday','GroupSailing','FriendsAtSea','BarcelonaExperiences','PartyOnBoard','MediterraneanParty','SailBarcelona'],
  },
  {
    post_number: 8,
    platform: 'IG',
    scheduled_date: '2026-05-29',
    headline_visual: 'HEN PARTY AT SEA — champagne en cubierta festiva, overlay rosado suave, texto bold',
    copy: `Because the bride deserves the best send-off — and the Mediterranean delivers.\n\nChampagne, coastline views and the people she loves most. We handle the rest.\n\nPrivate bachelorette charters available. DM us to plan the perfect celebration.`,
    hashtags: ['BacheloretteParty','HenParty','SailingBarcelona','BrideToBeBarcelona','PrivateSailing','HenDo','BarcelonaHenParty','CelebrationAtSea','GirlsTrip','SailBarcelona'],
  },
  {
    post_number: 9,
    platform: 'IG',
    scheduled_date: '2026-06-02',
    headline_visual: 'TEAM BUILDING AT SEA — skyline Barcelona desde mar, overlay azul marino, texto corporativo',
    copy: `Some ideas come to life when you step away from the office.\n\nThere's something about open water that shifts perspective — conversations flow differently, connections form naturally and the horizon has a way of clearing the mind.\n\nPrivate corporate charters available. DM us for pricing.`,
    hashtags: ['CorporateSailing','TeamBuilding','PrivateCharter','BarcelonaEvents','CorporateExperiences','TeamOuting','BarcelonaBusiness','OfficeEscape','WorkAndSail','MediterraneanTeamBuilding'],
  },
  {
    post_number: 10,
    platform: 'IG',
    scheduled_date: '2026-06-05',
    headline_visual: '13 YEARS AT SEA — velero en mar abierto vista lateral, overlay oscuro, texto heritage bold',
    copy: `Thirteen years of Mediterranean sailing. Thousands of guests. One constant: the belief that the best experiences are born on the water.\n\nWe've sailed with families, couples, friends and companies — each journey different, each one memorable.\n\nSee you on board.`,
    hashtags: ['BarcelonaSailing','TrustedByTravelers','SailingExperts','MediterraneanExperience','AuthenticExperiences','13Years','BarcelonaBoatTour','SailingLife','SeaMemories','VisitBarcelona'],
  },
  {
    post_number: 11,
    platform: 'IG',
    scheduled_date: '2026-06-09',
    headline_visual: 'SUMMER IS BOOKING FAST — velero mar azul intenso, overlay mínimo, texto urgente bold',
    copy: `The best summer plans don't happen by chance — they happen on the water.\n\nSpots are already filling for June, July and August. If you're planning a Barcelona escape, now is the time.\n\nBook your sailing experience — link in bio.`,
    hashtags: ['SummerSailing','BookNow','BarcelonaSummer','SailBarcelona','MediterraneanSummer','SummerPlans','BarcelonaTravel','SummerEscape','SailLife','TravelSpain'],
  },
  {
    post_number: 12,
    platform: 'IG',
    scheduled_date: '2026-06-12',
    headline_visual: 'GIVE THE SEA — velero al atardecer luz dorada, overlay dorado cálido, texto bold + gift CTA',
    copy: `Some gifts are forgotten by the next morning. A sailing experience in Barcelona stays with you for years.\n\nBecause experiences shape us in ways that things never can.\n\nGift vouchers available — contact us directly.`,
    hashtags: ['GiftExperience','SailingGift','BarcelonaGift','ExperienceGifts','MediterraneanExperience','GiftIdeas','TravelGift','PrivateSailing','UnforgettableGifts','BarcelonaSailing'],
  },
];

async function run() {
  console.log('📝 Insertando 12 posts de MARIA DE LOS ANGELES MATILLA CAROT (@barcelona.sail)...\n');
  let ok = 0;
  for (const p of POSTS) {
    const record = {
      id:              `${CLIENT_ID}-${p.post_number}`,
      client_id:       CLIENT_ID,
      post_number:     p.post_number,
      platform:        p.platform,
      headline_visual: p.headline_visual,
      visual_prompt:   '',
      copy:            p.copy,
      hashtags:        p.hashtags,
      status:          'review',
      feedback:        '',
      image_url:       '',
      webhook_sent_at: null,
    };
    const { error } = await sb.from('posts').upsert(record);
    if (error) console.error(`❌ Post #${p.post_number}:`, error.message);
    else {
      console.log(`✅ Post #${p.post_number} (${p.scheduled_date}) — ${p.headline_visual.slice(0,55)}...`);
      ok++;
    }
  }
  console.log(`\n🏁 ${ok}/12 posts insertados.`);
  console.log(`🔗 Ver en: https://contentflow-4wos.vercel.app`);
}

run();
