import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { fonts, useTheme } from '../theme';
import { Chip, FeedbackPanel, OptionRow, OptionState, PrimaryButton, Rule } from '../ui';
import FieldCanvas from '../sim/FieldCanvas';
import { SIM_SCENARIOS, scenariosForCrew } from '../sim/scenarios60';
import { SimScenario } from '../sim/types';

// The player: run one scenario (from the library) or a shuffled run of a
// crew's scenarios. Mechanics plays freeze at the crack of the bat and ask
// for your move before the reveal; call plays run in full — replay as
// often as you like — before you rule.

type Props = NativeStackScreenProps<RootStackParamList, 'SimPlay'>;

type Phase = 'ready' | 'rolling' | 'asking' | 'reveal' | 'summary';

const LETTERS = ['A', 'B', 'C', 'D'];

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function SimPlayScreen({ navigation, route }: Props) {
  const theme = useTheme();
  const { crew, scenarioId } = route.params;
  const isRun = scenarioId === undefined;

  const [deck, setDeck] = useState<SimScenario[]>(() =>
    isRun
      ? shuffle(scenariosForCrew(crew))
      : SIM_SCENARIOS.filter((s) => s.id === scenarioId),
  );
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('ready');
  const [selected, setSelected] = useState<number | null>(null);
  const [right, setRight] = useState(0);
  const [caption, setCaption] = useState<string | null>(null);

  const scenario = deck[index];
  const clock = useRef(new Animated.Value(0)).current;
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    navigation.setOptions({ title: crew === 'two' ? '2-Man Crew' : '4-Man Crew' });
  }, [navigation, crew]);

  // Drive the clock from `from` to `to` seconds, surfacing captions as
  // their moments pass, then hand off to `then`.
  const roll = useCallback(
    (from: number, to: number, then?: () => void) => {
      clearTimers();
      clock.setValue(from);
      (scenario.captions ?? [])
        .filter((c) => c.t > from && c.t <= to)
        .forEach((c) => {
          timers.current.push(
            setTimeout(() => setCaption(c.text), Math.max(0, (c.t - from) * 1000)),
          );
        });
      Animated.timing(clock, {
        toValue: to,
        duration: (to - from) * 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && then) then();
      });
    },
    [clock, clearTimers, scenario],
  );

  const startPlay = () => {
    setPhase('rolling');
    setCaption(null);
    const stopAt = scenario.kind === 'mechanics' ? scenario.freezeAt! : scenario.duration;
    roll(0, stopAt, () => setPhase('asking'));
  };

  const replayForAsking = () => {
    setPhase('rolling');
    roll(0, scenario.duration, () => setPhase('asking'));
  };

  const onAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === scenario.correctIndex) setRight((r) => r + 1);
    setPhase('reveal');
    if (scenario.kind === 'mechanics') {
      roll(scenario.freezeAt!, scenario.duration);
    }
  };

  const replayReveal = () => {
    roll(0, scenario.duration);
  };

  const onNext = () => {
    if (index + 1 < deck.length) {
      clearTimers();
      clock.setValue(0);
      setIndex(index + 1);
      setSelected(null);
      setCaption(null);
      setPhase('ready');
    } else if (isRun) {
      setPhase('summary');
    } else {
      navigation.goBack();
    }
  };

  const restartRun = () => {
    clearTimers();
    clock.setValue(0);
    setDeck(shuffle(scenariosForCrew(crew)));
    setIndex(0);
    setRight(0);
    setSelected(null);
    setCaption(null);
    setPhase('ready');
  };

  const kindLabel = scenario?.kind === 'mechanics' ? 'Make the move' : 'Make the call';
  const answered = selected !== null;
  const correct = answered && selected === scenario?.correctIndex;

  if (phase === 'summary') {
    return (
      <ScrollView
        style={{ backgroundColor: theme.background }}
        contentContainerStyle={styles.summaryContainer}
      >
        <Text style={[styles.summaryScore, { color: theme.text }]}>
          {right}/{deck.length}
        </Text>
        <Text style={[styles.summaryLabel, { color: theme.subtleText }]}>
          {right === deck.length
            ? 'Clean game. The crew is in good hands.'
            : right >= deck.length / 2
              ? 'Solid — rewatch the ones that got you.'
              : 'Rough inning. Run it back.'}
        </Text>
        <PrimaryButton theme={theme} label="RUN IT AGAIN" onPress={restartRun} />
        <Pressable onPress={() => navigation.goBack()} style={styles.quietAction}>
          <Text style={[styles.quietActionText, { color: theme.subtleText }]}>
            Back to the simulator
          </Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <View style={[styles.meta, { borderBottomColor: theme.rule }]}>
        <Chip theme={theme}>{`${crew === 'two' ? '2-Man' : '4-Man'} · ${kindLabel}`}</Chip>
        {isRun && (
          <Text style={[styles.metaText, { color: theme.subtleText }]}>
            {index + 1} of {deck.length}
            {index > 0 || answered ? ` · ${right} right` : ''}
          </Text>
        )}
      </View>

      {/* The field panel and its caption strip read as one tinted block,
          closed off by the ink rule below the caption. */}
      <View style={[styles.fieldCard, { backgroundColor: theme.cardRaised }]}>
        <FieldCanvas
          theme={theme}
          actors={scenario.actors}
          clock={clock}
          showTrails={phase === 'reveal'}
        />
      </View>

      <View style={[styles.captionStrip, { backgroundColor: theme.cardRaised }]}>
        {phase === 'asking' && scenario.kind === 'mechanics' ? (
          <Text style={[styles.captionText, { color: theme.accentDeep }]}>
            ⏸ FROZEN — {caption ?? 'the ball is in the air'}
          </Text>
        ) : caption ? (
          <Text style={[styles.captionText, { color: theme.subtleText }]}>{caption}</Text>
        ) : null}
      </View>
      <Rule theme={theme} style={styles.fieldRule} />

      {phase === 'ready' && (
        <>
          <Text style={[styles.title, { color: theme.text }]}>{scenario.title}</Text>
          <Text style={[styles.setup, { color: theme.subtleText }]}>{scenario.setup}</Text>
          {scenario.kind === 'call' && (
            <Text style={[styles.hint, { color: theme.faintText }]}>
              The whole play will run — you can replay it before you rule.
            </Text>
          )}
          <PrimaryButton theme={theme} label="PLAY THE BALL" onPress={startPlay} />
        </>
      )}

      {(phase === 'asking' || phase === 'reveal') && (
        <>
          <Text style={[styles.question, { color: theme.text }]}>
            <Text style={[styles.questionSeat, { color: theme.accentDeep }]}>
              {`You are ${scenario.seat}.  `}
            </Text>
            {scenario.question}
          </Text>

          {scenario.options.map((option, i) => {
            let state: OptionState = 'idle';
            if (answered) {
              state =
                i === scenario.correctIndex
                  ? 'correct'
                  : i === selected
                    ? 'wrong'
                    : 'dimmed';
            }
            return (
              <OptionRow
                key={i}
                theme={theme}
                letter={LETTERS[i]}
                text={option}
                state={state}
                disabled={answered}
                onPress={() => onAnswer(i)}
              />
            );
          })}

          {phase === 'asking' && scenario.kind === 'call' && (
            <Pressable onPress={replayForAsking} style={styles.quietAction}>
              <Ionicons name="refresh" size={15} color={theme.accentDeep} />
              <Text style={[styles.quietActionText, { color: theme.accentDeep }]}>
                Watch it again
              </Text>
            </Pressable>
          )}

          {phase === 'reveal' && (
            <>
              <FeedbackPanel
                theme={theme}
                correct={correct}
                title={
                  correct
                    ? scenario.kind === 'mechanics'
                      ? 'RIGHT MOVE'
                      : 'CORRECT CALL'
                    : 'NOT QUITE'
                }
              >
                <Text style={[styles.explanation, { color: theme.text }]}>
                  {scenario.explanation}
                </Text>
                <Text style={[styles.trailNote, { color: theme.subtleText }]}>
                  Dotted lines show each umpire’s path — yours in sapphire.
                </Text>
              </FeedbackPanel>
              <Pressable onPress={replayReveal} style={styles.quietAction}>
                <Ionicons name="refresh" size={15} color={theme.accentDeep} />
                <Text style={[styles.quietActionText, { color: theme.accentDeep }]}>
                  Replay the whole play
                </Text>
              </Pressable>
              <PrimaryButton
                theme={theme}
                label={
                  index + 1 < deck.length ? 'NEXT PLAY' : isRun ? 'FINISH RUN' : 'DONE'
                }
                onPress={onNext}
              />
            </>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 48 },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    paddingBottom: 14,
    marginBottom: 16,
  },
  metaText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    fontVariant: ['tabular-nums'],
  },
  fieldCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  captionStrip: {
    minHeight: 34,
    justifyContent: 'center',
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  fieldRule: { marginBottom: 18 },
  captionText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13.5,
    letterSpacing: 0.5,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 26,
    letterSpacing: -0.6,
    marginTop: 2,
  },
  setup: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, marginTop: 8, marginBottom: 14 },
  hint: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, marginBottom: 14, marginTop: -6 },
  question: { fontFamily: fonts.body, fontSize: 16, lineHeight: 23, marginBottom: 16, marginTop: 2 },
  questionSeat: { fontFamily: fonts.bodyBold },
  explanation: { fontFamily: fonts.body, fontSize: 14.5, lineHeight: 21 },
  trailNote: { fontFamily: fonts.body, fontSize: 12.5, marginTop: 9 },
  quietAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 6,
  },
  quietActionText: { fontFamily: fonts.bodyBold, fontSize: 14 },
  summaryContainer: { padding: 24, paddingTop: 72, alignItems: 'stretch' },
  summaryScore: {
    fontFamily: fonts.display,
    fontSize: 76,
    letterSpacing: -2.5,
    fontVariant: ['tabular-nums'],
  },
  summaryLabel: {
    fontFamily: fonts.body,
    fontSize: 14.5,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 28,
  },
});
