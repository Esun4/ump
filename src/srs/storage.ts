import AsyncStorage from '@react-native-async-storage/async-storage';
import { RULESET_IDS, RulesetId } from '../types';
import { ProgressMap } from './engine';

const SCHEMA_VERSION = 1;
const prefix = `ump:v${SCHEMA_VERSION}`;

const progressKey = (ruleset: RulesetId) => `${prefix}:${ruleset}:progress`;
const bookmarksKey = (ruleset: RulesetId) => `${prefix}:${ruleset}:bookmarks`;
const activeRulesetKey = `${prefix}:activeRuleset`;
// Activity is one log across all rulesets — a day you trained is a day you
// trained, whichever bank it was in.
const activityKey = `${prefix}:activity`;

// Local date key (YYYY-MM-DD) → first-attempt answers given that day.
export type ActivityLog = Record<string, number>;

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

export async function loadBookmarks(ruleset: RulesetId): Promise<Set<string>> {
  try {
    const raw = await AsyncStorage.getItem(bookmarksKey(ruleset));
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export async function saveBookmarks(
  ruleset: RulesetId,
  bookmarks: Set<string>,
): Promise<void> {
  await AsyncStorage.setItem(bookmarksKey(ruleset), JSON.stringify([...bookmarks]));
}

export async function loadActivity(): Promise<ActivityLog> {
  try {
    const raw = await AsyncStorage.getItem(activityKey);
    return raw ? (JSON.parse(raw) as ActivityLog) : {};
  } catch {
    return {};
  }
}

export async function bumpActivity(dateKey: string): Promise<void> {
  const log = await loadActivity();
  log[dateKey] = (log[dateKey] ?? 0) + 1;
  await AsyncStorage.setItem(activityKey, JSON.stringify(log));
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
