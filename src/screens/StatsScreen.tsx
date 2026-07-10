import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fonts, useTheme } from '../theme';
import { useRuleset } from '../state/RulesetContext';
import { RULESETS } from '../types';
import { getBank } from '../data';
import { loadProgress } from '../srs/storage';
import { statsByTopic, TopicStats } from '../srs/engine';
import { Chip, SectionLabel } from '../ui';

export default function StatsScreen() {
  const theme = useTheme();
  const { ruleset } = useRuleset();
  const [topics, setTopics] = useState<TopicStats[]>([]);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      Promise.all([loadProgress(ruleset), getBank(ruleset)]).then(([progress, bank]) => {
        if (cancelled) return;
        setTopics(statsByTopic(bank, progress));
      });
      return () => {
        cancelled = true;
      };
    }, [ruleset]),
  );

  const attempts = topics.reduce((n, t) => n + t.attempts, 0);
  const correct = topics.reduce((n, t) => n + t.correct, 0);

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <View
        style={[styles.hero, { backgroundColor: theme.card, borderColor: theme.border }]}
      >
        <Chip theme={theme}>{RULESETS[ruleset].shortLabel}</Chip>
        <Text style={[styles.overallPct, { color: theme.text }]}>
          {attempts === 0 ? '—' : `${Math.round((correct / attempts) * 100)}%`}
        </Text>
        <Text style={[styles.overallLabel, { color: theme.subtleText }]}>
          {attempts === 0
            ? 'No sessions yet — accuracy shows up after your first one'
            : `first-attempt accuracy · ${correct} of ${attempts}`}
        </Text>
      </View>

      {topics.length > 0 && (
        <>
          <SectionLabel theme={theme}>By topic</SectionLabel>
          <View
            style={[
              styles.topicCard,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            {topics.map((t, i) => {
              const pct = t.attempts === 0 ? null : t.correct / t.attempts;
              return (
                <View
                  key={t.topic}
                  style={[
                    styles.topicRow,
                    i > 0 && { borderTopWidth: 1, borderTopColor: theme.hairline },
                  ]}
                >
                  <View style={styles.topicHeader}>
                    <Text
                      style={[styles.topic, { color: theme.text }]}
                      numberOfLines={1}
                    >
                      {t.topic}
                    </Text>
                    <Text style={[styles.topicStats, { color: theme.subtleText }]}>
                      {pct === null
                        ? 'not seen yet'
                        : `${t.correct}/${t.attempts} · ${Math.round(pct * 100)}%`}
                    </Text>
                  </View>
                  <View style={[styles.barTrack, { backgroundColor: theme.hairline }]}>
                    {pct !== null && pct > 0 && (
                      <View
                        style={[
                          styles.barFill,
                          { backgroundColor: theme.accent, width: `${pct * 100}%` },
                        ]}
                      />
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  hero: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 22,
    marginBottom: 28,
  },
  overallPct: {
    fontFamily: fonts.display,
    fontSize: 64,
    lineHeight: 68,
    marginTop: 12,
    fontVariant: ['tabular-nums'],
  },
  overallLabel: { fontSize: 14, marginTop: 2 },
  topicCard: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  topicRow: { paddingVertical: 14 },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topic: { fontSize: 15, fontWeight: '600', flexShrink: 1, marginRight: 12 },
  topicStats: { fontSize: 13, fontVariant: ['tabular-nums'] },
  barTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: { height: 6, borderRadius: 3 },
});
