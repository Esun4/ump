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
import { loadSimActivity, loadSimRecord, SimActivity, SimRecord } from '../sim/storage';
import { statsByGroup } from '../sim/select';
import { scenariosForCrew } from '../sim/scenarios60';
import { SimCrew } from '../sim/types';

// The page tracks showing up, not scoring: a contribution-style heatmap of
// daily answers, the current streak, and volume totals. Accuracy lives in
// the SRS engine, not on a scoreboard.

const WEEKS = 16;
const CELL = 14;
const GAP = 3;

const LEVELS = [0.35, 0.6, 0.85, 1];

function intensity(count: number): number {
  if (count === 0) return 0;
  if (count < 5) return LEVELS[0];
  if (count < 10) return LEVELS[1];
  if (count < 20) return LEVELS[2];
  return LEVELS[3];
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
        {[0, ...LEVELS].map((level) => (
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

function Tile({
  theme,
  value,
  label,
  accent,
}: {
  theme: Theme;
  value: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <View style={[styles.tile, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.tileValue, { color: accent ? theme.accent : theme.text }]}>
        {value}
      </Text>
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
  const [simRecord, setSimRecord] = useState<SimRecord>({});
  const [simActivity, setSimActivity] = useState<SimActivity>({});

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      Promise.all([
        loadActivity(),
        loadProgress(ruleset),
        getBank(ruleset),
        loadSimRecord(),
        loadSimActivity(),
      ]).then(([activity, prog, bank, simRec, simAct]) => {
        if (cancelled) return;
        setLog(activity);
        setProgress(prog);
        setBankSize(bank.length);
        setSimRecord(simRec);
        setSimActivity(simAct);
      });
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

  // The simulator keeps its own ledger — reps run, plays currently correct
  // on their last look, and its own separate day streak.
  const simStreak = currentStreak(simActivity, today);
  const simReps = Object.values(simRecord).reduce((n, r) => n + r.seen, 0);
  const simPlayed = Object.keys(simRecord).length;
  const simCorrect = Object.values(simRecord).filter((r) => r.lastRight).length;
  const simAccuracy = simPlayed > 0 ? Math.round((simCorrect / simPlayed) * 100) : 0;
  const simCrews: SimCrew[] = ['two', 'four'];

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <View style={[styles.hero, { borderBottomColor: theme.rule }]}>
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
        <Tile theme={theme} value={mastered} label="mastered" accent />
      </View>
      <View style={styles.masteredNote}>
        <Chip theme={theme}>{RULESETS[ruleset].shortLabel}</Chip>
        <Text style={[styles.masteredText, { color: theme.faintText }]}>
          Mastered = in the 30-day review bucket · {mastered} of {bankSize} in this bank
        </Text>
      </View>

      <View style={styles.simDivider} />
      <SectionLabel theme={theme}>Simulator</SectionLabel>
      <View style={styles.tileRow}>
        <Tile theme={theme} value={simStreak} label="field streak" />
        <Tile theme={theme} value={simReps} label="plays run" />
        <Tile theme={theme} value={simAccuracy} label="% on last look" accent />
      </View>

      {simCrews.map((crew) => {
        const total = scenariosForCrew(crew).length;
        const groups = statsByGroup(crew, simRecord);
        return (
          <View key={crew} style={styles.simCrewBlock}>
            <View style={styles.simCrewHead}>
              <Chip theme={theme}>{crew === 'two' ? '2-MAN' : '4-MAN'}</Chip>
              <Text style={[styles.simCrewMeta, { color: theme.faintText }]}>
                {`${groups.reduce((n, g) => n + g.seen, 0)} of ${total} plays seen`}
              </Text>
            </View>
            {groups.map((g) => (
              <View key={g.group} style={styles.simGroupRow}>
                <Text style={[styles.simGroupName, { color: theme.text }]} numberOfLines={1}>
                  {g.group}
                </Text>
                {/* A pip per play: filled = right on its last look, ring =
                    seen but missed, hairline = not yet played. */}
                <View style={styles.simPips}>
                  {g.scenarios.map((s) => {
                    const rec = simRecord[s.id];
                    const seen = (rec?.seen ?? 0) > 0;
                    const right = rec?.lastRight ?? false;
                    return (
                      <View
                        key={s.id}
                        style={[
                          styles.simPip,
                          right
                            ? { backgroundColor: theme.accent, borderColor: theme.accent }
                            : seen
                              ? { borderColor: theme.accent }
                              : { borderColor: theme.hairline },
                        ]}
                      />
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  // The streak block is closed by an ink rule rather than boxed in a card.
  hero: {
    borderBottomWidth: 2,
    paddingBottom: 20,
    marginBottom: 26,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  streakNumber: {
    fontFamily: fonts.display,
    fontSize: 64,
    lineHeight: 64,
    letterSpacing: -2,
    fontVariant: ['tabular-nums'],
    marginRight: 16,
  },
  streakText: { flex: 1 },
  streakLabel: {
    fontFamily: fonts.display,
    fontSize: 19,
    letterSpacing: -0.3,
  },
  streakSub: { fontFamily: fonts.body, fontSize: 13, lineHeight: 18, marginTop: 3 },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  week: { marginRight: GAP },
  cell: {
    width: CELL,
    height: CELL,
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
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.2,
    marginHorizontal: 6,
  },
  tileRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  tile: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  tileValue: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 34,
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  tileLabel: { fontFamily: fonts.body, fontSize: 12, marginTop: 4 },
  masteredNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  masteredText: { flex: 1, fontFamily: fonts.body, fontSize: 12, lineHeight: 17 },
  simDivider: { height: 26 },
  simCrewBlock: { marginTop: 16 },
  simCrewHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  simCrewMeta: { fontFamily: fonts.body, fontSize: 12 },
  simGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 9,
  },
  simGroupName: { flex: 1, fontFamily: fonts.body, fontSize: 13.5, marginRight: 12 },
  simPips: { flexDirection: 'row', gap: 5 },
  simPip: { width: 9, height: 9, borderRadius: 5, borderWidth: 1.5 },
});
