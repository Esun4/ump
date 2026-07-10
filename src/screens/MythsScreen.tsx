import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { fonts, useTheme } from '../theme';
import { RULE_MYTHS } from '../data/pregame';

// The things coaches and parents "know" that the rulebook doesn't say —
// each myth paired with the actual call.

export default function MythsScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.lede, { color: theme.subtleText }]}>
        You’ll hear every one of these from a bench eventually. Know the real rule
        before they do.
      </Text>

      {RULE_MYTHS.map((m) => (
        <View
          key={m.myth}
          style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
        >
          <Text style={[styles.mythLabel, { color: theme.wrong }]}>MYTH</Text>
          <Text style={[styles.myth, { color: theme.text }]}>“{m.myth}”</Text>
          <View style={[styles.rulingBlock, { borderTopColor: theme.hairline }]}>
            <Text style={[styles.rulingLabel, { color: theme.correct }]}>THE CALL</Text>
            <Text style={[styles.ruling, { color: theme.text }]}>{m.ruling}</Text>
            <Text style={[styles.detail, { color: theme.subtleText }]}>{m.detail}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  lede: { fontSize: 14.5, lineHeight: 21, marginBottom: 22 },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  mythLabel: {
    fontFamily: fonts.displaySemi,
    fontSize: 13,
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  myth: {
    fontFamily: fonts.displayMedium,
    fontSize: 21,
    lineHeight: 26,
    marginBottom: 13,
  },
  rulingBlock: { borderTopWidth: 1, paddingTop: 12 },
  rulingLabel: {
    fontFamily: fonts.displaySemi,
    fontSize: 13,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  ruling: { fontSize: 15.5, fontWeight: '700', marginBottom: 5 },
  detail: { fontSize: 14, lineHeight: 20 },
});
