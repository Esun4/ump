// Files a question report to Supabase. RLS makes question_reports write-only
// for the anon key, so this is strictly fire-and-forget: the app can never
// read reports back. Returns whether the insert succeeded so the UI can
// acknowledge honestly, but never rejects.

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const reportsEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const SUBMIT_TIMEOUT_MS = 5000;

export async function submitReport(
  questionId: string,
  reason: string,
): Promise<boolean> {
  if (!reportsEnabled) return false;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/question_reports`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        // Anon has no select policy on this table, so asking PostgREST to
        // return the inserted row would fail the whole request.
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ question_id: questionId, reason }),
      signal: controller.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
