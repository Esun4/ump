'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Shell from '@/components/Shell';
import { getSupabase } from '@/lib/supabase';
import {
  QuestionRow,
  QuestionStatus,
  RULESET_IDS,
  RULESET_LABELS,
  RulesetId,
  TIER_LABELS,
} from '@/lib/types';

type RulesetFilter = RulesetId | 'all';
type StatusFilter = QuestionStatus | 'all';

function QuestionList() {
  const router = useRouter();
  const [rows, setRows] = useState<QuestionRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ruleset, setRuleset] = useState<RulesetFilter>('all');
  const [status, setStatus] = useState<StatusFilter>('all');

  useEffect(() => {
    let cancelled = false;
    setRows(null);
    setError(null);
    let query = getSupabase()
      .from('questions')
      .select('*')
      .order('updated_at', { ascending: false });
    if (ruleset !== 'all') query = query.eq('ruleset', ruleset);
    if (status !== 'all') query = query.eq('status', status);
    query.then(({ data, error: err }) => {
      if (cancelled) return;
      if (err) setError(err.message);
      else setRows(data as QuestionRow[]);
    });
    return () => {
      cancelled = true;
    };
  }, [ruleset, status]);

  return (
    <>
      <div className="page-title-row">
        <h1>Questions</h1>
        <Link href="/questions/new">
          <button className="btn-primary">New question</button>
        </Link>
      </div>

      <div className="filters">
        <select
          value={ruleset}
          onChange={(e) => setRuleset(e.target.value as RulesetFilter)}
        >
          <option value="all">All rulesets</option>
          {RULESET_IDS.map((id) => (
            <option key={id} value={id}>
              {RULESET_LABELS[id]}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusFilter)}
        >
          <option value="all">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {error && <div className="form-error">{error}</div>}
      {rows === null && !error && <p className="muted">Loading…</p>}
      {rows !== null && rows.length === 0 && (
        <p className="muted">No questions match these filters.</p>
      )}
      {rows !== null && rows.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Ruleset</th>
              <th>Topic · Tier</th>
              <th>Scenario</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((q) => (
              <tr
                key={q.id}
                className="clickable"
                onClick={() =>
                  router.push(`/questions/${encodeURIComponent(q.id)}`)
                }
              >
                <td className="small">{q.id}</td>
                <td className="small">{RULESET_LABELS[q.ruleset]}</td>
                <td className="small">
                  {q.topic} · {TIER_LABELS[q.tier]}
                </td>
                <td className="small">
                  {q.scenario.length > 90
                    ? `${q.scenario.slice(0, 90)}…`
                    : q.scenario}
                </td>
                <td>
                  <span className={`badge ${q.status}`}>{q.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default function QuestionsPage() {
  return <Shell>{() => <QuestionList />}</Shell>;
}
