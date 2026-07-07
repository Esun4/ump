import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';
import { RULESETS, RULESET_IDS, RulesetId } from '../types';
import { resetProgress } from '../srs/storage';

export default function SettingsScreen() {
  const theme = useTheme();

  const confirmReset = (ruleset: RulesetId) => {
    const label = RULESETS[ruleset].label;
    Alert.alert(
      `Reset ${label} progress?`,
      'This permanently clears the review schedule and stats for this ruleset. Questions in the other ruleset are not affected.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => void resetProgress(ruleset),
        },
      ],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.sectionTitle, { color: theme.subtleText }]}>
        PROGRESS
      </Text>
      {RULESET_IDS.map((id) => (
        <Pressable
          key={id}
          onPress={() => confirmReset(id)}
          style={({ pressed }) => [
            styles.resetButton,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text style={[styles.resetLabel, { color: theme.danger }]}>
            Reset {RULESETS[id].label} progress
          </Text>
        </Pressable>
      ))}
      <Text style={[styles.note, { color: theme.subtleText }]}>
        All progress is stored on this device only.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  resetButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  resetLabel: { fontSize: 15, fontWeight: '600' },
  note: { fontSize: 13, marginTop: 8 },
});
