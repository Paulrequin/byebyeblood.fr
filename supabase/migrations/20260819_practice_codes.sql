-- Codes d'accès invité pour la page de pratique post-programme (/pratique).
-- Pas de compte requis : un proche ou thérapeute transmet un code à quelqu'un
-- qui n'a pas de compte du tout. La table reste privée (RLS activée, aucune
-- policy anon) pour que la liste des codes ne soit jamais listable par le
-- client public ; seule la fonction check_practice_code (SECURITY DEFINER)
-- est exposée en anonyme, et ne répond qu'à "ce code précis est-il valide ?".

create table if not exists practice_codes (
  code       text primary key,
  label      text,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

alter table practice_codes enable row level security;
-- Aucune policy anon/authenticated : accès direct à la table refusé à tous
-- sauf au rôle postgres/service_role (Supabase Studio, migrations).

create or replace function check_practice_code(p_code text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from practice_codes
    where code = p_code and active = true
  );
$$;

grant execute on function check_practice_code(text) to anon;
grant execute on function check_practice_code(text) to authenticated;

-- Pour ajouter/désactiver un code, exécuter directement dans le SQL editor
-- de Supabase Studio, par exemple :
--   insert into practice_codes (code, label) values ('SOLEIL2026', 'Groupe de parole avril');
--   update practice_codes set active = false where code = 'SOLEIL2026';
