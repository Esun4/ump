import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { fonts, useTheme } from '../theme';
import { PrimaryButton, Rule, SectionLabel } from '../ui';
import { scenariosForCrew } from '../sim/scenarios60';
import { SimCrew, SimScenario } from '../sim/types';

// Simulator hub: pick a crew, start a shuffled run, or open one play
// from the library for targeted review.

type Props = NativeStackScreenProps<RootStackParamList, 'Simulator'>;

const CREWS: { key: SimCrew; label: string; note: string }[] = [
  { key: 'two', label: '2-MAN', note: 'Regular season' },
  { key: 'four', label: '4-MAN', note: 'Districts & tournaments' },
];

export default function SimulatorScreen({ navigation }: Props) {
  const theme = useTheme();
  const [crew, setCrew] = useState<SimCrew>('two');

  const groups = useMemo(() => {
    const bank = scenariosForCrew(crew);
    const byGroup = new Map<string, SimScenario[]>();
    bank.forEach((s) => {
      byGroup.set(s.group, [...(byGroup.get(s.group) ?? []), s]);
    });
    return [...byGroup.entries()];
  }, [crew]);

  const count = groups.reduce((n, [, list]) => n + list.length, 0);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Rule theme={theme} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.lede, { color: theme.subtleText }]}>
          Watch the play develop, commit to your move or your call, then see the
          whole crew’s correct paths. 60-foot diamond.
        </Text>

        <View style={[styles.toggle, { borderColor: theme.rule }]}>
          {CREWS.map((c, i) => {
            const active = crew === c.key;
            return (
              <Pressable
                key={c.key}
                onPress={() => setCrew(c.key)}
                style={[
                  styles.toggleHalf,
                  i > 0 && { borderLeftWidth: 2, borderLeftColor: theme.rule },
                  active && { backgroundColor: theme.accentSoft },
                ]}
              >
                <Text
                  style={[
                    styles.toggleLabel,
                    { color: active ? theme.accentDeep : theme.subtleText },
                  ]}
                >
                  {c.label}
                </Text>
                <Text
                  style={[
                    styles.toggleNote,
                    { color: active ? theme.subtleText : theme.faintText },
                  ]}
                >
                  {c.note}
                </Text>
                {/* The active cell is underscored by a claret bar inset
                    along its bottom edge. */}
                {active && (
                  <View style={[styles.toggleBar, { backgroundColor: theme.accent }]} />
                )}
              </Pressable>
            );
          })}
        </View>

        <PrimaryButton
          theme={theme}
          label={`START RUN · ${count} PLAYS`}
          onPress={() => navigation.navigate('SimPlay', { crew })}
          style={styles.startButton}
        />

        {groups.map(([group, list]) => (
          <View key={group}>
            <SectionLabel theme={theme}>{group}</SectionLabel>
            {list.map((s) => (
              <Pressable
                key={s.id}
                onPress={() => navigation.navigate('SimPlay', { crew, scenarioId: s.id })}
                style={({ pressed }) => [
                  styles.row,
                  {
                    backgroundColor: pressed ? theme.accentSoft : theme.card,
                    borderColor: theme.border,
                  },
                ]}
              >
                <View style={styles.rowText}>
                  <Text style={[styles.rowTitle, { color: theme.text }]}>{s.title}</Text>
                  <Text style={[styles.rowSub, { color: theme.subtleText }]}>
                    {`You are ${s.seat} · ${s.kind === 'mechanics' ? 'make the move' : 'make the call'}`}
                  </Text>
                </View>
                <Ionicons
                  name={s.kind === 'mechanics' ? 'walk-outline' : 'hand-left-outline'}
                  size={17}
                  color={theme.faintText}
                />
              </Pressable>
            ))}
            <View style={styles.groupGap} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  lede: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, marginBottom: 18 },
  toggle: {
    flexDirection: 'row',
    borderWidth: 2,
  },
  toggleHalf: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
  },
  toggleLabel: {
    fontFamily: fonts.display,
    fontSize: 22,
    letterSpacing: -0.4,
  },
  toggleNote: { fontFamily: fonts.body, fontSize: 11.5, marginTop: 2 },
  toggleBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 3,
  },
  startButton: { marginTop: 18, marginBottom: 26 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  rowText: { flex: 1, marginRight: 10 },
  rowTitle: { fontFamily: fonts.bodyBold, fontSize: 14.5, marginBottom: 2 },
  rowSub: { fontFamily: fonts.body, fontSize: 12.5 },
  groupGap: { height: 14 },
});
