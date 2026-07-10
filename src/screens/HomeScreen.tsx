import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { fonts, useTheme } from '../theme';
import { useRuleset } from '../state/RulesetContext';
import { RULESETS } from '../types';
import { getBank } from '../data';
import { loadBookmarks, loadProgress } from '../srs/storage';
import { sessionCounts, todayKey, troubleSpots, SessionCounts } from '../srs/engine';
import { Chip, DiamondMotif, NavRow, PrimaryButton, SectionLabel } from '../ui';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function HomeScreen({ navigation }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { ruleset } = useRuleset();
  const [counts, setCounts] = useState<SessionCounts | null>(null);
  const [troubleCount, setTroubleCount] = useState(0);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setCounts(null);
      Promise.all([loadProgress(ruleset), getBank(ruleset), loadBookmarks(ruleset)]).then(
        ([progress, bank, bookmarks]) => {
          if (cancelled) return;
          setCounts(sessionCounts(bank, progress, todayKey()));
          setTroubleCount(troubleSpots(bank, progress).length);
          setBookmarkCount(bank.filter((q) => bookmarks.has(q.id)).length);
        },
      );
      return () => {
        cancelled = true;
      };
    }, [ruleset]),
  );

  const caughtUp = counts !== null && counts.due === 0 && counts.newFill === 0;

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingTop: insets.top + 24 }]}
    >
      <View style={styles.header}>
        <Text style={[styles.wordmark, { color: theme.text }]}>UMP</Text>
        <View style={[styles.wordmarkDot, { backgroundColor: theme.accent }]} />
      </View>
      <Text style={[styles.subtitle, { color: theme.subtleText }]}>
        Scenario drills for umpires
      </Text>

      <View
        style={[
          styles.hero,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <DiamondMotif theme={theme} />
        <Chip theme={theme}>{`Today · ${RULESETS[ruleset].shortLabel}`}</Chip>

        {counts === null ? (
          <Text style={[styles.heroQuiet, { color: theme.faintText }]}>Checking your schedule…</Text>
        ) : caughtUp ? (
          <>
            <Text style={[styles.heroHeadline, { color: theme.text }]}>All caught up</Text>
            <Text style={[styles.heroSub, { color: theme.subtleText }]}>
              Nothing due today. Keep the eye sharp with a practice run.
            </Text>
          </>
        ) : (
          <View style={styles.countRow}>
            <View style={styles.countBlock}>
              <Text style={[styles.countNumber, { color: theme.text }]}>{counts.due}</Text>
              <Text style={[styles.countLabel, { color: theme.subtleText }]}>
                {counts.due === 1 ? 'review due' : 'reviews due'}
              </Text>
            </View>
            <View style={[styles.countDivider, { backgroundColor: theme.hairline }]} />
            <View style={styles.countBlock}>
              <Text style={[styles.countNumber, { color: theme.accent }]}>{counts.newFill}</Text>
              <Text style={[styles.countLabel, { color: theme.subtleText }]}>new</Text>
            </View>
          </View>
        )}

        <PrimaryButton
          theme={theme}
          disabled={counts === null}
          label={caughtUp ? 'PRACTICE' : 'START SESSION'}
          onPress={() =>
            navigation.navigate('Quiz', { mode: caughtUp ? 'practice' : 'session' })
          }
          style={styles.heroButton}
        />
        {caughtUp && (
          <Text style={[styles.practiceNote, { color: theme.faintText }]}>
            Practice never affects your schedule or stats.
          </Text>
        )}
      </View>

      <SectionLabel theme={theme}>Train</SectionLabel>
      <NavRow
        theme={theme}
        icon="library-outline"
        title="Question library"
        subtitle={RULESETS[ruleset].label}
        onPress={() => navigation.navigate('Library')}
      />
      <NavRow
        theme={theme}
        icon="locate-outline"
        title="Practice a topic"
        subtitle="Drill one area — never touches your schedule"
        onPress={() => navigation.navigate('Topics')}
      />
      <NavRow
        theme={theme}
        icon="flame-outline"
        title="Trouble spots"
        subtitle={
          troubleCount === 0
            ? 'Nothing you’ve missed needs work'
            : `${troubleCount} missed ${troubleCount === 1 ? 'question' : 'questions'} to shore up`
        }
        onPress={() => navigation.navigate('Quiz', { mode: 'practice', filter: 'trouble' })}
      />
      <NavRow
        theme={theme}
        icon="bookmark-outline"
        title="Bookmarks"
        subtitle={
          bookmarkCount === 0
            ? 'Save questions from any quiz to revisit'
            : `${bookmarkCount} saved ${bookmarkCount === 1 ? 'question' : 'questions'}`
        }
        onPress={() => navigation.navigate('Quiz', { mode: 'practice', filter: 'bookmarks' })}
      />

      <View style={styles.sectionGap} />
      <SectionLabel theme={theme}>Game day</SectionLabel>
      <NavRow
        theme={theme}
        icon="navigate-outline"
        title="Fly ball coverage"
        subtitle="4-umpire rotations — routine and trouble balls"
        onPress={() => navigation.navigate('Coverage')}
      />
      <NavRow
        theme={theme}
        icon="clipboard-outline"
        title="Plate meeting"
        subtitle="Tick through the pre-game conference"
        onPress={() => navigation.navigate('PlateMeeting')}
      />
      <NavRow
        theme={theme}
        icon="alert-circle-outline"
        title="Rule myths"
        subtitle="What the bench thinks the rulebook says"
        onPress={() => navigation.navigate('Myths')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 48 },
  header: { flexDirection: 'row', alignItems: 'flex-end' },
  wordmark: {
    fontFamily: fonts.display,
    fontSize: 44,
    letterSpacing: 3,
    lineHeight: 46,
  },
  wordmarkDot: {
    width: 9,
    height: 9,
    borderRadius: 2,
    marginLeft: 7,
    marginBottom: 9,
    transform: [{ rotate: '45deg' }],
  },
  subtitle: { fontSize: 15, marginTop: 2, marginBottom: 28 },
  hero: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 22,
    marginBottom: 32,
    overflow: 'hidden',
  },
  heroQuiet: { fontSize: 15, marginTop: 20, marginBottom: 24 },
  heroHeadline: {
    fontFamily: fonts.display,
    fontSize: 34,
    marginTop: 16,
  },
  heroSub: { fontSize: 14, lineHeight: 20, marginTop: 4, marginBottom: 22 },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 22,
  },
  countBlock: { minWidth: 72 },
  countNumber: {
    fontFamily: fonts.display,
    fontSize: 52,
    lineHeight: 54,
    fontVariant: ['tabular-nums'],
  },
  countLabel: { fontSize: 13, marginTop: 2 },
  countDivider: { width: 1, height: 44, marginHorizontal: 24 },
  heroButton: { marginTop: 2 },
  practiceNote: { fontSize: 12.5, marginTop: 12, textAlign: 'center' },
  sectionGap: { height: 18 },
});
