export type RulesetId =
  | 'obr'
  | 'll'
  | 'mech60'
  | 'mechBig'
  | 'interlock60'
  | 'interlockBig';

export type Tier =
  | 'district'
  | 'provincial'
  | 'majors'
  | 'intermediate'
  | 'sixty'
  | 'big';

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
  mech60: {
    id: 'mech60',
    label: '4-Umpire Mechanics · 60-ft Diamond',
    shortLabel: '4-Ump 60 ft',
    tierLabels: { sixty: '60-ft Diamond' },
  },
  mechBig: {
    id: 'mechBig',
    label: '4-Umpire Mechanics · 50/70 & 90-ft',
    shortLabel: '4-Ump 50/70+',
    tierLabels: { big: '50/70 & 90-ft' },
  },
  interlock60: {
    id: 'interlock60',
    label: 'District Interlock · Minor/Major (60 ft)',
    shortLabel: 'Interlock 60 ft',
    tierLabels: { sixty: 'Minor/Major' },
  },
  interlockBig: {
    id: 'interlockBig',
    label: 'District Interlock · Junior/Senior (90 ft)',
    shortLabel: 'Interlock 90 ft',
    tierLabels: { big: 'Junior/Senior' },
  },
};

export const RULESET_IDS: RulesetId[] = [
  'obr',
  'll',
  'mech60',
  'mechBig',
  'interlock60',
  'interlockBig',
];
