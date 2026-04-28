-- Tabla para tokens de Instagram Business por cliente
-- Ejecuta esto en Supabase SQL Editor

create table if not exists ig_tokens (
  client_id    text primary key,
  ig_user_id   text not null,
  ig_username  text,
  access_token text not null,
  expires_at   timestamptz,
  updated_at   timestamptz default now()
);

-- Solo admins pueden ver/editar tokens
alter table ig_tokens enable row level security;

create policy "Solo service_role puede gestionar tokens"
  on ig_tokens for all
  using (false)       -- ningún usuario anónimo
  with check (false); -- solo service_role desde Edge Functions
