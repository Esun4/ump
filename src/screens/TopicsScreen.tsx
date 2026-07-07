import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useTheme } from '../theme';
import { useRuleset } from '../state/RulesetContext';
import { RULESETS } from '../types';
import { getBank } from '../data';
import { listTopics, TopicCount } from '../srs/engine';

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
      <Text style={[styles.rulesetName, { color: theme.subtleText }]}>
        {RULESETS[ruleset].label}
      </Text>
      {topics.map(({ topic, count }) => (
        <Pressable
          key={topic}
          onPress={() => navigation.navigate('Quiz', { mode: 'practice', topic })}
          style={({ pressed }) => [
            styles.topicButton,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text style={[styles.topicLabel, { color: theme.text }]}>{topic}</Text>
          <Text style={[styles.topicCount, { color: theme.subtleText }]}>
            {count}
          </Text>
        </Pressable>
      ))}
      <Text style={[styles.note, { color: theme.subtleText }]}>
        Practice never affects your schedule or stats.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  rulesetName: { fontSize: 14, marginBottom: 12 },
  topicButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  topicLabel: { fontSize: 15, fontWeight: '600', flexShrink: 1, marginRight: 12 },
  topicCount: { fontSize: 14, fontWeight: '600' },
  note: { fontSize: 13, marginTop: 8 },
});
