-- Roles + authenticated RLS policies for the trainer admin UI (phase two).
-- Run this once in the Supabase SQL editor (after schema.sql and reports.sql).
--
-- Role model: public signups stay DISABLED (Dashboard → Auth → Sign In /
-- Up → disable email signups after creating accounts). You create each
-- account in the dashboard, then grant it a row here. A signed-in user with
-- no user_roles row can do nothing at all.
--
--   trainer  reads all questions, creates/edits/deletes DRAFTS only,
--            reads question reports.
--   admin    everything trainers can, plus editing published rows,
--            publish/unpublish, deleting any question, clearing reports.
--
-- Grant roles (run per user after creating their account):
--   insert into public.user_roles (user_id, role)
--   select id, 'admin' from auth.users where email = 'you@example.com';
--   -- ('trainer' for trainers; role is changeable with a plain update.)

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('trainer', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;

-- The UI reads the signed-in user's own row to adapt what it shows. Only
-- you write this table, via the SQL editor — there are no write policies.
drop policy if exists "users can read own role" on public.user_roles;
create policy "users can read own role"
  on public.user_roles
  for select
  to authenticated
  using (user_id = auth.uid());

-- Security definer so policies on other tables can consult user_roles
-- without granting broad read access to it. Returns null for users with
-- no role, which fails every policy below.
create or replace function public.app_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.user_roles where user_id = auth.uid();
$$;

-- questions: staff read everything (drafts included) ---------------------

drop policy if exists "staff can read all questions" on public.questions;
create policy "staff can read all questions"
  on public.questions
  for select
  to authenticated
  using (public.app_role() in ('trainer', 'admin'));

-- questions: trainers write drafts, admin writes anything -----------------
-- Question ids are permanent (the app's SRS progress is keyed on them);
-- the admin UI never sends id changes on edit. Trainers can only touch
-- draft rows, so nothing they do can alter what the app is serving.

drop policy if exists "trainers can create drafts" on public.questions;
create policy "trainers can create drafts"
  on public.questions
  for insert
  to authenticated
  with check (
    public.app_role() = 'admin'
    or (public.app_role() = 'trainer' and status = 'draft')
  );

drop policy if exists "trainers can edit drafts" on public.questions;
create policy "trainers can edit drafts"
  on public.questions
  for update
  to authenticated
  using (
    public.app_role() = 'admin'
    or (public.app_role() = 'trainer' and status = 'draft')
  )
  with check (
    public.app_role() = 'admin'
    or (public.app_role() = 'trainer' and status = 'draft')
  );

drop policy if exists "trainers can delete drafts" on public.questions;
create policy "trainers can delete drafts"
  on public.questions
  for delete
  to authenticated
  using (
    public.app_role() = 'admin'
    or (public.app_role() = 'trainer' and status = 'draft')
  );

-- questions: keep updated_at honest ---------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists questions_set_updated_at on public.questions;
create trigger questions_set_updated_at
  before update on public.questions
  for each row
  execute function public.set_updated_at();

-- question_reports: trainers see them, only admin clears them -------------

drop policy if exists "staff can read reports" on public.question_reports;
create policy "staff can read reports"
  on public.question_reports
  for select
  to authenticated
  using (public.app_role() in ('trainer', 'admin'));

drop policy if exists "admin can clear reports" on public.question_reports;
create policy "admin can clear reports"
  on public.question_reports
  for delete
  to authenticated
  using (public.app_role() = 'admin');
