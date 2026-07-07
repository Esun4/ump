// Mirrors the ruleset/tier vocabulary in the mobile app (src/types.ts).
// Duplicated on purpose: the two apps ship separately, and the database
// check constraints in supabase/schema.sql are the real source of truth.

export type RulesetId = 'obr' | 'll' | 'mech60' | 'mechBig';
export type Tier =
  | 'district'
  | 'provincial'
  | 'majors'
  | 'intermediate'
  | 'sixty'
  | 'big';
export type QuestionStatus = 'draft' | 'published';

export const RULESET_IDS: RulesetId[] = ['obr', 'll', 'mech60', 'mechBig'];

export const RULESET_LABELS: Record<RulesetId, string> = {
  obr: 'Baseball Canada / OBR',
  ll: 'Little League',
  mech60: '4-Ump Mechanics · 60 ft',
  mechBig: '4-Ump Mechanics · 50/70+',
};

// Which tiers are valid for each ruleset — the create/edit form enforces
// this before the database ever sees the row.
export const RULESET_TIERS: Record<RulesetId, Tier[]> = {
  obr: ['district', 'provincial'],
  ll: ['majors', 'intermediate'],
  mech60: ['sixty'],
  mechBig: ['big'],
};

export const TIER_LABELS: Record<Tier, string> = {
  district: 'District',
  provincial: 'Provincial',
  majors: 'Majors',
  intermediate: 'Intermediate+',
  sixty: '60-ft Diamond',
  big: '50/70 & 90-ft',
};

// Row shape of public.questions as the admin UI reads/writes it.
export interface QuestionRow {
  id: string;
  ruleset: RulesetId;
  topic: string;
  tier: Tier;
  scenario: string;
  options: string[];
  correct_index: number;
  explanation: string;
  status: QuestionStatus;
  created_at: string;
  updated_at: string;
}

export interface ReportRow {
  id: string;
  question_id: string;
  reason: string;
  created_at: string;
}

export type Role = 'trainer' | 'admin';
