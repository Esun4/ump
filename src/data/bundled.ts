import { Question, RulesetId } from '../types';
import { OBR_QUESTIONS } from './obr';
import { LL_QUESTIONS } from './littleLeague';
import { MECH60_QUESTIONS } from './mechanics60';
import { MECH_BIG_QUESTIONS } from './mechanicsBig';

// The banks compiled into the app. They ship with every build and serve as
// the last-resort fallback when the remote bank has never been fetched.
const banks: Record<RulesetId, Question[]> = {
  obr: OBR_QUESTIONS,
  ll: LL_QUESTIONS,
  mech60: MECH60_QUESTIONS,
  mechBig: MECH_BIG_QUESTIONS,
};

export function getBundledBank(ruleset: RulesetId): Question[] {
  return banks[ruleset];
}
