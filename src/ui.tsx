import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, Theme } from './theme';

// Shared pieces of the visual language: section eyebrows, chips,
// navigation rows, and the primary action button.

export function SectionLabel({ theme, children }: { theme: Theme; children: string }) {
  return (
    <Text style={[styles.sectionLabel, { color: theme.faintText }]}>
      {children.toUpperCase()}
    </Text>
  );
}

export function Chip({ theme, children }: { theme: Theme; children: string }) {
  return (
    <View style={[styles.chip, { backgroundColor: theme.accentSoft }]}>
      <Text numberOfLines={1} style={[styles.chipText, { color: theme.accent }]}>
        {children.toUpperCase()}
      </Text>
    </View>
  );
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
  style?: ViewStyle;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        { backgroundColor: theme.primary, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style,
      ]}
    >
      <Text style={[styles.primaryLabel, { color: theme.onPrimary }]}>{label}</Text>
    </Pressable>
  );
}

export function NavRow({
  theme,
  icon,
  title,
  subtitle,
  onPress,
}: {
  theme: Theme;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.navRow,
        {
          backgroundColor: pressed ? theme.cardRaised : theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={[styles.navIcon, { backgroundColor: theme.accentSoft }]}>
        <Ionicons name={icon} size={18} color={theme.accent} />
      </View>
      <View style={styles.navText}>
        <Text style={[styles.navTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.navSubtitle, { color: theme.subtleText }]} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={theme.faintText} />
    </Pressable>
  );
}

// A faint baseball-diamond outline used as quiet decoration on hero cards.
export function DiamondMotif({ theme, size = 120 }: { theme: Theme; size?: number }) {
  const inner = size / Math.SQRT2;
  return (
    <View pointerEvents="none" style={[styles.diamondBox, { width: size, height: size }]}>
      <View
        style={{
          width: inner,
          height: inner,
          borderWidth: 1.5,
          borderColor: theme.accent,
          opacity: 0.18,
          borderRadius: 6,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  chipText: {
    fontFamily: fonts.displaySemi,
    fontSize: 13,
    letterSpacing: 1,
  },
  primaryButton: {
    alignSelf: 'stretch',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryLabel: {
    fontFamily: fonts.displaySemi,
    fontSize: 19,
    letterSpacing: 1.2,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  navIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  navText: { flex: 1, marginRight: 8 },
  navTitle: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  navSubtitle: { fontSize: 13 },
  diamondBox: {
    position: 'absolute',
    right: -28,
    top: -28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
