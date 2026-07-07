'use client';

import { FormEvent, useState } from 'react';
import {
  RULESET_IDS,
  RULESET_LABELS,
  RULESET_TIERS,
  RulesetId,
  TIER_LABELS,
  Tier,
} from '@/lib/types';

// Everything a trainer supplies for a question. Ids are generated on create
// and immutable after — the mobile app's SRS progress is keyed on them.
export interface QuestionValues {
  ruleset: RulesetId;
  topic: string;
  tier: Tier;
  scenario: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export const MIN_OPTIONS = 2;
export const MAX_OPTIONS = 4;

export function validateQuestion(v: QuestionValues): string | null {
  if (!v.topic.trim()) return 'Topic is required.';
  if (!v.scenario.trim()) return 'Scenario is required.';
  if (!v.explanation.trim()) return 'Explanation is required.';
  if (v.options.length < MIN_OPTIONS || v.options.length > MAX_OPTIONS) {
    return `A question needs ${MIN_OPTIONS}–${MAX_OPTIONS} options.`;
  }
  if (v.options.some((o) => !o.trim())) return 'Every option needs text.';
  if (
    !Number.isInteger(v.correct_index) ||
    v.correct_index < 0 ||
    v.correct_index >= v.options.length
  ) {
    return 'Mark one option as the correct answer.';
  }
  if (!RULESET_TIERS[v.ruleset].includes(v.tier)) {
    return `Tier "${TIER_LABELS[v.tier]}" does not belong to ${RULESET_LABELS[v.ruleset]}.`;
  }
  return null;
}

interface Props {
  initial?: QuestionValues;
  // Ruleset is locked when editing: the id embeds it and the tier vocabulary
  // depends on it.
  lockRuleset?: boolean;
  disabled?: boolean;
  submitLabel: string;
  onSubmit: (values: QuestionValues) => Promise<string | null>;
}

export default function QuestionForm({
  initial,
  lockRuleset = false,
  disabled = false,
  submitLabel,
  onSubmit,
}: Props) {
  const [ruleset, setRuleset] = useState<RulesetId>(initial?.ruleset ?? 'obr');
  const [tier, setTier] = useState<Tier>(
    initial?.tier ?? RULESET_TIERS[initial?.ruleset ?? 'obr'][0],
  );
  const [topic, setTopic] = useState(initial?.topic ?? '');
  const [scenario, setScenario] = useState(initial?.scenario ?? '');
  const [explanation, setExplanation] = useState(initial?.explanation ?? '');
  const [options, setOptions] = useState<string[]>(
    initial?.options ?? ['', ''],
  );
  const [correctIndex, setCorrectIndex] = useState(initial?.correct_index ?? 0);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const changeRuleset = (next: RulesetId) => {
    setRuleset(next);
    // The old tier may not exist in the new ruleset; snap to its first tier.
    if (!RULESET_TIERS[next].includes(tier)) setTier(RULESET_TIERS[next][0]);
  };

  const changeOption = (index: number, text: string) => {
    setOptions((prev) => prev.map((o, i) => (i === index ? text : o)));
  };

  const removeOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
    // Keep the radio pointing at the same option text where possible.
    setCorrectIndex((prev) => {
      if (index === prev) return 0;
      return index < prev ? prev - 1 : prev;
    });
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const values: QuestionValues = {
      ruleset,
      tier,
      topic: topic.trim(),
      scenario: scenario.trim(),
      explanation: explanation.trim(),
      options: options.map((o) => o.trim()),
      correct_index: correctIndex,
    };
    const invalid = validateQuestion(values);
    if (invalid) {
      setError(invalid);
      return;
    }
    setError(null);
    setBusy(true);
    const failure = await onSubmit(values);
    setBusy(false);
    if (failure) setError(failure);
  };

  return (
    <form onSubmit={submit} className="card">
      {error && <div className="form-error">{error}</div>}

      <label className="field">
        <span>Ruleset</span>
        <select
          value={ruleset}
          disabled={disabled || lockRuleset}
          onChange={(e) => changeRuleset(e.target.value as RulesetId)}
        >
          {RULESET_IDS.map((id) => (
            <option key={id} value={id}>
              {RULESET_LABELS[id]}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Tier</span>
        <select
          value={tier}
          disabled={disabled}
          onChange={(e) => setTier(e.target.value as Tier)}
        >
          {RULESET_TIERS[ruleset].map((t) => (
            <option key={t} value={t}>
              {TIER_LABELS[t]}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Topic</span>
        <input
          type="text"
          value={topic}
          disabled={disabled}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Interference"
        />
      </label>

      <label className="field">
        <span>Scenario (original wording only — never rulebook text)</span>
        <textarea
          value={scenario}
          disabled={disabled}
          onChange={(e) => setScenario(e.target.value)}
        />
      </label>

      <div className="field">
        <span
          style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--subtle)',
            marginBottom: 4,
          }}
        >
          Options (select the correct answer)
        </span>
        {options.map((option, i) => (
          <div className="option-row" key={i}>
            <input
              type="radio"
              name="correct"
              checked={correctIndex === i}
              disabled={disabled}
              onChange={() => setCorrectIndex(i)}
              aria-label={`Option ${i + 1} is correct`}
            />
            <input
              type="text"
              value={option}
              disabled={disabled}
              onChange={(e) => changeOption(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
            />
            <button
              type="button"
              className="btn-secondary"
              disabled={disabled || options.length <= MIN_OPTIONS}
              onClick={() => removeOption(i)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn-secondary"
          disabled={disabled || options.length >= MAX_OPTIONS}
          onClick={() => setOptions((prev) => [...prev, ''])}
        >
          Add option
        </button>
      </div>

      <label className="field">
        <span>Explanation</span>
        <textarea
          value={explanation}
          disabled={disabled}
          onChange={(e) => setExplanation(e.target.value)}
        />
      </label>

      <div className="form-actions">
        <button className="btn-primary" type="submit" disabled={disabled || busy}>
          {busy ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  );
}
