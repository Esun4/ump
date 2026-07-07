import AsyncStorage from '@react-native-async-storage/async-storage';
import { Question, RulesetId } from '../types';

// Mirrors the key scheme in src/srs/storage.ts so all persisted app data
// lives under one versioned prefix.
const SCHEMA_VERSION = 1;
const bankKey = (ruleset: RulesetId) => `ump:v${SCHEMA_VERSION}:${ruleset}:bank`;

export async function loadCachedBank(
  ruleset: RulesetId,
): Promise<Question[] | null> {
  try {
    const raw = await AsyncStorage.getItem(bankKey(ruleset));
    if (!raw) return null;
    const bank = JSON.parse(raw) as Question[];
    return Array.isArray(bank) && bank.length > 0 ? bank : null;
  } catch {
    return null;
  }
}

export async function saveCachedBank(
  ruleset: RulesetId,
  bank: Question[],
): Promise<void> {
  try {
    await AsyncStorage.setItem(bankKey(ruleset), JSON.stringify(bank));
  } catch {
    // A failed cache write only costs freshness on the next offline launch.
  }
}
