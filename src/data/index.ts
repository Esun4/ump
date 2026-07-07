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

// One resolution per ruleset per app session: screens can all await getBank
// without racing duplicate fetches, and a session sees a consistent bank.
const memo: Partial<Record<RulesetId, Promise<BankInfo>>> = {};

async function loadBank(ruleset: RulesetId): Promise<BankInfo> {
  if (remoteEnabled) {
    try {
      const questions = await fetchRemoteBank(ruleset);
      const fetchedAt = new Date().toISOString();
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
