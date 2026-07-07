import { Question, RulesetId } from '../types';
import { getBundledBank } from './bundled';
import { fetchRemoteBank, remoteEnabled } from './remote';
import { loadCachedBank, saveCachedBank } from './cache';

// One resolution per ruleset per app session: screens can all await getBank
// without racing duplicate fetches, and a session sees a consistent bank.
const memo: Partial<Record<RulesetId, Promise<Question[]>>> = {};

async function loadBank(ruleset: RulesetId): Promise<Question[]> {
  if (remoteEnabled) {
    try {
      const bank = await fetchRemoteBank(ruleset);
      void saveCachedBank(ruleset, bank);
      return bank;
    } catch {
      const cached = await loadCachedBank(ruleset);
      if (cached) return cached;
    }
  }
  return getBundledBank(ruleset);
}

// Preference order: live Supabase bank → last successfully fetched copy →
// the banks compiled into the app. Never rejects.
export function getBank(ruleset: RulesetId): Promise<Question[]> {
  const pending = memo[ruleset] ?? loadBank(ruleset);
  memo[ruleset] = pending;
  return pending;
}
