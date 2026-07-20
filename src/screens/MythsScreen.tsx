import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { fonts, useTheme } from '../theme';
import { Card, Rule } from '../ui';
import { RULE_MYTHS } from '../data/pregame';

// The things coaches and parents "know" that the rulebook doesn't say —
// each myth paired with the actual call.

export default function MythsScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Rule theme={theme} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.lede, { color: theme.subtleText }]}>
          You’ll hear every one of these from a bench eventually. Know the real rule
          before they do.
        </Text>

        {RULE_MYTHS.map((m) => (
          <Card key={m.myth} theme={theme} style={styles.card}>
            <Text style={[styles.mythLabel, { color: theme.accent }]}>MYTH</Text>
            <Text style={[styles.myth, { color: theme.text }]}>“{m.myth}”</Text>
            <View style={[styles.rulingBlock, { borderTopColor: theme.hairline }]}>
              <Text style={[styles.rulingLabel, { color: theme.correct }]}>THE CALL</Text>
              <Text style={[styles.ruling, { color: theme.text }]}>{m.ruling}</Text>
              <Text style={[styles.detail, { color: theme.subtleText }]}>{m.detail}</Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  lede: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, marginBottom: 22 },
  card: {
    padding: 16,
    marginBottom: 14,
  },
  mythLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 7,
  },
  myth: {
    fontFamily: fonts.display,
    fontSize: 19,
    lineHeight: 25,
    letterSpacing: -0.4,
    marginBottom: 14,
  },
  rulingBlock: { borderTopWidth: 1, paddingTop: 13 },
  rulingLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  ruling: { fontFamily: fonts.bodyBold, fontSize: 15, lineHeight: 21, marginBottom: 5 },
  detail: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 20 },
});
