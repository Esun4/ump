import React, { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../theme';
import { RULESETS, RULESET_IDS, RulesetId } from '../types';
import { useRuleset } from '../state/RulesetContext';
import { BankInfo, getBankInfo } from '../data';
import { resetProgress } from '../srs/storage';
import { SectionLabel } from '../ui';

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
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <SectionLabel theme={theme}>Question bank</SectionLabel>
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
            <Text style={[styles.bankDetail, { color: theme.faintText }]}>
              {syncLabel(bankInfo)}
            </Text>
          </>
        )}
      </View>

      <SectionLabel theme={theme}>Progress</SectionLabel>
      <View
        style={[
          styles.resetCard,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        {RULESET_IDS.map((id, i) => (
          <Pressable
            key={id}
            onPress={() => confirmReset(id)}
            style={({ pressed }) => [
              styles.resetRow,
              i > 0 && { borderTopWidth: 1, borderTopColor: theme.hairline },
              pressed && { backgroundColor: theme.cardRaised },
            ]}
          >
            <Ionicons
              name="refresh-outline"
              size={16}
              color={theme.danger}
              style={styles.resetIcon}
            />
            <Text style={[styles.resetLabel, { color: theme.danger }]}>
              Reset {RULESETS[id].label}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={[styles.note, { color: theme.faintText }]}>
        All progress is stored on this device only.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  bankCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
  },
  bankRuleset: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  bankCount: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  bankDetail: { fontSize: 13 },
  resetCard: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  resetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  resetIcon: { marginRight: 10 },
  resetLabel: { fontSize: 15, fontWeight: '600', flexShrink: 1 },
  note: { fontSize: 13, marginTop: 12 },
});
