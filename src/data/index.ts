import { Question, RulesetId } from '../types';
import { getBundledBank } from './bundled';
import { fetchRemoteBank, remoteEnabled } from './remote';
import { loadCachedBank, saveCachedBank } from './cache';

export type BankSource = 'server' | 'cached' | 'bundled';

export interface BankInfo {
  questions: Question[];
  source: BankSource;
  // Time of the last successful server sync that produced these questions;
  // null when running on the bundled bank (or a pre-timestamp cache).
  fetchedAt: string | null;
}

// One resolution per ruleset at a time: screens can all await getBank
// without racing duplicate fetches. Foreground refreshes may replace an
// entry with a newer server copy; a quiz in progress is unaffected because
// it snapshots its queue when it starts.
const memo: Partial<Record<RulesetId, Promise<BankInfo>>> = {};

// Debounces foreground refreshes; seeded by the initial load so returning
// to the app seconds after launch doesn't refetch banks that are brand new.
const REFRESH_MIN_INTERVAL_MS = 60_000;
let lastServerSyncAt = 0;

async function loadBank(ruleset: RulesetId): Promise<BankInfo> {
  if (remoteEnabled) {
    try {
      const questions = await fetchRemoteBank(ruleset);
      const fetchedAt = new Date().toISOString();
      lastServerSyncAt = Date.now();
      void saveCachedBank(ruleset, questions, fetchedAt);
      return { questions, source: 'server', fetchedAt };
    } catch {
      const cached = await loadCachedBank(ruleset);
      if (cached) {
        return {
          questions: cached.questions,
          source: 'cached',
          fetchedAt: cached.fetchedAt,
        };
      }
    }
  }
  return { questions: getBundledBank(ruleset), source: 'bundled', fetchedAt: null };
}

// Preference order: live Supabase bank → last successfully fetched copy →
// the banks compiled into the app. Never rejects.
export function getBankInfo(ruleset: RulesetId): Promise<BankInfo> {
  const pending = memo[ruleset] ?? loadBank(ruleset);
  memo[ruleset] = pending;
  return pending;
}

export function getBank(ruleset: RulesetId): Promise<Question[]> {
  return getBankInfo(ruleset).then((info) => info.questions);
}

async function refreshOne(ruleset: RulesetId): Promise<void> {
  try {
    const questions = await fetchRemoteBank(ruleset);
    const fetchedAt = new Date().toISOString();
    lastServerSyncAt = Date.now();
    void saveCachedBank(ruleset, questions, fetchedAt);
    memo[ruleset] = Promise.resolve({ questions, source: 'server', fetchedAt });
  } catch {
    // The session keeps the bank it already resolved — a failed refresh
    // must never downgrade server data to cached/bundled.
  }
}

/**
 * Re-fetches banks when the app returns to the foreground. Only rulesets the
 * session has already resolved are refreshed (untouched ones fetch fresh on
 * first use anyway), at most once per REFRESH_MIN_INTERVAL_MS so flipping
 * between apps doesn't hammer the network. Never rejects.
 */
export async function refreshBanks(now: number = Date.now()): Promise<void> {
  if (!remoteEnabled) return;
  if (now - lastServerSyncAt < REFRESH_MIN_INTERVAL_MS) return;
  lastServerSyncAt = now;
  const resolved = Object.keys(memo) as RulesetId[];
  await Promise.all(resolved.map(refreshOne));
}
