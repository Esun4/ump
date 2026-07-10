import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { fonts, Theme, useTheme } from '../theme';
import { Chip, SectionLabel } from '../ui';
import {
  COVERAGE_GLOSSARY,
  COVERAGE_SECTIONS,
  CrewPosition,
  GOING_OUT,
} from '../data/pregame';

// The district crew card, as a screen: routine plays, then trouble balls
// split by NRiSP / RiSP, with who rotates where. 60-ft 4-umpire system.

function UmpBadge({ theme, umpire }: { theme: Theme; umpire: CrewPosition }) {
  return (
    <View style={[styles.umpBadge, { backgroundColor: theme.accentSoft }]}>
      <Text style={[styles.umpBadgeText, { color: theme.accent }]}>{umpire}</Text>
    </View>
  );
}

function DutyRow({
  theme,
  umpire,
  duty,
  first,
}: {
  theme: Theme;
  umpire: CrewPosition;
  duty: string;
  first: boolean;
}) {
  return (
    <View
      style={[
        styles.dutyRow,
        !first && { borderTopWidth: 1, borderTopColor: theme.hairline },
      ]}
    >
      <UmpBadge theme={theme} umpire={umpire} />
      <Text style={[styles.dutyText, { color: theme.text }]}>{duty}</Text>
    </View>
  );
}

export default function CoverageScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <Chip theme={theme}>4-Umpire · 60-ft Diamond</Chip>
      <Text style={[styles.lede, { color: theme.subtleText }]}>
        Read the ball, read your partners, respond. Priorities in order: fair/foul,
        catch/no-catch, everything else.
      </Text>

      <SectionLabel theme={theme}>{GOING_OUT.heading}</SectionLabel>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.cardIntro, { color: theme.subtleText }]}>
          {GOING_OUT.intro}
        </Text>
        {GOING_OUT.aor.map((d, i) => (
          <DutyRow key={d.umpire} theme={theme} umpire={d.umpire} duty={d.duty} first={i === 0} />
        ))}
        <View style={[styles.threeFs, { borderTopColor: theme.hairline }]}>
          {GOING_OUT.threeFs.map((f) => (
            <Text key={f.label} style={[styles.threeFsLine, { color: theme.subtleText }]}>
              <Text style={[styles.threeFsLabel, { color: theme.accent }]}>
                {f.label.toUpperCase()}
              </Text>
              {`  ${f.detail}`}
            </Text>
          ))}
        </View>
        <Text style={[styles.note, { color: theme.faintText }]}>{GOING_OUT.note}</Text>
      </View>

      {COVERAGE_SECTIONS.map((section) => (
        <View key={section.heading}>
          <View style={styles.sectionHeader}>
            <SectionLabel theme={theme}>{section.heading}</SectionLabel>
            <Text style={[styles.situation, { color: theme.accent }]}>
              {section.situation.toUpperCase()}
            </Text>
          </View>
          {section.intro && (
            <Text style={[styles.sectionIntro, { color: theme.subtleText }]}>
              {section.intro}
            </Text>
          )}
          {section.blocks.map((block) => (
            <View
              key={block.title}
              style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <View style={styles.blockHeader}>
                <Text style={[styles.blockTitle, { color: theme.text }]}>{block.title}</Text>
                {block.rotation && (
                  <View style={[styles.rotationPill, { borderColor: theme.accent }]}>
                    <Text style={[styles.rotationText, { color: theme.accent }]}>
                      {block.rotation.toUpperCase()}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={[styles.cardIntro, { color: theme.subtleText }]}>
                {block.summary}
              </Text>
              {block.duties.map((d, i) => (
                <DutyRow
                  key={d.umpire}
                  theme={theme}
                  umpire={d.umpire}
                  duty={d.duty}
                  first={i === 0}
                />
              ))}
            </View>
          ))}
        </View>
      ))}

      <SectionLabel theme={theme}>Shorthand</SectionLabel>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        {COVERAGE_GLOSSARY.map((g, i) => (
          <View
            key={g.term}
            style={[
              styles.glossaryRow,
              i > 0 && { borderTopWidth: 1, borderTopColor: theme.hairline },
            ]}
          >
            <Text style={[styles.glossaryTerm, { color: theme.accent }]}>{g.term}</Text>
            <Text style={[styles.glossaryMeaning, { color: theme.subtleText }]}>
              {g.meaning}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  lede: { fontSize: 14.5, lineHeight: 21, marginTop: 12, marginBottom: 26 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  situation: {
    fontFamily: fonts.displaySemi,
    fontSize: 13,
    letterSpacing: 1,
    marginBottom: 10,
  },
  sectionIntro: { fontSize: 14, lineHeight: 20, marginBottom: 12, marginTop: -2 },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 22,
  },
  cardIntro: { fontSize: 14, lineHeight: 20, marginBottom: 10 },
  blockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  blockTitle: { fontSize: 16, fontWeight: '700', flexShrink: 1, marginRight: 10 },
  rotationPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 2,
  },
  rotationText: {
    fontFamily: fonts.displaySemi,
    fontSize: 12,
    letterSpacing: 1,
  },
  dutyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 11,
  },
  umpBadge: {
    width: 34,
    borderRadius: 8,
    paddingVertical: 3,
    alignItems: 'center',
    marginRight: 12,
    marginTop: 1,
  },
  umpBadgeText: {
    fontFamily: fonts.displaySemi,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  dutyText: { flex: 1, fontSize: 14.5, lineHeight: 20.5 },
  threeFs: { borderTopWidth: 1, paddingTop: 12, marginTop: 2 },
  threeFsLine: { fontSize: 14, lineHeight: 22 },
  threeFsLabel: {
    fontFamily: fonts.displaySemi,
    fontSize: 13.5,
    letterSpacing: 0.8,
  },
  note: { fontSize: 13, lineHeight: 18, marginTop: 10 },
  glossaryRow: { flexDirection: 'row', paddingVertical: 9, alignItems: 'baseline' },
  glossaryTerm: {
    fontFamily: fonts.displaySemi,
    fontSize: 14.5,
    letterSpacing: 0.4,
    width: 104,
  },
  glossaryMeaning: { flex: 1, fontSize: 13.5, lineHeight: 18 },
});
