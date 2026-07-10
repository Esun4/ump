import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fonts, Theme, useTheme } from '../theme';
import { useRuleset } from '../state/RulesetContext';
import { RULESETS } from '../types';
import { getBank } from '../data';
import { ActivityLog, loadActivity, loadProgress } from '../srs/storage';
import {
  addDays,
  currentStreak,
  MAX_BUCKET,
  ProgressMap,
  todayKey,
} from '../srs/engine';
import { Chip, SectionLabel } from '../ui';

// The page tracks showing up, not scoring: a contribution-style heatmap of
// daily answers, the current streak, and volume totals. Accuracy lives in
// the SRS engine, not on a scoreboard.

const WEEKS = 16;
const CELL = 14;
const GAP = 3;

function intensity(count: number): number {
  if (count === 0) return 0;
  if (count < 5) return 0.25;
  if (count < 10) return 0.45;
  if (count < 20) return 0.7;
  return 1;
}

function Heatmap({ theme, log, today }: { theme: Theme; log: ActivityLog; today: string }) {
  // Columns are weeks (oldest → current), rows are days Sunday → Saturday,
  // exactly the GitHub contribution layout.
  const weekday = new Date(`${today}T12:00:00`).getDay();
  const currentWeekStart = addDays(today, -weekday);

  const columns = [];
  for (let w = 0; w < WEEKS; w++) {
    const weekStart = addDays(currentWeekStart, (w - (WEEKS - 1)) * 7);
    const cells = [];
    for (let d = 0; d < 7; d++) {
      const day = addDays(weekStart, d);
      const future = day > today;
      const level = future ? -1 : intensity(log[day] ?? 0);
      cells.push(
        <View
          key={day}
          style={[
            styles.cell,
            level <= 0
              ? { backgroundColor: level === -1 ? 'transparent' : theme.hairline }
              : { backgroundColor: theme.accent, opacity: level },
          ]}
        />,
      );
    }
    columns.push(
      <View key={weekStart} style={styles.week}>
        {cells}
      </View>,
    );
  }

  return (
    <View>
      <View style={styles.grid}>{columns}</View>
      <View style={styles.legend}>
        <Text style={[styles.legendText, { color: theme.faintText }]}>LESS</Text>
        {[0, 0.25, 0.45, 0.7, 1].map((level) => (
          <View
            key={level}
            style={[
              styles.cell,
              styles.legendCell,
              level === 0
                ? { backgroundColor: theme.hairline }
                : { backgroundColor: theme.accent, opacity: level },
            ]}
          />
        ))}
        <Text style={[styles.legendText, { color: theme.faintText }]}>MORE</Text>
      </View>
    </View>
  );
}

function Tile({ theme, value, label }: { theme: Theme; value: number; label: string }) {
  return (
    <View style={[styles.tile, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.tileValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.tileLabel, { color: theme.subtleText }]}>{label}</Text>
    </View>
  );
}

export default function StatsScreen() {
  const theme = useTheme();
  const { ruleset } = useRuleset();
  const [log, setLog] = useState<ActivityLog>({});
  const [progress, setProgress] = useState<ProgressMap>({});
  const [bankSize, setBankSize] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      Promise.all([loadActivity(), loadProgress(ruleset), getBank(ruleset)]).then(
        ([activity, prog, bank]) => {
          if (cancelled) return;
          setLog(activity);
          setProgress(prog);
          setBankSize(bank.length);
        },
      );
      return () => {
        cancelled = true;
      };
    }, [ruleset]),
  );

  const today = todayKey();
  const streak = currentStreak(log, today);
  const totalAnswered = Object.values(log).reduce((n, c) => n + c, 0);
  const daysActive = Object.values(log).filter((c) => c > 0).length;
  const mastered = Object.values(progress).filter((p) => p.bucket === MAX_BUCKET).length;

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <View style={[styles.hero, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.streakRow}>
          <Text style={[styles.streakNumber, { color: theme.text }]}>{streak}</Text>
          <View style={styles.streakText}>
            <Text style={[styles.streakLabel, { color: theme.text }]}>
              day streak
            </Text>
            <Text style={[styles.streakSub, { color: theme.subtleText }]}>
              {streak === 0
                ? 'Answer one question to get it going'
                : (log[today] ?? 0) > 0
                  ? 'You’ve trained today — streak is safe'
                  : 'Train today to keep it alive'}
            </Text>
          </View>
        </View>
        <Heatmap theme={theme} log={log} today={today} />
      </View>

      <SectionLabel theme={theme}>All time</SectionLabel>
      <View style={styles.tileRow}>
        <Tile theme={theme} value={totalAnswered} label="answers" />
        <Tile theme={theme} value={daysActive} label="days active" />
        <Tile theme={theme} value={mastered} label="mastered" />
      </View>
      <View style={styles.masteredNote}>
        <Chip theme={theme}>{RULESETS[ruleset].shortLabel}</Chip>
        <Text style={[styles.masteredText, { color: theme.faintText }]}>
          Mastered = in the 30-day review bucket · {mastered} of {bankSize} in this bank
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  hero: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  streakNumber: {
    fontFamily: fonts.display,
    fontSize: 64,
    lineHeight: 66,
    fontVariant: ['tabular-nums'],
    marginRight: 14,
  },
  streakText: { flex: 1 },
  streakLabel: {
    fontFamily: fonts.displaySemi,
    fontSize: 20,
    letterSpacing: 0.5,
  },
  streakSub: { fontSize: 13.5, lineHeight: 18, marginTop: 2 },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  week: { marginRight: GAP },
  cell: {
    width: CELL,
    height: CELL,
    borderRadius: 3.5,
    marginBottom: GAP,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  legendCell: { marginBottom: 0, marginRight: GAP },
  legendText: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 1,
    marginHorizontal: 5,
  },
  tileRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  tile: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tileValue: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 36,
    fontVariant: ['tabular-nums'],
  },
  tileLabel: { fontSize: 12.5, marginTop: 3 },
  masteredNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  masteredText: { flex: 1, fontSize: 12.5, lineHeight: 17 },
});
