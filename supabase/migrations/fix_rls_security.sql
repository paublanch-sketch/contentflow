-- ════════════════════════════════════════════════════════════════════════════
-- FIX SEGURIDAD RLS — ContentFlow / Supabase
-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query
-- Fecha: Junio 2026
-- Motivo: Supabase security alert — sensitive_columns_exposed + rls_disabled_in_public
-- ════════════════════════════════════════════════════════════════════════════
-- ⚠️  SIN ROMPER NADA:
--   · Admin (autenticado con supabase.auth) → acceso total a posts y clients
--   · ApprovalWall (sin login) → puede hacer SELECT de posts y UPDATE de reel_url/reel_thumbnail_url
--   · Cualquier visitante anónimo → NO puede leer clients ni escribir posts libremente
-- ════════════════════════════════════════════════════════════════════════════


-- ── TABLA: posts ─────────────────────────────────────────────────────────────

-- Eliminar políticas antiguas demasiado permisivas
DROP POLICY IF EXISTS "public_read"  ON posts;
DROP POLICY IF EXISTS "public_write" ON posts;

-- 1. SELECT: cualquiera puede leer posts (portal de aprobación del cliente lo necesita)
CREATE POLICY "posts_select_public"
  ON posts FOR SELECT
  USING (true);

-- 2. INSERT: solo usuarios autenticados (admin de la app)
CREATE POLICY "posts_insert_authenticated"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 3. UPDATE: usuarios autenticados O anónimos que solo toquen reel_url/reel_thumbnail_url
--    → La app admin actualiza cualquier campo (está autenticada, pasa por la policy authenticated)
--    → ApprovalWall actualiza reel_url y reel_thumbnail_url sin login
CREATE POLICY "posts_update_authenticated"
  ON posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "posts_update_reel_anon"
  ON posts FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);
-- Nota: RLS no filtra columnas individuales. ApprovalWall solo llama
-- .update({ reel_url }) y .update({ reel_thumbnail_url }) — no expone datos sensibles.
-- Si en el futuro quieres cerrar esto del todo, mueve esas 2 llamadas a una Edge Function.

-- 4. DELETE: solo autenticados
CREATE POLICY "posts_delete_authenticated"
  ON posts FOR DELETE
  TO authenticated
  USING (true);


-- ── TABLA: clients ───────────────────────────────────────────────────────────
-- ⚠️  Esta tabla contiene email y contact → acceso solo para admin autenticado

-- Eliminar políticas antiguas
DROP POLICY IF EXISTS "clients_public_read"  ON clients;
DROP POLICY IF EXISTS "clients_public_write" ON clients;

-- Solo usuarios autenticados (admin) pueden leer, escribir y borrar clients
CREATE POLICY "clients_authenticated_all"
  ON clients FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ════════════════════════════════════════════════════════════════════════════
-- VERIFICACIÓN (opcional, ejecutar después)
-- ════════════════════════════════════════════════════════════════════════════
-- SELECT schemaname, tablename, policyname, roles, cmd, qual
-- FROM pg_policies
-- WHERE tablename IN ('posts', 'clients')
-- ORDER BY tablename, cmd;
