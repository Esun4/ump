import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { fonts, useTheme } from '../theme';
import { useRuleset } from '../state/RulesetContext';
import { RULESETS } from '../types';
import { getBank } from '../data';
import { listTopics, TopicCount } from '../srs/engine';
import { Card, Rule, SectionLabel, rowDivider } from '../ui';

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
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Rule theme={theme} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.lede, { color: theme.subtleText }]}>
          Drill one area of {RULESETS[ruleset].label}. Practice never affects your
          schedule or stats.
        </Text>

        <SectionLabel theme={theme}>Topics</SectionLabel>
        <Card theme={theme}>
          {topics.map(({ topic, count }, i) => (
            <Pressable
              key={topic}
              onPress={() => navigation.navigate('Quiz', { mode: 'practice', topic })}
              style={({ pressed }) => [
                styles.row,
                rowDivider(theme, i),
                { backgroundColor: pressed ? theme.accentSoft : theme.card },
              ]}
            >
              <Text style={[styles.topicLabel, { color: theme.text }]}>{topic}</Text>
              <View style={[styles.countTag, { backgroundColor: theme.accentSoft }]}>
                <Text style={[styles.countText, { color: theme.accentDeep }]}>{count}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={theme.faintText} />
            </Pressable>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  lede: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 20, marginBottom: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  topicLabel: { fontFamily: fonts.bodyBold, fontSize: 14.5, flex: 1, marginRight: 12 },
  countTag: {
    minWidth: 26,
    paddingHorizontal: 7,
    paddingVertical: 3,
    alignItems: 'center',
    marginRight: 10,
  },
  countText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    fontVariant: ['tabular-nums'],
  },
});
