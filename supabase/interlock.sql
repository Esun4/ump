-- Adds the two District Interlock rulesets to the questions table.
-- Run this once in the Supabase SQL editor (before re-running seed.sql).
--
-- The interlock banks reuse the existing 'sixty' and 'big' tiers
-- (interlock60 → sixty, interlockBig → big), so only the ruleset
-- constraint needs to widen. RLS policies are unaffected.

alter table public.questions
  drop constraint questions_ruleset_check;

alter table public.questions
  add constraint questions_ruleset_check check (
    ruleset in ('obr', 'll', 'mech60', 'mechBig', 'interlock60', 'interlockBig')
  );
