import React, { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { fonts, useTheme } from '../theme';
import { RULESETS, RULESET_IDS, RulesetId } from '../types';
import { useRuleset } from '../state/RulesetContext';
import { BankInfo, getBankInfo } from '../data';
import { resetProgress } from '../srs/storage';
import { resetSimRecord } from '../sim/storage';
import { Card, SectionLabel, rowDivider } from '../ui';

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
      'This permanently clears the review schedule and trouble spots for this ruleset. Bookmarks, your activity heatmap, and other rulesets are not affected.',
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

  const confirmResetSim = () => {
    Alert.alert(
      'Reset simulator record?',
      'This clears your play results and field streak across both crews. Question progress and bookmarks are not affected.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => void resetSimRecord(),
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
      <Card theme={theme} style={styles.bankCard}>
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
      </Card>

      <SectionLabel theme={theme}>Progress</SectionLabel>
      <Card theme={theme} style={styles.resetCard}>
        {RULESET_IDS.map((id, i) => (
          <Pressable
            key={id}
            onPress={() => confirmReset(id)}
            style={({ pressed }) => [
              styles.resetRow,
              rowDivider(theme, i),
              { backgroundColor: pressed ? theme.accentSoft : theme.card },
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
        <Pressable
          onPress={confirmResetSim}
          style={({ pressed }) => [
            styles.resetRow,
            rowDivider(theme, RULESET_IDS.length),
            { backgroundColor: pressed ? theme.accentSoft : theme.card },
          ]}
        >
          <Ionicons
            name="refresh-outline"
            size={16}
            color={theme.danger}
            style={styles.resetIcon}
          />
          <Text style={[styles.resetLabel, { color: theme.danger }]}>
            Reset simulator record
          </Text>
        </Pressable>
      </Card>

      <SectionLabel theme={theme}>About</SectionLabel>
      <Text style={[styles.note, { color: theme.subtleText }]}>
        Offline-first · progress lives on this device only.{'\n'}
        Scenario drills for amateur baseball umpires.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  bankCard: {
    padding: 16,
    marginBottom: 28,
  },
  bankRuleset: { fontFamily: fonts.bodyBold, fontSize: 12.5, marginBottom: 6 },
  bankCount: { fontFamily: fonts.bodyBold, fontSize: 14.5, marginBottom: 4 },
  bankDetail: { fontFamily: fonts.body, fontSize: 12.5 },
  resetCard: { marginBottom: 28 },
  resetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  resetIcon: { marginRight: 10 },
  resetLabel: { fontFamily: fonts.bodyBold, fontSize: 14.5, flexShrink: 1 },
  note: { fontFamily: fonts.body, fontSize: 13, lineHeight: 21 },
});
