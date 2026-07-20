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
import {
  bumpActivity,
  loadBookmarks,
  loadProgress,
  saveBookmarks,
  saveProgress,
} from '../srs/storage';
import {
  applyFirstAnswer,
  buildPractice,
  buildSession,
  ProgressMap,
  shuffle,
  todayKey,
  troubleSpots,
} from '../srs/engine';
import { Chip, FeedbackPanel, OptionRow, OptionState, PrimaryButton } from '../ui';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function QuizScreen({ route, navigation }: Props) {
  const { mode, topic, filter } = route.params;
  const theme = useTheme();
  const { ruleset } = useRuleset();

  const [queue, setQueue] = useState<Question[] | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
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
      title:
        filter === 'trouble'
          ? 'Trouble Spots'
          : filter === 'bookmarks'
            ? 'Bookmarks'
            : mode === 'practice'
              ? topic ?? 'Practice'
              : 'Session',
    });
  }, [navigation, mode, topic, filter]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([loadProgress(ruleset), getBank(ruleset), loadBookmarks(ruleset)]).then(
      ([progress, bank, saved]) => {
        if (cancelled) return;
        progressRef.current = progress;
        setBookmarks(saved);
        // Topic, trouble-spot, and bookmark filters only ever narrow practice
        // runs — SRS sessions always schedule across the whole bank.
        const pool =
          filter === 'trouble'
            ? troubleSpots(bank, progress)
            : filter === 'bookmarks'
              ? bank.filter((q) => saved.has(q.id))
              : topic
                ? bank.filter((q) => q.topic === topic)
                : bank;
        const session =
          mode === 'practice'
            ? buildPractice(pool)
            : buildSession(bank, progress, todayKey());
        setQueue(session);
        setTotal(session.length);
      },
    );
    return () => {
      cancelled = true;
    };
    // A quiz is built once for the ruleset/mode/topic it was opened with.
  }, [ruleset, mode, topic, filter]);

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
      // Every first answer counts toward the day's activity — practice
      // included. Requeue retries never do.
      void bumpActivity(todayKey());
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

  const onToggleBookmark = () => {
    if (!question) return;
    const next = new Set(bookmarks);
    if (next.has(question.id)) next.delete(question.id);
    else next.add(question.id);
    setBookmarks(next);
    void saveBookmarks(ruleset, next);
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

  // Filtered practice pools can come up empty — that's a good sign for
  // trouble spots and just an unstarted list for bookmarks, not a 0% run.
  if (question === null && total === 0) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Ionicons
          name={filter === 'bookmarks' ? 'bookmark-outline' : 'shield-checkmark-outline'}
          size={40}
          color={theme.accent}
          style={styles.emptyIcon}
        />
        <Text style={[styles.emptyTitle, { color: theme.text }]}>
          {filter === 'bookmarks' ? 'No bookmarks yet' : 'No trouble spots'}
        </Text>
        <Text style={[styles.emptyText, { color: theme.subtleText }]}>
          {filter === 'bookmarks'
            ? 'Tap the bookmark on any question during a session or practice run to save it here.'
            : 'Questions you miss collect here until you’ve worked them back up. Right now the slate is clean.'}
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
        <Pressable onPress={onToggleBookmark} hitSlop={10} style={styles.bookmark}>
          <Ionicons
            name={bookmarks.has(question.id) ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={bookmarks.has(question.id) ? theme.accent : theme.faintText}
          />
        </Pressable>
      </View>

      <Text style={[styles.scenario, { color: theme.text }]}>
        {question.scenario}
      </Text>

      {optionOrder.map((optionIndex, displayIndex) => {
        const isCorrect = optionIndex === question.correctIndex;
        const isSelected = optionIndex === selected;
        let state: OptionState = 'idle';
        if (answered) {
          state = isCorrect ? 'correct' : isSelected ? 'wrong' : 'dimmed';
        }
        return (
          <OptionRow
            key={optionIndex}
            theme={theme}
            letter={LETTERS[displayIndex] ?? '·'}
            text={question.options[optionIndex]}
            state={state}
            disabled={answered}
            onPress={() => onAnswer(optionIndex)}
          />
        );
      })}

      {answered && (
        <FeedbackPanel
          theme={theme}
          correct={correct}
          title={correct ? 'CORRECT CALL' : 'NOT QUITE'}
        >
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
        </FeedbackPanel>
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
  center: { flex: 1, alignItems: 'flex-start', justifyContent: 'center', padding: 24 },
  progressTrack: {
    height: 5,
    marginBottom: 18,
    overflow: 'hidden',
  },
  progressFill: { height: 5 },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  metaChip: { flexShrink: 1, marginRight: 12 },
  metaText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    fontVariant: ['tabular-nums'],
  },
  bookmark: { marginLeft: 14 },
  emptyIcon: { marginBottom: 14 },
  emptyTitle: {
    fontFamily: fonts.display,
    fontSize: 30,
    letterSpacing: -0.6,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: fonts.body,
    fontSize: 14.5,
    lineHeight: 21,
    marginBottom: 32,
  },
  scenario: { fontFamily: fonts.body, fontSize: 19, lineHeight: 27, marginBottom: 22 },
  explanation: { fontFamily: fonts.body, fontSize: 14.5, lineHeight: 21 },
  requeueNote: { fontFamily: fonts.body, fontSize: 13, marginTop: 10 },
  reportLink: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    marginTop: 12,
    textDecorationLine: 'underline',
  },
  nextButton: { marginTop: 16 },
  doneEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 1.7,
    marginBottom: 8,
  },
  donePct: {
    fontFamily: fonts.display,
    fontSize: 76,
    lineHeight: 78,
    letterSpacing: -2.5,
    fontVariant: ['tabular-nums'],
  },
  doneStats: { fontFamily: fonts.body, fontSize: 14.5, marginTop: 6, marginBottom: 32 },
  doneButton: { alignSelf: 'stretch' },
});
