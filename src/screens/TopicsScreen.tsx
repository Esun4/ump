import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useTheme } from '../theme';
import { useRuleset } from '../state/RulesetContext';
import { RULESETS } from '../types';
import { getBank } from '../data';
import { listTopics, TopicCount } from '../srs/engine';
import { SectionLabel } from '../ui';

type Props = NativeStackScreenProps<RootStackParamList, 'Topics'>;

export default function TopicsScreen({ navigation }: Props) {
  const theme = useTheme();
  const { ruleset } = useRuleset();
  const [topics, setTopics] = useState<TopicCount[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getBank(ruleset).then((bank) => {
      if (!cancelled) setTopics(listTopics(bank));
    });
    return () => {
      cancelled = true;
    };
  }, [ruleset]);

  if (topics === null) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.subtleText }}>Loading…</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.lede, { color: theme.subtleText }]}>
        Drill one area of {RULESETS[ruleset].label}. Practice never affects your
        schedule or stats.
      </Text>

      <SectionLabel theme={theme}>Topics</SectionLabel>
      <View
        style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      >
        {topics.map(({ topic, count }, i) => (
          <Pressable
            key={topic}
            onPress={() => navigation.navigate('Quiz', { mode: 'practice', topic })}
            style={({ pressed }) => [
              styles.row,
              i > 0 && { borderTopWidth: 1, borderTopColor: theme.hairline },
              pressed && { backgroundColor: theme.cardRaised },
            ]}
          >
            <Text style={[styles.topicLabel, { color: theme.text }]}>{topic}</Text>
            <View style={[styles.countPill, { backgroundColor: theme.accentSoft }]}>
              <Text style={[styles.countText, { color: theme.accent }]}>{count}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.faintText} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  lede: { fontSize: 14, lineHeight: 20, marginBottom: 24 },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  topicLabel: { fontSize: 15, fontWeight: '600', flex: 1, marginRight: 12 },
  countPill: {
    minWidth: 30,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    alignItems: 'center',
    marginRight: 8,
  },
  countText: {
    fontSize: 13,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
});
