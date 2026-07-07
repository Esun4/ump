'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import QuestionForm, { QuestionValues } from '@/components/QuestionForm';
import { getSupabase } from '@/lib/supabase';

// Ids are permanent once created (the app's SRS progress is keyed on them),
// so new ones get a random suffix that can never collide with the seeded
// sequential ids (obr-001, ll-042, …).
function newQuestionId(ruleset: string): string {
  const suffix = Array.from({ length: 6 }, () =>
    'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(
      Math.floor(Math.random() * 36),
    ),
  ).join('');
  return `${ruleset}-${suffix}`;
}

function NewQuestion() {
  const router = useRouter();

  const create = async (values: QuestionValues): Promise<string | null> => {
    // Everyone creates drafts — publishing is a separate, admin-only step.
    const { error } = await getSupabase().from('questions').insert({
      id: newQuestionId(values.ruleset),
      ...values,
      status: 'draft',
    });
    if (error) return error.message;
    router.push('/questions');
    return null;
  };

  return (
    <>
      <div className="page-title-row">
        <h1>New question</h1>
      </div>
      <p className="muted small" style={{ marginBottom: 14 }}>
        New questions are saved as drafts. The app only ever sees published
        questions.
      </p>
      <QuestionForm submitLabel="Create draft" onSubmit={create} />
    </>
  );
}

export default function NewQuestionPage() {
  return <Shell>{() => <NewQuestion />}</Shell>;
}
