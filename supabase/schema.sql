-- Questions table + row-level security for the Ump app.
-- Run this once in the Supabase SQL editor (before seed.sql).

create table if not exists public.questions (
  id text primary key,
  ruleset text not null check (ruleset in ('obr', 'll', 'mech60', 'mechBig')),
  topic text not null,
  tier text not null check (
    tier in ('district', 'provincial', 'majors', 'intermediate', 'sixty', 'big')
  ),
  scenario text not null,
  options jsonb not null check (jsonb_typeof(options) = 'array'),
  correct_index integer not null check (correct_index >= 0),
  explanation text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists questions_ruleset_status_idx
  on public.questions (ruleset, status);

-- The app reads with the anon key; RLS guarantees drafts are never visible
-- to it regardless of what the client asks for. Writes stay locked down
-- until the admin UI (phase two) adds authenticated policies.
alter table public.questions enable row level security;

drop policy if exists "anon can read published questions" on public.questions;
create policy "anon can read published questions"
  on public.questions
  for select
  to anon
  using (status = 'published');
