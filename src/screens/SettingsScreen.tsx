import React, { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../theme';
import { RULESETS, RULESET_IDS, RulesetId } from '../types';
import { useRuleset } from '../state/RulesetContext';
import { BankInfo, getBankInfo } from '../data';
import { resetProgress } from '../srs/storage';

const SOURCE_LABELS: Record<BankInfo['source'], string> = {
  server: 'Live from server',
  cached: 'Cached from server',
  bundled: 'Built into the app',
};

function syncLabel(info: BankInfo): string {
  if (!info.fetchedAt) return 'Never synced';
  const date = new Date(info.fetchedAt);
  if (Number.isNaN(date.getTime())) return 'Never synced';
  return `Last synced ${date.toLocaleString()}`;
}

export default function SettingsScreen() {
  const theme = useTheme();
  const { ruleset } = useRuleset();
  const [bankInfo, setBankInfo] = useState<BankInfo | null>(null);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setBankInfo(null);
      getBankInfo(ruleset).then((info) => {
        if (!cancelled) setBankInfo(info);
      });
      return () => {
        cancelled = true;
      };
    }, [ruleset]),
  );

  const confirmReset = (target: RulesetId) => {
    const label = RULESETS[target].label;
    Alert.alert(
      `Reset ${label} progress?`,
      'This permanently clears the review schedule and stats for this ruleset. Questions in the other ruleset are not affected.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => void resetProgress(target),
        },
      ],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.sectionTitle, { color: theme.subtleText }]}>
        QUESTION BANK
      </Text>
      <View
        style={[
          styles.bankCard,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.bankRuleset, { color: theme.subtleText }]}>
          {RULESETS[ruleset].label}
        </Text>
        {bankInfo === null ? (
          <Text style={[styles.bankDetail, { color: theme.subtleText }]}>…</Text>
        ) : (
          <>
            <Text style={[styles.bankCount, { color: theme.text }]}>
              {bankInfo.questions.length} question
              {bankInfo.questions.length === 1 ? '' : 's'} ·{' '}
              {SOURCE_LABELS[bankInfo.source]}
            </Text>
            <Text style={[styles.bankDetail, { color: theme.subtleText }]}>
              {syncLabel(bankInfo)}
            </Text>
          </>
        )}
      </View>

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
  bankCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  bankRuleset: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  bankCount: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  bankDetail: { fontSize: 13 },
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
