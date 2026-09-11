-- YardFame pre-launch signups: waitlist and creator interest.
-- Run via `supabase db push` or the Supabase SQL editor.

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null unique,
  role text not null check (
    role in ('Creator', 'Supporter / Fan', 'Creator Manager', 'Family Member', 'Potential Partner', 'Media', 'Other')
  ),
  message text
);

create table if not exists public.creator_interest (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null unique,
  stage text not null check (
    stage in ('Fed Baby', 'State Baby', 'Coming Home', 'Touched Down', 'Free World', 'Manager / Family Applying for Creator')
  ),
  alias text,
  managed_by text,
  background text,
  content_type text,
  social_links text
);

alter table public.waitlist_signups enable row level security;
alter table public.creator_interest enable row level security;

-- Inserts happen server-side only via the service role key, which bypasses
-- RLS. No public insert/select policies are defined, so anon/authenticated
-- clients have no direct access to these tables.
