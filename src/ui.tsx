import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, Theme } from './theme';

// Shared pieces of the visual language: eyebrow labels, tags, the ink
// rules that carry the layout, bordered card groups, the primary action
// button, and the answer/feedback pair the quiz and simulator share.

export function SectionLabel({ theme, children }: { theme: Theme; children: string }) {
  return (
    <Text style={[styles.sectionLabel, { color: theme.subtleText }]}>
      {children.toUpperCase()}
    </Text>
  );
}

export function Chip({ theme, children }: { theme: Theme; children: string }) {
  return (
    <View style={[styles.chip, { backgroundColor: theme.accentSoft }]}>
      <Text numberOfLines={1} style={[styles.chipText, { color: theme.accentDeep }]}>
        {children.toUpperCase()}
      </Text>
    </View>
  );
}

// The heavy rule that closes a screen header or splits major sections.
export function Rule({ theme, style }: { theme: Theme; style?: ViewStyle }) {
  return <View style={[styles.rule, { backgroundColor: theme.rule }, style]} />;
}

// A bordered group: 1px frame, square corners, rows divided by hairlines.
export function Card({
  theme,
  children,
  style,
}: {
  theme: Theme;
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }, style]}
    >
      {children}
    </View>
  );
}

// Divider between rows inside a Card — every row after the first.
export function rowDivider(theme: Theme, index: number): ViewStyle | false {
  return index > 0 && { borderTopWidth: 1, borderTopColor: theme.hairline };
}

export function PrimaryButton({
  theme,
  label,
  onPress,
  disabled,
  style,
}: {
  theme: Theme;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        {
          backgroundColor: pressed ? theme.primaryPressed : theme.primary,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text style={[styles.primaryLabel, { color: theme.onPrimary }]}>{label}</Text>
      <Ionicons name="arrow-forward" size={17} color={theme.onPrimary} />
    </Pressable>
  );
}

export function NavRow({
  theme,
  icon,
  title,
  subtitle,
  tag,
  first,
  onPress,
}: {
  theme: Theme;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  // A claret count tag replaces the chevron when there's a number to show.
  tag?: string;
  first?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.navRow,
        !first && { borderTopWidth: 1, borderTopColor: theme.hairline },
        { backgroundColor: pressed ? theme.accentSoft : theme.card },
      ]}
    >
      <Ionicons name={icon} size={19} color={theme.accent} style={styles.navIcon} />
      <View style={styles.navText}>
        <Text style={[styles.navTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.navSubtitle, { color: theme.subtleText }]} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      {tag ? (
        <View style={[styles.countTag, { backgroundColor: theme.accentSoft }]}>
          <Text style={[styles.countTagText, { color: theme.accentDeep }]}>{tag}</Text>
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={17} color={theme.faintText} />
      )}
    </Pressable>
  );
}

export type OptionState = 'idle' | 'correct' | 'wrong' | 'dimmed';

// One answer row. Unanswered rows carry an outlined square letter badge;
// once answered the right one goes green with a check, the chosen wrong
// one goes claret, and everything else dims out of the way.
export function OptionRow({
  theme,
  letter,
  text,
  state,
  disabled,
  onPress,
}: {
  theme: Theme;
  letter: string;
  text: string;
  state: OptionState;
  disabled: boolean;
  onPress: () => void;
}) {
  let bg = theme.card;
  let border = theme.border;
  let color = theme.text;
  let badgeBg = 'transparent';
  let badgeBorder = theme.border;
  let badgeColor = theme.subtleText;
  if (state === 'correct') {
    bg = theme.correctBg;
    border = theme.correct;
    color = theme.correctText;
    badgeBg = theme.correct;
    badgeBorder = theme.correct;
    badgeColor = '#ffffff';
  } else if (state === 'wrong') {
    bg = theme.wrongBg;
    border = theme.wrong;
    color = theme.wrong;
    badgeBg = theme.wrong;
    badgeBorder = theme.wrong;
    badgeColor = '#ffffff';
  }

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        {
          backgroundColor: pressed && !disabled ? theme.accentSoft : bg,
          borderColor: border,
          opacity: state === 'dimmed' ? 0.55 : 1,
        },
      ]}
    >
      <View style={[styles.badge, { backgroundColor: badgeBg, borderColor: badgeBorder }]}>
        {state === 'correct' ? (
          <Ionicons name="checkmark" size={18} color={badgeColor} />
        ) : (
          <Text style={[styles.badgeText, { color: badgeColor }]}>{letter}</Text>
        )}
      </View>
      <Text
        style={[
          styles.optionText,
          { color, fontFamily: state === 'correct' ? fonts.bodyMedium : fonts.body },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

// The verdict panel: a 3px accent bar down the left of a tinted block,
// eyebrow title, then the explanation and whatever notes follow.
export function FeedbackPanel({
  theme,
  correct,
  title,
  children,
  style,
}: {
  theme: Theme;
  correct: boolean;
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View
      style={[
        styles.feedback,
        {
          backgroundColor: correct ? theme.correctPanel : theme.wrongBg,
          borderLeftColor: correct ? theme.correct : theme.wrong,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.feedbackTitle,
          { color: correct ? theme.correctText : theme.accentDeep },
        ]}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 1.7,
    marginBottom: 12,
  },
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  chipText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 0.8,
  },
  rule: { height: 2 },
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  primaryButton: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  primaryLabel: {
    flex: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    letterSpacing: 0.6,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  navIcon: { marginRight: 12 },
  navText: { flex: 1, marginRight: 10 },
  navTitle: { fontFamily: fonts.bodyBold, fontSize: 14.5, marginBottom: 2 },
  navSubtitle: { fontFamily: fonts.body, fontSize: 12.5 },
  countTag: {
    minWidth: 24,
    paddingHorizontal: 7,
    paddingVertical: 3,
    alignItems: 'center',
  },
  countTagText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    fontVariant: ['tabular-nums'],
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    paddingVertical: 13,
    paddingHorizontal: 14,
    marginBottom: 9,
  },
  badge: {
    width: 29,
    height: 29,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  badgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
  },
  optionText: { fontSize: 14.5, lineHeight: 21, flex: 1 },
  feedback: {
    borderLeftWidth: 3,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginTop: 10,
  },
  feedbackTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    letterSpacing: 0.85,
    marginBottom: 8,
  },
});
