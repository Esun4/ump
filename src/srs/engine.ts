import { Question } from '../types';

// Leitner buckets: days until a question is due again after an answer.
export const BUCKET_INTERVALS = [1, 3, 7, 14, 30];
export const MAX_BUCKET = BUCKET_INTERVALS.length - 1;
export const SESSION_CAP = 10;
export const PRACTICE_SIZE = 10;

export interface QuestionProgress {
  bucket: number;
  due: string; // local date key, YYYY-MM-DD
  firstAttempts: number;
  firstCorrect: number;
}

export type ProgressMap = Record<string, QuestionProgress>;

export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function addDays(dateKey: string, days: number): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d + days);
  return todayKey(date);
}

export function shuffle<T>(items: T[], rng: () => number = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export interface SessionCounts {
  due: number;
  newFill: number;
  unseen: number;
}

export function sessionCounts(
  questions: Question[],
  progress: ProgressMap,
  today: string,
): SessionCounts {
  let due = 0;
  let unseen = 0;
  for (const q of questions) {
    const p = progress[q.id];
    if (!p) unseen++;
    else if (p.due <= today) due++;
  }
  const newFill = Math.min(unseen, Math.max(0, SESSION_CAP - due));
  return { due, newFill, unseen };
}

/**
 * A session serves every due review (uncapped), then fills with never-seen
 * questions up to SESSION_CAP total.
 */
export function buildSession(
  questions: Question[],
  progress: ProgressMap,
  today: string,
  rng: () => number = Math.random,
): Question[] {
  const due: Question[] = [];
  const unseen: Question[] = [];
  for (const q of questions) {
    const p = progress[q.id];
    if (!p) unseen.push(q);
    else if (p.due <= today) due.push(q);
  }
  const fill = Math.max(0, SESSION_CAP - due.length);
  return [...shuffle(due, rng), ...shuffle(unseen, rng).slice(0, fill)];
}

export function buildPractice(
  questions: Question[],
  rng: () => number = Math.random,
): Question[] {
  return shuffle(questions, rng).slice(0, PRACTICE_SIZE);
}

/**
 * Questions the user has missed on a first attempt and not yet re-mastered.
 * Climbing back to the 14-day bucket clears a question off the list, so it
 * self-prunes as weak spots get repaired.
 */
export function troubleSpots(
  questions: Question[],
  progress: ProgressMap,
): Question[] {
  return questions.filter((q) => {
    const p = progress[q.id];
    return p !== undefined && p.firstCorrect < p.firstAttempts && p.bucket < 3;
  });
}

/**
 * Consecutive days of activity ending today — or ending yesterday, so the
 * streak isn't shown as broken before today's session happens.
 */
export function currentStreak(
  activity: Record<string, number>,
  today: string,
): number {
  let day = (activity[today] ?? 0) > 0 ? today : addDays(today, -1);
  let streak = 0;
  while ((activity[day] ?? 0) > 0) {
    streak++;
    day = addDays(day, -1);
  }
  return streak;
}

export interface TopicCount {
  topic: string;
  count: number;
}

/**
 * Topics of a bank with question counts, in the order topics first appear.
 * Derived from the questions, never hardcoded — new topics added on the
 * server show up automatically.
 */
export function listTopics(questions: Question[]): TopicCount[] {
  const byTopic = new Map<string, TopicCount>();
  for (const q of questions) {
    const entry = byTopic.get(q.topic);
    if (entry) entry.count++;
    else byTopic.set(q.topic, { topic: q.topic, count: 1 });
  }
  return [...byTopic.values()];
}

/**
 * Applies the first answer a question receives in a session. Same-session
 * requeue retries must NOT be passed through here — they never affect
 * scheduling or stats.
 *
 * Seen questions move up one bucket on a correct answer and down one on a
 * miss. A never-seen question lands in the 1-day bucket either way (the
 * difference shows up in stats and in the same-session requeue).
 */
export function applyFirstAnswer(
  progress: ProgressMap,
  questionId: string,
  correct: boolean,
  today: string,
): ProgressMap {
  const prev = progress[questionId];
  let bucket: number;
  if (!prev) {
    bucket = 0;
  } else if (correct) {
    bucket = Math.min(prev.bucket + 1, MAX_BUCKET);
  } else {
    bucket = Math.max(prev.bucket - 1, 0);
  }
  const next: QuestionProgress = {
    bucket,
    due: addDays(today, BUCKET_INTERVALS[bucket]),
    firstAttempts: (prev?.firstAttempts ?? 0) + 1,
    firstCorrect: (prev?.firstCorrect ?? 0) + (correct ? 1 : 0),
  };
  return { ...progress, [questionId]: next };
}

export interface TopicStats {
  topic: string;
  attempts: number;
  correct: number;
}

/**
 * First-attempt accuracy per topic, in the order topics first appear in the
 * bank. Topics are derived from the questions, never hardcoded.
 */
export function statsByTopic(
  questions: Question[],
  progress: ProgressMap,
): TopicStats[] {
  const byTopic = new Map<string, TopicStats>();
  for (const q of questions) {
    let entry = byTopic.get(q.topic);
    if (!entry) {
      entry = { topic: q.topic, attempts: 0, correct: 0 };
      byTopic.set(q.topic, entry);
    }
    const p = progress[q.id];
    if (p) {
      entry.attempts += p.firstAttempts;
      entry.correct += p.firstCorrect;
    }
  }
  return [...byTopic.values()];
}
