'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Shell from '@/components/Shell';
import { getSupabase } from '@/lib/supabase';
import { QuestionRow, ReportRow, Role } from '@/lib/types';

interface ReportView extends ReportRow {
  // Context for the reported id; null when the question no longer exists
  // (reports outlive deletions on purpose — no foreign key).
  question: Pick<QuestionRow, 'topic' | 'scenario' | 'status'> | null;
}

function Reports({ role }: { role: Role }) {
  const [reports, setReports] = useState<ReportView[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    const supabase = getSupabase();
    const { data, error: reportsError } = await supabase
      .from('question_reports')
      .select('*')
      .order('created_at', { ascending: false });
    if (reportsError) {
      setError(reportsError.message);
      return;
    }
    const rows = (data ?? []) as ReportRow[];
    const ids = [...new Set(rows.map((r) => r.question_id))];
    let questions = new Map<string, ReportView['question']>();
    if (ids.length > 0) {
      const { data: qData } = await supabase
        .from('questions')
        .select('id,topic,scenario,status')
        .in('id', ids);
      questions = new Map(
        ((qData ?? []) as (Pick<QuestionRow, 'id' | 'topic' | 'scenario' | 'status'>)[]).map(
          (q) => [q.id, { topic: q.topic, scenario: q.scenario, status: q.status }],
        ),
      );
    }
    setReports(
      rows.map((r) => ({ ...r, question: questions.get(r.question_id) ?? null })),
    );
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clear = async (reportId: string) => {
    setError(null);
    const { error: deleteError } = await getSupabase()
      .from('question_reports')
      .delete()
      .eq('id', reportId);
    if (deleteError) setError(deleteError.message);
    else setReports((prev) => prev?.filter((r) => r.id !== reportId) ?? null);
  };

  return (
    <>
      <div className="page-title-row">
        <h1>Reports</h1>
      </div>
      <p className="muted small" style={{ marginBottom: 14 }}>
        Flags filed from the app’s quiz screen.
        {role !== 'admin' && ' Only the admin can clear them.'}
      </p>

      {error && <div className="form-error">{error}</div>}
      {reports === null && !error && <p className="muted">Loading…</p>}
      {reports !== null && reports.length === 0 && (
        <p className="muted">No open reports. 🎉</p>
      )}
      {reports !== null && reports.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Filed</th>
              <th>Question</th>
              <th>Reason</th>
              {role === 'admin' && <th />}
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td className="small muted">
                  {new Date(r.created_at).toLocaleString()}
                </td>
                <td className="small">
                  {r.question ? (
                    <>
                      <Link href={`/questions/${encodeURIComponent(r.question_id)}`}>
                        {r.question_id}
                      </Link>{' '}
                      <span className={`badge ${r.question.status}`}>
                        {r.question.status}
                      </span>
                      <br />
                      <span className="muted">
                        {r.question.topic} —{' '}
                        {r.question.scenario.length > 80
                          ? `${r.question.scenario.slice(0, 80)}…`
                          : r.question.scenario}
                      </span>
                    </>
                  ) : (
                    <>
                      {r.question_id}{' '}
                      <span className="muted">(no longer in the bank)</span>
                    </>
                  )}
                </td>
                <td className="small">{r.reason}</td>
                {role === 'admin' && (
                  <td>
                    <button
                      className="btn-secondary"
                      onClick={() => void clear(r.id)}
                    >
                      Clear
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default function ReportsPage() {
  return <Shell>{(role) => <Reports role={role} />}</Shell>;
}
