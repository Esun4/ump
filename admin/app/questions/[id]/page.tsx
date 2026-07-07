'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Shell from '@/components/Shell';
import QuestionForm, { QuestionValues } from '@/components/QuestionForm';
import { getSupabase } from '@/lib/supabase';
import { QuestionRow, Role } from '@/lib/types';

function EditQuestion({ role }: { role: Role }) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = decodeURIComponent(params.id);

  const [row, setRow] = useState<QuestionRow | null | undefined>(undefined);
  const [actionError, setActionError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getSupabase()
      .from('questions')
      .select('*')
      .eq('id', id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setRow((data as QuestionRow | null) ?? null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (row === undefined) return <p className="muted">Loading…</p>;
  if (row === null) {
    return (
      <p className="muted">
        Question “{id}” was not found (or you don’t have access to it).
      </p>
    );
  }

  // Trainers can see published rows but not touch them; RLS enforces this,
  // the disabled form just makes it visible.
  const readOnly = role === 'trainer' && row.status === 'published';

  const save = async (values: QuestionValues): Promise<string | null> => {
    // The id is never part of an update — ids are permanent.
    const { error } = await getSupabase()
      .from('questions')
      .update(values)
      .eq('id', row.id);
    if (error) return error.message;
    router.push('/questions');
    return null;
  };

  const setStatus = async (status: 'draft' | 'published') => {
    setBusy(true);
    setActionError(null);
    const { error } = await getSupabase()
      .from('questions')
      .update({ status })
      .eq('id', row.id);
    setBusy(false);
    if (error) setActionError(error.message);
    else setRow({ ...row, status });
  };

  const remove = async () => {
    const label =
      row.status === 'published'
        ? 'This question is LIVE in the app. Deleting it removes it from every quiz. Delete anyway?'
        : 'Delete this draft?';
    if (!window.confirm(label)) return;
    setBusy(true);
    setActionError(null);
    const { error } = await getSupabase()
      .from('questions')
      .delete()
      .eq('id', row.id);
    setBusy(false);
    if (error) setActionError(error.message);
    else router.push('/questions');
  };

  const canDelete = role === 'admin' || row.status === 'draft';

  return (
    <>
      <div className="page-title-row">
        <h1>
          {row.id} <span className={`badge ${row.status}`}>{row.status}</span>
        </h1>
        <div className="form-actions" style={{ marginTop: 0 }}>
          {role === 'admin' &&
            (row.status === 'draft' ? (
              <button
                className="btn-primary"
                disabled={busy}
                onClick={() => void setStatus('published')}
              >
                Publish
              </button>
            ) : (
              <button
                className="btn-secondary"
                disabled={busy}
                onClick={() => void setStatus('draft')}
              >
                Unpublish
              </button>
            ))}
          {canDelete && (
            <button
              className="btn-danger"
              disabled={busy}
              onClick={() => void remove()}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {readOnly && (
        <p className="muted small" style={{ marginBottom: 14 }}>
          Published questions are read-only for trainers. Ask the admin to
          unpublish it if it needs edits.
        </p>
      )}
      {actionError && <div className="form-error">{actionError}</div>}

      <QuestionForm
        initial={{
          ruleset: row.ruleset,
          topic: row.topic,
          tier: row.tier,
          scenario: row.scenario,
          options: row.options,
          correct_index: row.correct_index,
          explanation: row.explanation,
        }}
        lockRuleset
        disabled={readOnly}
        submitLabel="Save changes"
        onSubmit={save}
      />
    </>
  );
}

export default function EditQuestionPage() {
  return <Shell>{(role) => <EditQuestion role={role} />}</Shell>;
}
