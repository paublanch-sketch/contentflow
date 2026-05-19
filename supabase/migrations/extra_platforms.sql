-- ════════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN: Añadir columna extra_platforms a la tabla clients
-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query
-- ════════════════════════════════════════════════════════════════════════════
-- Esta columna guarda las redes sociales extra de cada cliente (IG2, LI, FB...)
-- más allá de la plataforma principal, para que sean visibles en todos los navegadores.

ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS extra_platforms TEXT[] DEFAULT '{}';

-- Verificar resultado:
-- SELECT id, name, platform, extra_platforms FROM clients LIMIT 10;
