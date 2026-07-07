import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../theme';
import { useRuleset } from '../state/RulesetContext';
import { RULESETS } from '../types';
import { getBank } from '../data';
import { loadProgress } from '../srs/storage';
import { statsByTopic, TopicStats } from '../srs/engine';

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
      <Text style={[styles.rulesetName, { color: theme.subtleText }]}>
        {RULESETS[ruleset].label} · first-attempt accuracy
      </Text>

      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.overallPct, { color: theme.text }]}>
          {attempts === 0 ? '—' : `${Math.round((correct / attempts) * 100)}%`}
        </Text>
        <Text style={[styles.overallLabel, { color: theme.subtleText }]}>
          {attempts === 0
            ? 'No sessions yet'
            : `${correct} / ${attempts} first attempts`}
        </Text>
      </View>

      {topics.map((t) => (
        <View
          key={t.topic}
          style={[styles.row, { backgroundColor: theme.card, borderColor: theme.border }]}
        >
          <Text style={[styles.topic, { color: theme.text }]} numberOfLines={1}>
            {t.topic}
          </Text>
          <Text style={[styles.topicStats, { color: theme.subtleText }]}>
            {t.attempts === 0
              ? '—'
              : `${t.correct}/${t.attempts} · ${Math.round((t.correct / t.attempts) * 100)}%`}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  rulesetName: { fontSize: 14, fontWeight: '600', marginBottom: 12 },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  overallPct: { fontSize: 40, fontWeight: '800' },
  overallLabel: { fontSize: 14, marginTop: 4 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  topic: { fontSize: 15, fontWeight: '600', flexShrink: 1, marginRight: 12 },
  topicStats: { fontSize: 14, fontVariant: ['tabular-nums'] },
});
