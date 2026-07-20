import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, useTheme } from '../theme';
import { Card, Rule, SectionLabel, rowDivider } from '../ui';
import { PLATE_MEETING } from '../data/pregame';

// A tick-through checklist for the plate umpire's pre-game conference.
// Checks are deliberately ephemeral — every game starts with a clean card.

const TOTAL = PLATE_MEETING.reduce((n, s) => n + s.items.length, 0);

export default function PlateMeetingScreen() {
  const theme = useTheme();
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Rule theme={theme} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.lede, { borderBottomColor: theme.rule }]}>
          <Text style={[styles.ledeText, { color: theme.subtleText }]}>
            Run it from the plate — you are the only speaking voice of the crew.
          </Text>
          <Text style={[styles.count, { color: theme.accent }]}>
            {checked.size}/{TOTAL}
          </Text>
        </View>

        {PLATE_MEETING.map((section) => (
          <View key={section.heading}>
            <SectionLabel theme={theme}>{section.heading}</SectionLabel>
            <Card theme={theme} style={styles.card}>
              {section.items.map((item, i) => {
                const key = `${section.heading}:${item.title}`;
                const done = checked.has(key);
                return (
                  <Pressable
                    key={key}
                    onPress={() => toggle(key)}
                    style={({ pressed }) => [
                      styles.itemRow,
                      rowDivider(theme, i),
                      { backgroundColor: pressed ? theme.accentSoft : theme.card },
                    ]}
                  >
                    <Ionicons
                      name={done ? 'checkmark-circle' : 'ellipse-outline'}
                      size={22}
                      color={done ? theme.accent : theme.border}
                      style={styles.checkIcon}
                    />
                    <View style={styles.itemText}>
                      <Text
                        style={[
                          styles.itemTitle,
                          { color: done ? theme.subtleText : theme.text },
                        ]}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles.itemDetail,
                          { color: done ? theme.faintText : theme.subtleText },
                        ]}
                      >
                        {item.detail}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </Card>
          </View>
        ))}

        <Text style={[styles.footer, { color: theme.faintText }]}>
          Checks clear when you leave this screen — every game starts with a fresh card.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  lede: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    paddingBottom: 16,
    marginBottom: 24,
  },
  ledeText: { flex: 1, fontFamily: fonts.body, fontSize: 14, lineHeight: 21, marginRight: 16 },
  count: {
    fontFamily: fonts.display,
    fontSize: 26,
    lineHeight: 28,
    letterSpacing: -0.8,
    fontVariant: ['tabular-nums'],
  },
  card: { marginBottom: 24 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  checkIcon: { marginRight: 12, marginTop: 1 },
  itemText: { flex: 1 },
  itemTitle: { fontFamily: fonts.bodyBold, fontSize: 14.5, marginBottom: 3 },
  itemDetail: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19 },
  footer: { fontFamily: fonts.body, fontSize: 12, marginTop: 4 },
});
