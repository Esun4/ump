-- Question reports table + row-level security for the Ump app.
-- Run this once in the Supabase SQL editor (after schema.sql).

create table if not exists public.question_reports (
  id uuid primary key default gen_random_uuid(),
  -- Deliberately not a foreign key: the app can show cached or bundled
  -- questions that no longer exist in the questions table, and those
  -- reports are still worth capturing.
  question_id text not null check (char_length(question_id) between 1 and 100),
  reason text not null check (char_length(reason) between 1 and 500),
  created_at timestamptz not null default now()
);

-- The app files reports with the anon key. Anon may only INSERT: with no
-- select policy, reports are write-only from the client — reading them
-- requires the dashboard or the authenticated admin UI (phase two).
alter table public.question_reports enable row level security;

drop policy if exists "anon can file reports" on public.question_reports;
create policy "anon can file reports"
  on public.question_reports
  for insert
  to anon
  with check (true);
