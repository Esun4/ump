import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { fonts, useTheme } from '../theme';
import { useRuleset } from '../state/RulesetContext';
import { Question, RULESETS } from '../types';
import { getBank } from '../data';
import { reportsEnabled, submitReport } from '../data/reports';
import { loadProgress, saveProgress } from '../srs/storage';
import {
  applyFirstAnswer,
  buildPractice,
  buildSession,
  ProgressMap,
  shuffle,
  todayKey,
} from '../srs/engine';
import { Chip, PrimaryButton } from '../ui';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function QuizScreen({ route, navigation }: Props) {
  const { mode, topic } = route.params;
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
  // Ids reported this session, so the link flips to a receipt and a question
  // can't be reported twice in one sitting (requeues included).
  const [reportedIds, setReportedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    navigation.setOptions({
      title: mode === 'practice' ? topic ?? 'Practice' : 'Session',
    });
  }, [navigation, mode, topic]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([loadProgress(ruleset), getBank(ruleset)]).then(([progress, bank]) => {
      if (cancelled) return;
      progressRef.current = progress;
      // A topic filter only ever narrows practice runs — SRS sessions always
      // schedule across the whole bank.
      const session =
        mode === 'practice'
          ? buildPractice(topic ? bank.filter((q) => q.topic === topic) : bank)
          : buildSession(bank, progress, todayKey());
      setQueue(session);
      setTotal(session.length);
    });
    return () => {
      cancelled = true;
    };
    // A quiz is built once for the ruleset/mode/topic it was opened with.
  }, [ruleset, mode, topic]);

  const question = queue && queue.length > 0 ? queue[0] : null;
  // Options display in a random order per showing so the answer's position
  // in the data never becomes the tell. Indices map back to the bank order.
  const optionOrder = useMemo(
    () => (question ? shuffle(question.options.map((_, i) => i)) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question?.id],
  );
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

  const sendReport = (questionId: string, reason: string) => {
    // Mark immediately so the link can't be tapped twice while in flight.
    setReportedIds((ids) => new Set(ids).add(questionId));
    void submitReport(questionId, reason).then((ok) => {
      if (ok) return;
      setReportedIds((ids) => {
        const next = new Set(ids);
        next.delete(questionId);
        return next;
      });
      Alert.alert(
        'Report not sent',
        'Could not reach the server. You can try again from this question.',
      );
    });
  };

  const onReport = () => {
    if (!question) return;
    const id = question.id;
    Alert.alert('Report this question', 'What seems wrong with it?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Answer is wrong',
        onPress: () => sendReport(id, 'Answer is wrong'),
      },
      {
        text: 'Confusing wording',
        onPress: () => sendReport(id, 'Confusing wording'),
      },
      {
        text: 'Typo or formatting',
        onPress: () => sendReport(id, 'Typo or formatting'),
      },
    ]);
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
  const cleared = queue === null ? 0 : total - queue.length;

  if (queue === null) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.subtleText }}>Loading…</Text>
      </View>
    );
  }

  if (question === null) {
    const pct = total === 0 ? 0 : Math.round((firstTryCorrect / total) * 100);
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.doneEyebrow, { color: theme.accent }]}>
          {mode === 'practice' ? 'PRACTICE COMPLETE' : 'SESSION COMPLETE'}
        </Text>
        <Text style={[styles.donePct, { color: theme.text }]}>{pct}%</Text>
        <Text style={[styles.doneStats, { color: theme.subtleText }]}>
          {firstTryCorrect} of {total} on the first try
        </Text>
        <PrimaryButton
          theme={theme}
          label="DONE"
          onPress={() => navigation.goBack()}
          style={styles.doneButton}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <View style={[styles.progressTrack, { backgroundColor: theme.hairline }]}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: theme.accent,
              width: total === 0 ? '0%' : `${(cleared / total) * 100}%`,
            },
          ]}
        />
      </View>

      <View style={styles.meta}>
        <View style={styles.metaChip}>
          <Chip theme={theme}>{`${question.topic} · ${tierLabel}`}</Chip>
        </View>
        <Text style={[styles.metaText, { color: theme.faintText }]}>
          {queue.length} left
        </Text>
      </View>

      <Text style={[styles.scenario, { color: theme.text }]}>
        {question.scenario}
      </Text>

      {optionOrder.map((optionIndex, displayIndex) => {
        const option = question.options[optionIndex];
        const isCorrect = optionIndex === question.correctIndex;
        const isSelected = optionIndex === selected;
        let bg = theme.card;
        let border = theme.border;
        let color = theme.text;
        let badgeBg = 'transparent';
        let badgeBorder = theme.border;
        let badgeColor = theme.subtleText;
        if (answered && isCorrect) {
          bg = theme.correctBg;
          border = theme.correct;
          color = theme.correct;
          badgeBg = theme.correct;
          badgeBorder = theme.correct;
          badgeColor = theme.correctBg;
        } else if (answered && isSelected) {
          bg = theme.wrongBg;
          border = theme.wrong;
          color = theme.wrong;
          badgeBg = theme.wrong;
          badgeBorder = theme.wrong;
          badgeColor = theme.wrongBg;
        }
        return (
          <Pressable
            key={optionIndex}
            disabled={answered}
            onPress={() => onAnswer(optionIndex)}
            style={({ pressed }) => [
              styles.option,
              {
                backgroundColor: pressed && !answered ? theme.cardRaised : bg,
                borderColor: border,
              },
            ]}
          >
            <View
              style={[
                styles.badge,
                { backgroundColor: badgeBg, borderColor: badgeBorder },
              ]}
            >
              <Text style={[styles.badgeText, { color: badgeColor }]}>
                {LETTERS[displayIndex] ?? '·'}
              </Text>
            </View>
            <Text style={[styles.optionText, { color }]}>{option}</Text>
          </Pressable>
        );
      })}

      {answered && (
        <View
          style={[
            styles.feedback,
            { backgroundColor: correct ? theme.correctBg : theme.wrongBg },
          ]}
        >
          <View style={styles.feedbackHeader}>
            <Ionicons
              name={correct ? 'checkmark-circle' : 'close-circle'}
              size={20}
              color={correct ? theme.correct : theme.wrong}
            />
            <Text
              style={[
                styles.feedbackTitle,
                { color: correct ? theme.correct : theme.wrong },
              ]}
            >
              {correct ? 'CORRECT CALL' : 'NOT QUITE'}
            </Text>
          </View>
          <Text style={[styles.explanation, { color: theme.text }]}>
            {question.explanation}
          </Text>
          {!correct && (
            <Text style={[styles.requeueNote, { color: theme.subtleText }]}>
              This one will come back before the session ends.
            </Text>
          )}
          {reportsEnabled &&
            (reportedIds.has(question.id) ? (
              <Text style={[styles.reportLink, { color: theme.subtleText }]}>
                Reported — thanks
              </Text>
            ) : (
              <Pressable onPress={onReport} hitSlop={8}>
                <Text style={[styles.reportLink, { color: theme.subtleText }]}>
                  Report this question
                </Text>
              </Pressable>
            ))}
        </View>
      )}

      {answered && (
        <PrimaryButton
          theme={theme}
          label="NEXT"
          onPress={onNext}
          style={styles.nextButton}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    marginBottom: 18,
    overflow: 'hidden',
  },
  progressFill: { height: 4, borderRadius: 2 },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  metaChip: { flexShrink: 1, marginRight: 12 },
  metaText: { fontSize: 13, fontWeight: '600', fontVariant: ['tabular-nums'] },
  scenario: { fontSize: 19, lineHeight: 28, marginBottom: 22 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  badgeText: {
    fontFamily: fonts.displaySemi,
    fontSize: 15,
  },
  optionText: { fontSize: 15, lineHeight: 21, flex: 1 },
  feedback: {
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  feedbackTitle: {
    fontFamily: fonts.displaySemi,
    fontSize: 17,
    letterSpacing: 1,
    marginLeft: 7,
  },
  explanation: { fontSize: 15, lineHeight: 22 },
  requeueNote: { fontSize: 13, marginTop: 10 },
  reportLink: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 12,
    textDecorationLine: 'underline',
  },
  nextButton: { marginTop: 16 },
  doneEyebrow: {
    fontFamily: fonts.displaySemi,
    fontSize: 16,
    letterSpacing: 2,
    marginBottom: 6,
  },
  donePct: {
    fontFamily: fonts.display,
    fontSize: 76,
    lineHeight: 80,
    fontVariant: ['tabular-nums'],
  },
  doneStats: { fontSize: 15, marginTop: 4, marginBottom: 32 },
  doneButton: { alignSelf: 'stretch', marginHorizontal: 24 },
});
