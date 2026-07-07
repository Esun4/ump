import AsyncStorage from '@react-native-async-storage/async-storage';
import { RULESET_IDS, RulesetId } from '../types';
import { ProgressMap } from './engine';

const SCHEMA_VERSION = 1;
const prefix = `ump:v${SCHEMA_VERSION}`;

const progressKey = (ruleset: RulesetId) => `${prefix}:${ruleset}:progress`;
const activeRulesetKey = `${prefix}:activeRuleset`;

export async function loadProgress(ruleset: RulesetId): Promise<ProgressMap> {
  try {
    const raw = await AsyncStorage.getItem(progressKey(ruleset));
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

export async function saveProgress(
  ruleset: RulesetId,
  progress: ProgressMap,
): Promise<void> {
  await AsyncStorage.setItem(progressKey(ruleset), JSON.stringify(progress));
}

export async function resetProgress(ruleset: RulesetId): Promise<void> {
  await AsyncStorage.removeItem(progressKey(ruleset));
}

export async function loadActiveRuleset(): Promise<RulesetId> {
  try {
    const raw = await AsyncStorage.getItem(activeRulesetKey);
    return RULESET_IDS.includes(raw as RulesetId) ? (raw as RulesetId) : 'obr';
  } catch {
    return 'obr';
  }
}

export async function saveActiveRuleset(ruleset: RulesetId): Promise<void> {
  await AsyncStorage.setItem(activeRulesetKey, ruleset);
}
