import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useTheme } from '../theme';
import { useRuleset } from '../state/RulesetContext';
import { RULESETS, RULESET_IDS } from '../types';
import { getBank } from '../data';
import { loadProgress } from '../srs/storage';
import { sessionCounts, todayKey, SessionCounts } from '../srs/engine';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function HomeScreen({ navigation }: Props) {
  const theme = useTheme();
  const { ruleset, setRuleset } = useRuleset();
  const [counts, setCounts] = useState<SessionCounts | null>(null);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      Promise.all([loadProgress(ruleset), getBank(ruleset)]).then(([progress, bank]) => {
        if (cancelled) return;
        setCounts(sessionCounts(bank, progress, todayKey()));
      });
      return () => {
        cancelled = true;
      };
    }, [ruleset]),
  );

  const caughtUp = counts !== null && counts.due === 0 && counts.newFill === 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Ump</Text>
      <Text style={[styles.subtitle, { color: theme.subtleText }]}>
        Scenario drills for umpires
      </Text>

      <View style={[styles.toggle, { borderColor: theme.border, backgroundColor: theme.card }]}>
        {RULESET_IDS.map((id) => {
          const active = id === ruleset;
          return (
            <Pressable
              key={id}
              onPress={() => setRuleset(id)}
              style={[
                styles.toggleOption,
                active && { backgroundColor: theme.primary },
              ]}
            >
              <Text
                style={[
                  styles.toggleLabel,
                  { color: active ? theme.onPrimary : theme.subtleText },
                ]}
              >
                {RULESETS[id].shortLabel}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.rulesetName, { color: theme.subtleText }]}>
          {RULESETS[ruleset].label}
        </Text>
        {counts === null ? (
          <Text style={[styles.counts, { color: theme.subtleText }]}>…</Text>
        ) : caughtUp ? (
          <Text style={[styles.counts, { color: theme.text }]}>
            All caught up 🎉
          </Text>
        ) : (
          <Text style={[styles.counts, { color: theme.text }]}>
            {counts.due} review{counts.due === 1 ? '' : 's'} due · {counts.newFill} new
          </Text>
        )}
        <Pressable
          disabled={counts === null}
          onPress={() =>
            navigation.navigate('Quiz', {
              mode: caughtUp ? 'practice' : 'session',
            })
          }
          style={({ pressed }) => [
            styles.startButton,
            { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Text style={[styles.startLabel, { color: theme.onPrimary }]}>
            {caughtUp ? 'Practice' : 'Start'}
          </Text>
        </Pressable>
        {caughtUp && (
          <Text style={[styles.practiceNote, { color: theme.subtleText }]}>
            Practice never affects your schedule or stats.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 72 },
  title: { fontSize: 40, fontWeight: '800' },
  subtitle: { fontSize: 16, marginTop: 4, marginBottom: 28 },
  toggle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  toggleOption: {
    flexBasis: '50%',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleLabel: { fontSize: 15, fontWeight: '600' },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  rulesetName: { fontSize: 14, marginBottom: 8 },
  counts: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  startButton: {
    alignSelf: 'stretch',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  startLabel: { fontSize: 17, fontWeight: '700' },
  practiceNote: { fontSize: 13, marginTop: 12, textAlign: 'center' },
});
