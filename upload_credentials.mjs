// upload_credentials.mjs
// Sube todas las credenciales de Instagram del Excel a Supabase ig_credentials
// Uso: $env:SUPABASE_SERVICE_KEY="..."; node upload_credentials.mjs

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY;
if (!SERVICE_KEY) { console.error('❌ Falta SUPABASE_SERVICE_KEY'); process.exit(1); }

const sb = createClient(SUPABASE_URL, SERVICE_KEY);

// Credenciales extraídas del Excel — solo IG con usuario y contraseña
const credentials = [
  { client_id: 'seifour-garraf',                          ig_username: 'seifourgarraf',               ig_password: 'SEI.FOUR4!' },
  { client_id: 'win-fitness-clubs-sl',                    ig_username: 'winfitclubs',                  ig_password: 'Surfacex10!' },
  { client_id: 'j-diaz-mantenimientos-sl',                ig_username: 'jdiaz.mantenimientos',         ig_password: 'diazmantenimientos25#' },
  { client_id: 'acaymo-delgado-higuero',                  ig_username: 'acaymocerrajeria',             ig_password: 'Higuero_Tenerife_749_04' },
  { client_id: 'aluminis-alutek-sl',                      ig_username: 'alutekaluminis',               ig_password: 'alutekaluminis2017' },
  { client_id: 'aida-camara-mancha',                      ig_username: 'metodo.y.arquitectura',        ig_password: 'CamBonArq15' },
  { client_id: 'integra-t-global-outsourcing-sl',         ig_username: 'GRUPO.INTEGRAT',               ig_password: 'Integrat123456' },
  { client_id: 'maria-cabrera-gallardo',                  ig_username: 'refugiarp_caudellops',         ig_password: 'RefugiDelArp2025!' },
  { client_id: 'editorial-alreves-sl',                    ig_username: 'alreveseditor',                ig_password: 'Alreves@2026.' },
  { client_id: 'aromed-company-sl',                       ig_username: 'aromaticcbd',                  ig_password: 'ManuelPereaVargas2022!' },
  { client_id: 'el-limonar-de-inca-sl',                   ig_username: 'limonardemallorca',            ig_password: 'Limon2025' },
  { client_id: 'gemma-vila-bibiloni',                     ig_username: 'bellesaibenestargemma',        ig_password: 'gv220712' },
  { client_id: 'live-barcelona-sl',                       ig_username: 'livebarcelonatours',           ig_password: 'Eucaliptus44' },
  { client_id: 'luxa-lerona-2017-sl',                     ig_username: 'fresh_laundry_santadria',      ig_password: 'Luxa_Lerona_925_05' },
  { client_id: 'carmen-alegre-sl',                        ig_username: 'c_alegre95@hotmail.com',       ig_password: 'Novias95#' },
  { client_id: 'garmer-style-sl',                         ig_username: 'optimmumestilistes',           ig_password: 'CommunityBrainUp2017' },
  { client_id: 'autoescuela-bartrina-sl',                 ig_username: 'autoescuelabartrina@gmail.com',ig_password: 'Bartrina@081912' },
  { client_id: 'jose-manuel-gonzalez-navarro',            ig_username: 'lupovetiberica',               ig_password: 'Lupovet_España_2025' },
  { client_id: 'auto-gucoso-sl',                          ig_username: 'AutoGucoso.Opel',              ig_password: 'K1tDigital2025*' },
  { client_id: 'hotel-sant-jordi-sa',                     ig_username: 'hotelsantjordi@hotelsantjordi.com', ig_password: 'Chevrolet12' },
  { client_id: 'rodrigo-veiga-sobral',                    ig_username: 'rodrivegas',                   ig_password: 'Danita1985' },
  { client_id: 'miguel-angel-galan-castro',               ig_username: 'aquafusion_',                  ig_password: 'michelgalan5648' },
  { client_id: 'terapias-y-tratamientos-fisicos-slp',     ig_username: 'terafis_bcn',                  ig_password: 'Terafis_790' },
  { client_id: 'marian-crespo-brands',                    ig_username: 'marian_arteterapia',           ig_password: 'MiEsencia3' },
  { client_id: 'bnefit-paief-sl',                         ig_username: 'Bnefitcenter',                 ig_password: 'M@rk3t1ngT3l3m@tik@' },
  { client_id: 'hermanos-moreno-m-sl',                    ig_username: 'bigmathnosmoreno',             ig_password: 'Interactivos25!' },
  { client_id: 'rita-heredia-bermudez',                   ig_username: 'serviciosdelimpiezarita',      ig_password: 'K1tDigital2025*' },
  { client_id: 'motel-o-castro-sl',                       ig_username: 'ocastrorestaurante',           ig_password: 'Ocastro310892' },
  { client_id: 'otedent-sl',                              ig_username: 'clinicadentalotedent',         ig_password: 'Clinica41!!' },
  { client_id: 'confex-sa',                               ig_username: 'confex_sa',                    ig_password: 'Cnfx2KXI2016' },
  { client_id: 'asesores-inmobiliarios-cf-futuro-sl',     ig_username: 'cffuturoinmobiliaria',         ig_password: 'Interactivos25!' },
  { client_id: 'david-gonzalez-medina',                   ig_username: 'bar_elporron_terrassa',        ig_password: 'Baza26' },
  { client_id: 'integral-services-marina-baixa',          ig_username: 'integralservicesmarinabaixa',  ig_password: 'ponhe3-cijhuJ-bocwur' },
  { client_id: 'silvia-sanchez-gonzalez',                 ig_username: 'mima_mascotas',                ig_password: 'minipanter1275' },
  { client_id: 'navacreus-luona-sl',                      ig_username: 'greenhopper.grass',            ig_password: 'greenhopperCW2025' },
  { client_id: 'semuliki-sl',                             ig_username: 'winter_school_empresas',       ig_password: 'Semul478&' },
  { client_id: 'avilec-valles-sl',                        ig_username: 'AVILEC.INDUSTRIAL',            ig_password: 'Interactivos26!' },
  { client_id: 'clan-rivas-sl',                           ig_username: 'h.montanaroses',               ig_password: 'Interactivos26!' },
  { client_id: 'inmobiliaria-rustica-y-urbana-santa-teresa-sl', ig_username: 'santateresa_inmobiliaria', ig_password: 'SantaTeresa5' },
  { client_id: 'monica-cornet-bellmunt',                  ig_username: 'mon.ioga',                     ig_password: 'Monica' },
  { client_id: 'instaladores-profvert-sl',                ig_username: 'adriana@interactivos.net',     ig_password: 'Ver@cc25' },
  { client_id: 'excavacions-transports-i-obra-publica-tarres-sl', ig_username: 'excavacionstarres',    ig_password: 'Histamina-1' },
  { client_id: 'guillen-associats-sl',                    ig_username: 'guiverbarcelona',              ig_password: 'camp23-25' },
  { client_id: 'albert-xavier-termens-arderiu',           ig_username: 'gruponewenergy',               ig_password: 'Gruponewenergy26#' },
  { client_id: 'joan-bigas-vidal',                        ig_username: 'cancolls@gmail.com',           ig_password: '972864363botiga' },
  { client_id: 'juan-ramon-pina-membrado',                ig_username: 'laboratoriosaverroes',         ig_password: 'Averroes2025_' },
  { client_id: 'katia-garabito-rubio',                    ig_username: 'katiagarabitoabogados',        ig_password: '637586598Kat' },
  { client_id: 'nebli-centro-de-halcones-sl',             ig_username: 'NebliCentrodeHalcones',        ig_password: 'K1tDigital2025*' },
  { client_id: 'maquinas-de-coser-a-lopez-cepero-sl',     ig_username: 'maquinasdecoserlopezcepero',   ig_password: 'Jerez2023xx.' },
  { client_id: 'servicios-integrales-de-formacion-sl',    ig_username: 'sif.servicios',                ig_password: 'plazachavian' },
  { client_id: 'mariangeles-marchese',                    ig_username: 'psicologa_en_malaga',          ig_password: 'Solreina69' },
  { client_id: 'kbio-slp',                                ig_username: 'kabio_sl',                     ig_password: 'kabio22' },
  { client_id: 'marta-bayona-mas',                        ig_username: 'nurahousebarcelona',           ig_password: 'zihjyt-toqnuX-biwxaz' },
  { client_id: 'solo-gafas-sl',                           ig_username: 'xaviergarciabarcelona',        ig_password: '0535sXG-Instagram' },
  { client_id: 'totclinic-slu',                           ig_username: 'totclinic',                    ig_password: 'T0tClin1c2025' },
  { client_id: 'gregorio-jerez-ballesteros-sl',           ig_username: 'lespedreres_bdb',              ig_password: 'Gregorio98' },
  { client_id: 'madeiras-do-xallas-sl',                   ig_username: 'madeirasdoxallasgal',          ig_password: 'K!tdigital2025*' },
  { client_id: 'maria-de-los-angeles-matilla-carot',      ig_username: 'barcelona.sail',               ig_password: 'Barcelonasafa!' },
  { client_id: 'xarxa-realty-2021-sl',                    ig_username: 'century21_xarxa',              ig_password: 'Xarxa2021C21#' },
  { client_id: 'christian-alessandria',                   ig_username: '655700769',                    ig_password: 'CHfA2366934-8' },
  { client_id: 'sergio-rodriguez-cortazar',               ig_username: 'indigodjschool',               ig_password: 'KitDigit@l' },
  { client_id: 'indisi-group-sl',                         ig_username: 'Kensington.maresme',           ig_password: 'indisigroup2023' },
  { client_id: 'pesgalia-slu',                            ig_username: 'pesgaliasl',                   ig_password: 'K!tdigital2025*' },
  { client_id: 'bacardi-textil-sl',                       ig_username: 'info@bacarditextil.com',       ig_password: 'bacardi@24' },
  { client_id: 'tienda-oficit-sl',                        ig_username: 'comercial@oficit.es',          ig_password: 'Insta#oficit25' },
  { client_id: 'crespi-oliver-assessors-sl',              ig_username: 'crespioliverassessors',        ig_password: 'Interactivos25!' },
  { client_id: 'creati-rr-sl',                            ig_username: 'rotuwear',                     ig_password: 'Jerez2025xx.' },
  { client_id: 'centro-de-especialidades-medicas-famed-sl', ig_username: 'clinicasfamed_',             ig_password: '' },  // sin contraseña
];

const now = new Date().toISOString();
let ok = 0, skip = 0, err = 0;

for (const cred of credentials) {
  if (!cred.ig_password) { console.log(`⏭️  SKIP (sin contraseña): ${cred.client_id}`); skip++; continue; }

  const { error } = await sb.from('ig_credentials').upsert({
    client_id:   cred.client_id,
    ig_username: cred.ig_username,
    ig_password: cred.ig_password,
    updated_at:  now,
  });

  if (error) {
    console.error(`❌ ERROR ${cred.client_id}: ${error.message}`);
    err++;
  } else {
    console.log(`✅ ${cred.client_id} → @${cred.ig_username}`);
    ok++;
  }
}

console.log(`\n📊 Resultado: ${ok} subidas, ${skip} sin contraseña, ${err} errores`);
