import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, useTheme } from '../theme';
import { SectionLabel } from '../ui';
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
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.lede}>
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
          <View
            style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            {section.items.map((item, i) => {
              const key = `${section.heading}:${item.title}`;
              const done = checked.has(key);
              return (
                <Pressable
                  key={key}
                  onPress={() => toggle(key)}
                  style={[
                    styles.itemRow,
                    i > 0 && { borderTopWidth: 1, borderTopColor: theme.hairline },
                  ]}
                >
                  <Ionicons
                    name={done ? 'checkmark-circle' : 'ellipse-outline'}
                    size={22}
                    color={done ? theme.accent : theme.faintText}
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
          </View>
        </View>
      ))}

      <Text style={[styles.footer, { color: theme.faintText }]}>
        Checks clear when you leave this screen — every game starts with a fresh card.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  lede: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  ledeText: { flex: 1, fontSize: 14.5, lineHeight: 21, marginRight: 16 },
  count: {
    fontFamily: fonts.display,
    fontSize: 26,
    lineHeight: 28,
    fontVariant: ['tabular-nums'],
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  itemRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 13 },
  checkIcon: { marginRight: 12, marginTop: 1 },
  itemText: { flex: 1 },
  itemTitle: { fontSize: 15.5, fontWeight: '600', marginBottom: 3 },
  itemDetail: { fontSize: 13.5, lineHeight: 19 },
  footer: { fontSize: 12.5, textAlign: 'center', marginTop: 4 },
});
