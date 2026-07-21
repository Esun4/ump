import { SIM_SCENARIOS, scenariosForCrew } from './scenarios60';
import { SimCrew, SimScenario } from './types';
import { SimRecord } from './storage';

// Derived views over the scenario bank — what Home, the Field tab and the
// missed-plays run all read from.

export interface GroupStats {
  group: string;
  scenarios: SimScenario[];
  seen: number;
  right: number;
}

/**
 * The day's featured play, stable for the whole day and stable across
 * devices — a hash of the date key indexes the bank, so there's nothing
 * to persist and no "it changed when I reopened the app".
 */
export function playOfTheDay(dateKey: string, bank = SIM_SCENARIOS): SimScenario {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) | 0;
  }
  return bank[Math.abs(hash) % bank.length];
}

/** Plays whose most recent attempt was wrong — the sim's trouble spots. */
export function missedPlays(record: SimRecord, bank = SIM_SCENARIOS): SimScenario[] {
  return bank.filter((s) => record[s.id]?.lastRight === false);
}

export function unplayed(record: SimRecord, bank = SIM_SCENARIOS): SimScenario[] {
  return bank.filter((s) => (record[s.id]?.seen ?? 0) === 0);
}

export function statsByGroup(crew: SimCrew, record: SimRecord): GroupStats[] {
  const byGroup = new Map<string, SimScenario[]>();
  scenariosForCrew(crew).forEach((s) => {
    byGroup.set(s.group, [...(byGroup.get(s.group) ?? []), s]);
  });
  return [...byGroup.entries()].map(([group, scenarios]) => ({
    group,
    scenarios,
    seen: scenarios.filter((s) => (record[s.id]?.seen ?? 0) > 0).length,
    right: scenarios.filter((s) => record[s.id]?.lastRight).length,
  }));
}
