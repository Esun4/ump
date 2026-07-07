export type RulesetId = 'obr' | 'll';

export type Tier = 'district' | 'provincial' | 'majors' | 'intermediate';

export interface Question {
  id: string;
  ruleset: RulesetId;
  topic: string;
  tier: Tier;
  scenario: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface RulesetInfo {
  id: RulesetId;
  label: string;
  shortLabel: string;
  tierLabels: Partial<Record<Tier, string>>;
}

export const RULESETS: Record<RulesetId, RulesetInfo> = {
  obr: {
    id: 'obr',
    label: 'Baseball Canada / OBR',
    shortLabel: 'OBR',
    tierLabels: { district: 'District', provincial: 'Provincial' },
  },
  ll: {
    id: 'll',
    label: 'Little League',
    shortLabel: 'Little League',
    tierLabels: { majors: 'Majors', intermediate: 'Intermediate+' },
  },
};

export const RULESET_IDS: RulesetId[] = ['obr', 'll'];
