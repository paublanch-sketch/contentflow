-- ════════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN: Tabla clients + extra_platforms
-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query
-- ⚠️  EJECUTAR ESTE ARCHIVO ANTES QUE NADA — sin esta tabla los clientes
--     creados desde la app solo se guardan en localStorage y no son visibles
--     en otros navegadores.
-- ════════════════════════════════════════════════════════════════════════════

-- ── 1. Tabla de clientes ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clients (
  id              TEXT        PRIMARY KEY,
  name            TEXT        NOT NULL,
  platform        TEXT        NOT NULL DEFAULT 'IG',
  estado          TEXT        NOT NULL DEFAULT '-',
  stage           TEXT        NOT NULL DEFAULT '-',
  tecnico         TEXT        NOT NULL DEFAULT '-',
  contact         TEXT        NOT NULL DEFAULT '-',
  email           TEXT        NOT NULL DEFAULT '-',
  profile_url     TEXT        NOT NULL DEFAULT '-',
  folder          TEXT        NOT NULL DEFAULT '-',
  notes           TEXT        NOT NULL DEFAULT '-',
  extra_platforms TEXT[]               DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. RLS — lectura y escritura pública (igual que posts) ──────────────────
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "clients_public_read" ON clients
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "clients_public_write" ON clients
  FOR ALL USING (true) WITH CHECK (true);

-- ── 3. Trigger updated_at automático ────────────────────────────────────────
-- (reutiliza la función creada para posts si ya existe)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS clients_updated_at ON clients;
CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── 4. Columna extra_platforms (por si la tabla ya existía sin ella) ─────────
ALTER TABLE clients ADD COLUMN IF NOT EXISTS extra_platforms TEXT[] DEFAULT '{}';

-- ── Verificar resultado ───────────────────────────────────────────────────────
-- SELECT id, name, platform, extra_platforms FROM clients ORDER BY created_at DESC LIMIT 20;
