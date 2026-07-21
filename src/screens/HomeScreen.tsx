import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { fonts, useTheme } from '../theme';
import { useRuleset } from '../state/RulesetContext';
import { RULESETS } from '../types';
import { getBank } from '../data';
import { loadBookmarks, loadProgress } from '../srs/storage';
import { currentStreak, sessionCounts, todayKey, troubleSpots, SessionCounts } from '../srs/engine';
import { loadSimActivity } from '../sim/storage';
import { playOfTheDay } from '../sim/select';
import { useWalkthroughTarget } from '../walkthrough/useWalkthroughTarget';
import { useWalkthrough } from '../walkthrough/WalkthroughContext';
import { Card, NavRow, PrimaryButton, SectionLabel } from '../ui';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function HomeScreen({ navigation }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { ruleset } = useRuleset();
  const [counts, setCounts] = useState<SessionCounts | null>(null);
  const [troubleCount, setTroubleCount] = useState(0);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [simStreak, setSimStreak] = useState(0);

  // The featured play is keyed to the date, so it holds all day and
  // doesn't reshuffle when the screen refocuses.
  const featured = useMemo(() => playOfTheDay(todayKey()), []);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setCounts(null);
      Promise.all([
        loadProgress(ruleset),
        getBank(ruleset),
        loadBookmarks(ruleset),
        loadSimActivity(),
      ]).then(([progress, bank, bookmarks, simActivity]) => {
        if (cancelled) return;
        setCounts(sessionCounts(bank, progress, todayKey()));
        setTroubleCount(troubleSpots(bank, progress).length);
        setBookmarkCount(bank.filter((q) => bookmarks.has(q.id)).length);
        setSimStreak(currentStreak(simActivity, todayKey()));
      });
      return () => {
        cancelled = true;
      };
    }, [ruleset]),
  );

  const caughtUp = counts !== null && counts.due === 0 && counts.newFill === 0;
  // Fly ball coverage only applies to the 4-umpire mechanics banks.
  const showCoverage = ruleset === 'mech60' || ruleset === 'mechBig';

  // Walkthrough spotlight targets on this screen.
  const heroTarget = useWalkthroughTarget('home.hero');
  const trainTarget = useWalkthroughTarget('home.train');
  const featuredTarget = useWalkthroughTarget('home.featured');
  const gamedayTarget = useWalkthroughTarget('home.gameday');
  const { registerScroller, noteScrollOffset } = useWalkthrough();

  return (
    <ScrollView
      ref={registerScroller}
      scrollEventThrottle={16}
      onScroll={(e) => noteScrollOffset(e.nativeEvent.contentOffset.y)}
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

      <View {...heroTarget} collapsable={false} style={[styles.hero, { borderColor: theme.rule }]}>
        <Text style={[styles.heroEyebrow, { color: theme.accentDeep }]}>
          {`TODAY · ${RULESETS[ruleset].shortLabel}`.toUpperCase()}
        </Text>

        {counts === null ? (
          <Text style={[styles.heroQuiet, { color: theme.faintText }]}>Checking your schedule…</Text>
        ) : caughtUp ? (
          <View style={styles.heroBody}>
            <Text style={[styles.heroHeadline, { color: theme.text }]}>All caught up</Text>
            <Text style={[styles.heroSub, { color: theme.subtleText }]}>
              Nothing due today. Keep the eye sharp with a practice run.
            </Text>
          </View>
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
        />
        {caughtUp && (
          <Text style={[styles.practiceNote, { color: theme.faintText }]}>
            Practice never affects your schedule or stats.
          </Text>
        )}
      </View>

      {/* The simulator's standing presence on Home: one play, chosen by
          the date, that drops you straight onto the field. */}
      <Pressable
        {...featuredTarget}
        collapsable={false}
        onPress={() =>
          navigation.navigate('SimPlay', { crew: featured.crew, scenarioId: featured.id })
        }
        style={({ pressed }) => [
          styles.featured,
          { borderColor: theme.rule, backgroundColor: pressed ? theme.accentSoft : theme.card },
        ]}
      >
        <View style={styles.featuredHead}>
          <Text style={[styles.featuredEyebrow, { color: theme.accentDeep }]}>
            PLAY OF THE DAY
          </Text>
          {simStreak > 0 && (
            <Text style={[styles.featuredStreak, { color: theme.faintText }]}>
              {`${simStreak}-DAY FIELD STREAK`}
            </Text>
          )}
        </View>
        <Text style={[styles.featuredTitle, { color: theme.text }]}>{featured.title}</Text>
        <View style={styles.featuredFoot}>
          <Ionicons
            name={featured.kind === 'mechanics' ? 'walk-outline' : 'hand-left-outline'}
            size={15}
            color={theme.subtleText}
          />
          <Text style={[styles.featuredMeta, { color: theme.subtleText }]}>
            {`${featured.crew === 'two' ? '2-man' : '4-man'} · you are ${featured.seat} · ${
              featured.kind === 'mechanics' ? 'make the move' : 'make the call'
            }`}
          </Text>
        </View>
      </Pressable>

      <SectionLabel theme={theme}>Train</SectionLabel>
      {/* Wrapped because Card doesn't forward a ref for the walkthrough. */}
      <View {...trainTarget} collapsable={false} style={styles.group}>
      <Card theme={theme}>
        <NavRow
          theme={theme}
          first
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
          tag={troubleCount > 0 ? String(troubleCount) : undefined}
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
          tag={bookmarkCount > 0 ? String(bookmarkCount) : undefined}
          onPress={() => navigation.navigate('Quiz', { mode: 'practice', filter: 'bookmarks' })}
        />
        <NavRow
          theme={theme}
          icon="settings-outline"
          title="Question Bank"
          subtitle={RULESETS[ruleset].label}
          onPress={() => navigation.navigate('Library')}
        />
      </Card>
      </View>

      <SectionLabel theme={theme}>Game day</SectionLabel>
      <View {...gamedayTarget} collapsable={false}>
      <Card theme={theme}>
        {/* Fly ball coverage is 4-umpire only — hidden for the 2-man
            setups we usually work so Game day stays quick to scan. */}
        {showCoverage && (
          <NavRow
            theme={theme}
            first
            icon="navigate-outline"
            title="Fly ball coverage"
            subtitle="4-umpire rotations — routine and trouble balls"
            onPress={() => navigation.navigate('Coverage')}
          />
        )}
        <NavRow
          theme={theme}
          first={!showCoverage}
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
      </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 22, paddingBottom: 48 },
  header: { flexDirection: 'row', alignItems: 'flex-end' },
  wordmark: {
    fontFamily: fonts.display,
    fontSize: 44,
    letterSpacing: -0.9,
    lineHeight: 46,
  },
  wordmarkDot: {
    width: 9,
    height: 9,
    marginLeft: 9,
    marginBottom: 9,
    transform: [{ rotate: '45deg' }],
  },
  subtitle: { fontFamily: fonts.body, fontSize: 13.5, marginTop: 3, marginBottom: 20 },
  // The hero is a single ruled block: the button runs edge to edge inside
  // the 2px frame, so the padding lives on the content above it.
  hero: {
    borderWidth: 2,
    marginBottom: 26,
  },
  heroEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.5,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  heroQuiet: {
    fontFamily: fonts.body,
    fontSize: 14,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
  },
  heroBody: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 18 },
  heroHeadline: {
    fontFamily: fonts.display,
    fontSize: 32,
    letterSpacing: -0.6,
  },
  heroSub: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 19, marginTop: 5 },
  countRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 18,
  },
  countBlock: { minWidth: 64 },
  countNumber: {
    fontFamily: fonts.display,
    fontSize: 56,
    lineHeight: 56,
    letterSpacing: -1.4,
    fontVariant: ['tabular-nums'],
  },
  countLabel: { fontFamily: fonts.body, fontSize: 12, marginTop: 4 },
  countDivider: { width: 1, height: 48, marginHorizontal: 22, marginBottom: 8 },
  practiceNote: {
    fontFamily: fonts.body,
    fontSize: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  group: { marginBottom: 26 },
  featured: { borderWidth: 2, padding: 16, marginBottom: 26 },
  featuredHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  featuredEyebrow: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.5 },
  featuredStreak: { fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.8 },
  featuredTitle: { fontFamily: fonts.display, fontSize: 26, letterSpacing: -0.5 },
  featuredFoot: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  featuredMeta: { fontFamily: fonts.body, fontSize: 12.5, marginLeft: 6 },
});
