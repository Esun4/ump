import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useTheme } from '../theme';
import { useRuleset } from '../state/RulesetContext';
import { RulesetId } from '../types';
import { SectionLabel } from '../ui';

type Props = NativeStackScreenProps<RootStackParamList, 'Library'>;

// Display names are scoped to their group so rows don't repeat the
// group heading.
const GROUPS: {
  heading: string;
  items: { id: RulesetId; title: string; detail: string }[];
}[] = [
  {
    heading: 'Rulebooks',
    items: [
      { id: 'obr', title: 'Baseball Canada / OBR', detail: 'District & Provincial' },
      { id: 'll', title: 'Little League', detail: 'Majors & Intermediate+' },
    ],
  },
  {
    heading: '4-Umpire Mechanics',
    items: [
      { id: 'mech60', title: '60-ft Diamond', detail: 'Minor & Major crews' },
      { id: 'mechBig', title: '50/70 & 90-ft', detail: 'Intermediate and up' },
    ],
  },
  {
    heading: 'District Interlock',
    items: [
      { id: 'interlock60', title: 'Minor / Major', detail: '60-ft diamond' },
      { id: 'interlockBig', title: 'Junior / Senior', detail: '90-ft diamond' },
    ],
  },
  {
    heading: 'Crew Work',
    items: [
      { id: 'signals', title: 'Signals & Communication', detail: 'All crews' },
    ],
  },
];

export default function LibraryScreen({ navigation }: Props) {
  const theme = useTheme();
  const { ruleset, setRuleset } = useRuleset();

  const choose = (id: RulesetId) => {
    setRuleset(id);
    navigation.goBack();
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.lede, { color: theme.subtleText }]}>
        Pick the bank you're training on. Each keeps its own schedule and stats.
      </Text>

      {GROUPS.map((group) => (
        <View key={group.heading} style={styles.group}>
          <SectionLabel theme={theme}>{group.heading}</SectionLabel>
          <View
            style={[
              styles.groupCard,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            {group.items.map((item, i) => {
              const active = item.id === ruleset;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => choose(item.id)}
                  style={({ pressed }) => [
                    styles.row,
                    i > 0 && { borderTopWidth: 1, borderTopColor: theme.hairline },
                    pressed && { backgroundColor: theme.cardRaised },
                  ]}
                >
                  <View style={styles.rowText}>
                    <Text
                      style={[
                        styles.rowTitle,
                        { color: active ? theme.accent : theme.text },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text style={[styles.rowDetail, { color: theme.subtleText }]}>
                      {item.detail}
                    </Text>
                  </View>
                  {active ? (
                    <Ionicons name="checkmark-circle" size={22} color={theme.accent} />
                  ) : (
                    <View style={[styles.radio, { borderColor: theme.border }]} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  lede: { fontSize: 14, lineHeight: 20, marginBottom: 24 },
  group: { marginBottom: 24 },
  groupCard: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowText: { flex: 1, marginRight: 12 },
  rowTitle: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  rowDetail: { fontSize: 13 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
  },
});
