// upload_sociales.mjs
// Sube todos los sociales.txt de ../Clientes/*/sociales.txt a Supabase Storage
// Ejecutar: node upload_sociales.mjs

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL        = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ Falta SUPABASE_SERVICE_KEY. Ejecútalo así:');
  console.error('   $env:SUPABASE_SERVICE_KEY="tu_service_role_key" ; node upload_sociales.mjs');
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Mapa: nombre de carpeta → client_id
const FOLDER_TO_ID = {
  'CREATI RR SL':                                        'creati-rr-sl',
  'CRESPI-OLIVER ASSESSORS SL':                          'crespi-oliver-assessors-sl',
  'ENTELSAT INSTALACIONES Y PROMOCIONES INTEGRALES SLU': 'entelsat-instalaciones-y-promociones-integrales-slu',
  'GREGORIO JEREZ BALLESTEROS SL':                       'gregorio-jerez-ballesteros-sl',
  'HAPPY CLINICA':                                       'happy-clinica',
  'HUGO SAIZ SALAMANCA':                                 'hugo-saiz-salamanca',
  'JAVIER MANRIQUE DE LARA':                             'javier-manrique-de-lara',
  'JOSÉ LUIS BURRIEL JARQUE':                            'jose-luis-burriel-jarque',
  'KBIO SLP':                                            'kbio-slp',
  'NATALIA GOMÁ ARGILAGA':                               'natalia-goma-argilaga',
  'TERAPIAS Y TRATAMIENTOS FÍSICOS SLP':                 'terapias-y-tratamientos-fisicos-slp',
  'TIENDA OFICIT SL':                                    'tienda-oficit-sl',
  'TOTCLINIC S.L.U':                                     'totclinic-slu',
};

const CLIENTES_DIR = join(__dirname, '..', 'Clientes');

async function main() {
  // Crear bucket si no existe
  const { error: bucketErr } = await sb.storage.createBucket('sociales', { public: false });
  if (bucketErr && !bucketErr.message.includes('already exists')) {
    console.error('Error creando bucket:', bucketErr.message);
  }

  let ok = 0, fail = 0;

  for (const [folder, clientId] of Object.entries(FOLDER_TO_ID)) {
    const filePath = join(CLIENTES_DIR, folder, 'sociales.txt');
    if (!existsSync(filePath)) {
      console.log(`⚠️  No encontrado: ${folder}/sociales.txt`);
      fail++;
      continue;
    }

    const content = readFileSync(filePath);
    const { error } = await sb.storage
      .from('sociales')
      .upload(`${clientId}.txt`, content, {
        contentType: 'text/plain; charset=utf-8',
        upsert: true,
      });

    if (error) {
      console.error(`❌ ${clientId}: ${error.message}`);
      fail++;
    } else {
      console.log(`✓ ${clientId}`);
      ok++;
    }
  }

  console.log(`\n✅ Subidos: ${ok} | ❌ Fallidos: ${fail}`);
}

main();
