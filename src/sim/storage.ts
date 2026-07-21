import AsyncStorage from '@react-native-async-storage/async-storage';
import { todayKey } from '../srs/engine';

// The simulator keeps its own record, deliberately separate from the SRS.
// Answering a play is a different act from answering a question — it
// shouldn't move a question's review date, and its streak is its own.

const SCHEMA_VERSION = 1;
const prefix = `ump:v${SCHEMA_VERSION}:sim`;

const recordKey = `${prefix}:record`;
const activityKey = `${prefix}:activity`;

export interface ScenarioRecord {
  seen: number;
  right: number;
  // Whether the most recent attempt was correct — what "plays you've
  // missed" filters on, so a play you've since fixed drops out.
  lastRight: boolean;
}

export type SimRecord = Record<string, ScenarioRecord>;

// Local date key (YYYY-MM-DD) → plays answered that day.
export type SimActivity = Record<string, number>;

export async function loadSimRecord(): Promise<SimRecord> {
  try {
    const raw = await AsyncStorage.getItem(recordKey);
    return raw ? (JSON.parse(raw) as SimRecord) : {};
  } catch {
    return {};
  }
}

export async function recordSimAnswer(
  scenarioId: string,
  correct: boolean,
): Promise<SimRecord> {
  const record = await loadSimRecord();
  const prev = record[scenarioId] ?? { seen: 0, right: 0, lastRight: false };
  record[scenarioId] = {
    seen: prev.seen + 1,
    right: prev.right + (correct ? 1 : 0),
    lastRight: correct,
  };
  await AsyncStorage.setItem(recordKey, JSON.stringify(record));

  const log = await loadSimActivity();
  const key = todayKey();
  log[key] = (log[key] ?? 0) + 1;
  await AsyncStorage.setItem(activityKey, JSON.stringify(log));

  return record;
}

export async function loadSimActivity(): Promise<SimActivity> {
  try {
    const raw = await AsyncStorage.getItem(activityKey);
    return raw ? (JSON.parse(raw) as SimActivity) : {};
  } catch {
    return {};
  }
}

export async function resetSimRecord(): Promise<void> {
  await AsyncStorage.multiRemove([recordKey, activityKey]);
}
