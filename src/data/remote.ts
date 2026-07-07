import { Question, RulesetId, Tier } from '../types';

// Supabase connection. Both values are safe to embed in the client: the anon
// key can only read rows that row-level security exposes (published questions).
// When they are unset the app runs fully offline on the bundled banks.
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const remoteEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const FETCH_TIMEOUT_MS = 5000;

const TIERS: Tier[] = [
  'district',
  'provincial',
  'majors',
  'intermediate',
  'sixty',
  'big',
];

interface QuestionRow {
  id: string;
  ruleset: string;
  topic: string;
  tier: string;
  scenario: string;
  options: unknown;
  correct_index: number;
  explanation: string;
}

// A malformed row (bad edit in the database) is dropped rather than allowed
// to crash the quiz; the rest of the bank still loads.
function toQuestion(row: QuestionRow, ruleset: RulesetId): Question | null {
  const { id, topic, tier, scenario, options, correct_index, explanation } = row;
  const strings = [id, topic, tier, scenario, explanation];
  if (strings.some((s) => typeof s !== 'string' || s.length === 0)) return null;
  if (row.ruleset !== ruleset) return null;
  if (!TIERS.includes(tier as Tier)) return null;
  if (
    !Array.isArray(options) ||
    options.length < 2 ||
    options.some((o) => typeof o !== 'string' || o.length === 0)
  ) {
    return null;
  }
  if (
    !Number.isInteger(correct_index) ||
    correct_index < 0 ||
    correct_index >= options.length
  ) {
    return null;
  }
  return {
    id,
    ruleset,
    topic,
    tier: tier as Tier,
    scenario,
    options: options as string[],
    correctIndex: correct_index,
    explanation,
  };
}

// Fetches the published bank for a ruleset from Supabase. Throws on any
// failure (offline, timeout, bad payload, empty bank) so the caller can fall
// back to the cached or bundled bank.
export async function fetchRemoteBank(ruleset: RulesetId): Promise<Question[]> {
  if (!remoteEnabled) throw new Error('Remote bank not configured');

  const params = [
    `ruleset=eq.${ruleset}`,
    'select=id,ruleset,topic,tier,scenario,options,correct_index,explanation',
    'order=id.asc',
  ].join('&');
  const url = `${SUPABASE_URL}/rest/v1/questions?${params}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Remote bank fetch failed: HTTP ${response.status}`);
    }
    const rows = (await response.json()) as QuestionRow[];
    if (!Array.isArray(rows)) throw new Error('Remote bank payload not an array');

    const questions = rows
      .map((row) => toQuestion(row, ruleset))
      .filter((q): q is Question => q !== null);
    // An empty bank means a misconfigured table, not "no questions" — the
    // bundled bank is always a better answer than a blank quiz.
    if (questions.length === 0) throw new Error('Remote bank empty or invalid');
    return questions;
  } finally {
    clearTimeout(timer);
  }
}
