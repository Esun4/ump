import AsyncStorage from '@react-native-async-storage/async-storage';
import { Question, RulesetId } from '../types';

// Mirrors the key scheme in src/srs/storage.ts so all persisted app data
// lives under one versioned prefix.
const SCHEMA_VERSION = 1;
const bankKey = (ruleset: RulesetId) => `ump:v${SCHEMA_VERSION}:${ruleset}:bank`;

export interface CachedBank {
  questions: Question[];
  // ISO timestamp of the fetch that produced this copy; null only for caches
  // written before timestamps existed (pre-envelope format).
  fetchedAt: string | null;
}

export async function loadCachedBank(
  ruleset: RulesetId,
): Promise<CachedBank | null> {
  try {
    const raw = await AsyncStorage.getItem(bankKey(ruleset));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    // Legacy format: a bare question array, from before fetchedAt was stored.
    // Still a valid offline bank; it gains a timestamp on the next sync.
    if (Array.isArray(parsed)) {
      return parsed.length > 0
        ? { questions: parsed as Question[], fetchedAt: null }
        : null;
    }
    const envelope = parsed as CachedBank;
    if (!Array.isArray(envelope.questions) || envelope.questions.length === 0) {
      return null;
    }
    return {
      questions: envelope.questions,
      fetchedAt:
        typeof envelope.fetchedAt === 'string' ? envelope.fetchedAt : null,
    };
  } catch {
    return null;
  }
}

export async function saveCachedBank(
  ruleset: RulesetId,
  questions: Question[],
  fetchedAt: string,
): Promise<void> {
  try {
    const envelope: CachedBank = { questions, fetchedAt };
    await AsyncStorage.setItem(bankKey(ruleset), JSON.stringify(envelope));
  } catch {
    // A failed cache write only costs freshness on the next offline launch.
  }
}
