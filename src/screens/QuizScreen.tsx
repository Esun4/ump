import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useTheme } from '../theme';
import { useRuleset } from '../state/RulesetContext';
import { Question, RULESETS } from '../types';
import { getBank } from '../data';
import { loadProgress, saveProgress } from '../srs/storage';
import {
  applyFirstAnswer,
  buildPractice,
  buildSession,
  ProgressMap,
  todayKey,
} from '../srs/engine';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

export default function QuizScreen({ route, navigation }: Props) {
  const { mode } = route.params;
  const theme = useTheme();
  const { ruleset } = useRuleset();

  const [queue, setQueue] = useState<Question[] | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  // Ids answered at least once this session: their later appearances are
  // requeue retries and must not touch scheduling or stats.
  const answeredOnce = useRef(new Set<string>());
  const progressRef = useRef<ProgressMap>({});

  useEffect(() => {
    navigation.setOptions({
      title: mode === 'practice' ? 'Practice' : 'Quiz',
    });
  }, [navigation, mode]);

  useEffect(() => {
    let cancelled = false;
    loadProgress(ruleset).then((progress) => {
      if (cancelled) return;
      progressRef.current = progress;
      const bank = getBank(ruleset);
      const session =
        mode === 'practice'
          ? buildPractice(bank)
          : buildSession(bank, progress, todayKey());
      setQueue(session);
      setTotal(session.length);
    });
    return () => {
      cancelled = true;
    };
    // A quiz is built once for the ruleset/mode it was opened with.
  }, [ruleset, mode]);

  const question = queue && queue.length > 0 ? queue[0] : null;
  const tierLabel = question
    ? RULESETS[question.ruleset].tierLabels[question.tier] ?? question.tier
    : '';

  const onAnswer = (index: number) => {
    if (!question || selected !== null) return;
    setSelected(index);
    const correct = index === question.correctIndex;
    const isFirst = !answeredOnce.current.has(question.id);
    if (isFirst) {
      answeredOnce.current.add(question.id);
      if (correct) setFirstTryCorrect((n) => n + 1);
      if (mode === 'session') {
        progressRef.current = applyFirstAnswer(
          progressRef.current,
          question.id,
          correct,
          todayKey(),
        );
        void saveProgress(ruleset, progressRef.current);
      }
    }
  };

  const onNext = () => {
    if (!question || selected === null || !queue) return;
    const wrong = selected !== question.correctIndex;
    const rest = queue.slice(1);
    // Missed questions requeue to the back until answered correctly once.
    setQueue(wrong ? [...rest, question] : rest);
    setSelected(null);
  };

  const answered = selected !== null;
  const correct = question !== null && selected === question.correctIndex;

  if (queue === null) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.subtleText }}>Loading…</Text>
      </View>
    );
  }

  if (question === null) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.doneTitle, { color: theme.text }]}>
          {mode === 'practice' ? 'Practice complete' : 'Session complete'}
        </Text>
        <Text style={[styles.doneStats, { color: theme.subtleText }]}>
          First try: {firstTryCorrect} / {total}
        </Text>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.doneButton,
            { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Text style={[styles.doneLabel, { color: theme.onPrimary }]}>Done</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.meta}>
        <Text style={[styles.metaText, { color: theme.subtleText }]}>
          {question.topic} · {tierLabel}
        </Text>
        <Text style={[styles.metaText, { color: theme.subtleText }]}>
          {queue.length} left
        </Text>
      </View>

      <Text style={[styles.scenario, { color: theme.text }]}>
        {question.scenario}
      </Text>

      {question.options.map((option, i) => {
        const isCorrect = i === question.correctIndex;
        const isSelected = i === selected;
        let bg = theme.card;
        let border = theme.border;
        let color = theme.text;
        if (answered && isCorrect) {
          bg = theme.correctBg;
          border = theme.correct;
          color = theme.correct;
        } else if (answered && isSelected) {
          bg = theme.wrongBg;
          border = theme.wrong;
          color = theme.wrong;
        }
        return (
          <Pressable
            key={i}
            disabled={answered}
            onPress={() => onAnswer(i)}
            style={[styles.option, { backgroundColor: bg, borderColor: border }]}
          >
            <Text style={[styles.optionText, { color }]}>{option}</Text>
          </Pressable>
        );
      })}

      {answered && (
        <View
          style={[
            styles.feedback,
            {
              backgroundColor: correct ? theme.correctBg : theme.wrongBg,
              borderColor: correct ? theme.correct : theme.wrong,
            },
          ]}
        >
          <Text
            style={[
              styles.feedbackTitle,
              { color: correct ? theme.correct : theme.wrong },
            ]}
          >
            {correct ? 'Correct' : 'Not quite'}
          </Text>
          <Text style={[styles.explanation, { color: theme.text }]}>
            {question.explanation}
          </Text>
          {!correct && (
            <Text style={[styles.requeueNote, { color: theme.subtleText }]}>
              This one will come back before the session ends.
            </Text>
          )}
        </View>
      )}

      {answered && (
        <Pressable
          onPress={onNext}
          style={({ pressed }) => [
            styles.nextButton,
            { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Text style={[styles.nextLabel, { color: theme.onPrimary }]}>Next</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metaText: { fontSize: 13, fontWeight: '600' },
  scenario: { fontSize: 18, lineHeight: 26, marginBottom: 20 },
  option: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  optionText: { fontSize: 15, lineHeight: 21 },
  feedback: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  feedbackTitle: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
  explanation: { fontSize: 15, lineHeight: 22 },
  requeueNote: { fontSize: 13, marginTop: 10 },
  nextButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextLabel: { fontSize: 17, fontWeight: '700' },
  doneTitle: { fontSize: 26, fontWeight: '800', marginBottom: 8 },
  doneStats: { fontSize: 17, marginBottom: 28 },
  doneButton: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  doneLabel: { fontSize: 17, fontWeight: '700' },
});
