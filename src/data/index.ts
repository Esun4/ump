import { Question, RulesetId } from '../types';
import { OBR_QUESTIONS } from './obr';
import { LL_QUESTIONS } from './littleLeague';
import { MECH_QUESTIONS } from './mechanics';

const banks: Record<RulesetId, Question[]> = {
  obr: OBR_QUESTIONS,
  ll: LL_QUESTIONS,
  mech: MECH_QUESTIONS,
};

export function getBank(ruleset: RulesetId): Question[] {
  return banks[ruleset];
}
