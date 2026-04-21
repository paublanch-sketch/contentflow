-- ════════════════════════════════════════════════════════════════════════════
-- ContentFlow — Supabase Schema
-- Kit Digital Fase J2 · Pau Blanch Mercader / Akira Computer
-- ════════════════════════════════════════════════════════════════════════════
-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query

-- ── 1. Tabla de posts ────────────────────────────────────────────────────────
-- Nota: NO hay tabla de clientes en Supabase. La lista de clientes viene de
-- src/clients.json (generado por generate_clients_json.py). Solo los posts
-- viven en la base de datos.

CREATE TABLE IF NOT EXISTS posts (
  id               TEXT        PRIMARY KEY,       -- e.g. "entelsat-instalaciones-1"
  client_id        TEXT        NOT NULL,           -- e.g. "entelsat-instalaciones"
  post_number      INT         NOT NULL,           -- 1..12
  platform         TEXT        NOT NULL DEFAULT 'IG', -- 'IG' | 'LI'
  headline_visual  TEXT        NOT NULL DEFAULT '',
  visual_prompt    TEXT        NOT NULL DEFAULT '',
  copy             TEXT        NOT NULL DEFAULT '',
  hashtags         TEXT[]      NOT NULL DEFAULT '{}',
  status           TEXT        NOT NULL DEFAULT 'review',
  -- status values: review | approved | changes | scheduling | scheduled
  feedback         TEXT        NOT NULL DEFAULT '',
  image_url        TEXT        NOT NULL DEFAULT '',
  webhook_sent_at  TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice para consultas por cliente (el más frecuente)
CREATE INDEX IF NOT EXISTS idx_posts_client_id
  ON posts (client_id, post_number);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS posts_updated_at ON posts;
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── 2. Row Level Security (RLS) ──────────────────────────────────────────────
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede leer (para el portal de aprobación del cliente)
CREATE POLICY "public_read" ON posts
  FOR SELECT USING (true);

-- Solo la clave anon/service puede escribir (tu app React usa la anon key)
CREATE POLICY "public_write" ON posts
  FOR ALL USING (true) WITH CHECK (true);

-- ── 3. Storage bucket para imágenes ─────────────────────────────────────────
-- Ejecutar en: Supabase Dashboard → Storage → New Bucket
-- Nombre: post-images | Public: YES
-- O via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

-- ── 4. Seed inicial — Posts de Entelsat (migración desde INITIAL_DATA) ───────
-- Ejecutar solo una vez para migrar los posts existentes de la app antigua.
-- client_id debe coincidir con el id en clients.json

INSERT INTO posts (id, client_id, post_number, platform, headline_visual, visual_prompt, copy, hashtags, status)
VALUES
  ('entelsat-instalaciones-y-promociones-integrales-slu-1',  'entelsat-instalaciones-y-promociones-integrales-slu', 1,  'IG', 'Infraestructura de Red',   'Professional server rack, blue and black ethernet cables perfectly organized, cinematic lighting, corporate tech style.',                                'El orden es la base de una infraestructura eficiente. Un rack saneado mejora la ventilación y reduce incidencias técnicas. 🌀🔧',                                                               ARRAY['#Entelsat','#Telecomunicaciones','#Mantenimiento'], 'review'),
  ('entelsat-instalaciones-y-promociones-integrales-slu-2',  'entelsat-instalaciones-y-promociones-integrales-slu', 2,  'IG', 'WiFi Hotelero',             'Modern luxury hotel building at night, glowing digital WiFi signal waves covering all floors, 3d isometric illustration.',                              'Instalamos redes profesionales con cobertura total en cada habitación. Garantiza una conexión segura para tus huéspedes. 🏨📶',                                                                ARRAY['#SmartHotel','#WiFiHotelero','#CostaDelSol'], 'review'),
  ('entelsat-instalaciones-y-promociones-integrales-slu-3',  'entelsat-instalaciones-y-promociones-integrales-slu', 3,  'IG', 'Placas solares',             'Aerial drone shot of solar panels on a modern house roof, bright sunny day in Malaga, high contrast.',                                                  '¿Sabías que una comunidad puede ahorrar hasta un 60% en luz? La energía solar es una inversión rentable desde el primer día. ☀️🔋',                                                           ARRAY['#EnergiaSolar','#Ahorro','#Sostenibilidad'], 'review'),
  ('entelsat-instalaciones-y-promociones-integrales-slu-4',  'entelsat-instalaciones-y-promociones-integrales-slu', 4,  'IG', 'Técnico SatFrio',            'Professional HVAC technician installing a white air conditioning split unit, specialized tools, natural morning light.',                               '35 años de experiencia nos avalan. En SatFrio llevamos el confort a tu hogar con instalaciones certificadas. 🌬️🏠',                                                                           ARRAY['#SatFrio','#Climatizacion','#ConfortHogar'], 'review'),
  ('entelsat-instalaciones-y-promociones-integrales-slu-5',  'entelsat-instalaciones-y-promociones-integrales-slu', 5,  'IG', 'App Cámaras',                'Close up of a hand holding a smartphone showing a CCTV security camera app interface, blurred office background.',                                       'Seguridad inteligente para tu negocio. Controla tus sistemas de CCTV desde cualquier lugar del mundo a través de tu móvil. 🚗🔒',                                                              ARRAY['#Seguridad','#CCTV','#SmartBusiness'], 'review'),
  ('entelsat-instalaciones-y-promociones-integrales-slu-6',  'entelsat-instalaciones-y-promociones-integrales-slu', 6,  'IG', 'Gráfico Inverter',           'Clean infographic design comparing power consumption: Inverter motor vs Traditional motor, energy savings charts.',                                      'Ahorra hasta un 40% de luz con tecnología Inverter. Más eficiencia, menos ruido y mayor vida útil para tu equipo. 📉💡',                                                                       ARRAY['#AhorroEnergetico','#Inverter','#SatFrio'], 'review'),
  ('entelsat-instalaciones-y-promociones-integrales-slu-7',  'entelsat-instalaciones-y-promociones-integrales-slu', 7,  'IG', 'Atardecer Costa Sol',        'Cinematic sunset at Marbella beach, luxury hotel silhouette in the background, warm golden hour lighting.',                                              'Partner tecnológico estratégico de los principales hoteles de la Costa del Sol. Tecnología ICT2 que inspira confianza. 🌊🏨',                                                                   ARRAY['#CostaDelSol','#HotelesMalaga','#Entelsat'], 'review'),
  ('entelsat-instalaciones-y-promociones-integrales-slu-8',  'entelsat-instalaciones-y-promociones-integrales-slu', 8,  'IG', 'Filtros Aire',               'Split screen comparison: macro of a dirty dusty air conditioner filter vs a brand new clean white filter.',                                              '¿Mal olor al encender el aire? Un mantenimiento preventivo mejora la calidad del aire y optimiza el consumo. 🛠️✨',                                                                            ARRAY['#AireLimpio','#Salud','#Mantenimiento'], 'review'),
  ('entelsat-instalaciones-y-promociones-integrales-slu-9',  'entelsat-instalaciones-y-promociones-integrales-slu', 9,  'IG', 'Cables Peinados',            'Macro shot of colorful Ethernet patch cables organized in a server rack, perfect symmetry, professional IT setup.',                                      'Transformamos el caos en conectividad. Una red bien estructurada es sinónimo de velocidad y seguridad. 🚀🔌',                                                                                  ARRAY['#Redes','#InfraestructuraIT','#Entelsat'], 'review'),
  ('entelsat-instalaciones-y-promociones-integrales-slu-10', 'entelsat-instalaciones-y-promociones-integrales-slu', 10, 'IG', 'Termostato 24°',             'Minimalist smart thermostat on a grey wall showing 24 degrees celsius, soft shadows, modern interior.',                                                 'El confort ideal está entre 24°C y 26°C. Un uso responsable te permite disfrutar del verano sin sorpresas. 🌡️✅',                                                                             ARRAY['#ConsumoResponsable','#Confort','#SatFrio'], 'review'),
  ('entelsat-instalaciones-y-promociones-integrales-slu-11', 'entelsat-instalaciones-y-promociones-integrales-slu', 11, 'IG', 'Furgoneta Málaga',           'White commercial van with corporate branding driving through a sunny Malaga street with palm trees.',                                                     'Equipo técnico profesional siempre cerca de ti en toda la provincia de Málaga. Soluciones rápidas y eficaces. 🚐💨',                                                                           ARRAY['#Malaga','#ServicioTecnico','#Cercania'], 'review'),
  ('entelsat-instalaciones-y-promociones-integrales-slu-12', 'entelsat-instalaciones-y-promociones-integrales-slu', 12, 'IG', '35 Aniversario',             'Elegant corporate celebration background, number 35 in 3D gold, dark blue silk texture, particles of light.',                                            '35 años conectando tecnología y confianza. Gracias por dejarnos formar parte de vuestros proyectos. 🥂🏆',                                                                                     ARRAY['#Aniversario','#Trayectoria','#Entelsat'], 'review')
ON CONFLICT (id) DO NOTHING;

-- ════════════════════════════════════════════════════════════════════════════
-- FORMATO SQL PARA NUEVOS CLIENTES (plantilla)
-- ════════════════════════════════════════════════════════════════════════════
-- Cuando Claude genere posts para un cliente nuevo, usará este patrón:
--
-- INSERT INTO posts (id, client_id, post_number, platform, headline_visual, visual_prompt, copy, hashtags, status)
-- VALUES
--   ('{slug}-1', '{slug}', 1, 'IG', '{headline}', '{prompt}', '{copy}', ARRAY['{h1}','{h2}'], 'review'),
--   ...
--   ('{slug}-12', '{slug}', 12, ...)
-- ON CONFLICT (id) DO NOTHING;
--
-- Donde {slug} = el id del cliente en clients.json
-- ════════════════════════════════════════════════════════════════════════════
