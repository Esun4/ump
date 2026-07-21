import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fonts, useTheme } from '../theme';
import { PrimaryButton } from '../ui';
import { useWalkthrough } from './WalkthroughContext';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Breathing room between the highlighted element and the dimmed edge.
const PAD = 6;
// Rough height of the tooltip card — used only to decide whether it fits
// below the spotlight before falling back to above it.
const CARD_ALLOWANCE = 170;
const BAR_HEIGHT = 78;
// Actual height of the Continue button (padding 15 + 15 around a ~20pt line),
// used to stack the tooltip clear of it when the button has been lifted.
const BUTTON_HEIGHT = 54;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function WalkthroughOverlay() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width: screenW, height: screenH } = useWindowDimensions();
  const { active, step, stepIndex, stepCount, next, skip, getTarget, scrollTo, scrollOffset } =
    useWalkthrough();

  const [rect, setRect] = useState<Rect | null>(null);

  const stepId = step?.id;
  const targetKey = step?.target;

  useEffect(() => {
    let cancelled = false;
    // Clear first so the previous step's hole never flashes in the new spot.
    setRect(null);
    if (!active || !targetKey) return;

    const measure = () =>
      new Promise<Rect | null>((resolve) => {
        const node = getTarget(targetKey);
        if (!node) return resolve(null);
        node.measureInWindow((x, y, width, height) => {
          resolve(width > 0 && height > 0 ? { x, y, width, height } : null);
        });
      });

    // The target may still be mounting after a navigation, so retry briefly.
    const measureWithRetry = async () => {
      for (let i = 0; i < 24; i++) {
        if (cancelled) return null;
        const r = await measure();
        if (r) return r;
        await delay(80);
      }
      return null;
    };

    // How far the Home scroller must move to bring the target into the band
    // between the ✕ and the tooltip. Only Home targets live in a ScrollView.
    const scrollDelta = (r: Rect) => {
      if (!targetKey.startsWith('home.')) return 0;
      const top = insets.top + 64;
      const bottom = screenH - insets.bottom - BAR_HEIGHT - CARD_ALLOWANCE;
      if (r.y < top) return r.y - top;
      if (r.y + r.height > bottom) return r.y + r.height - bottom;
      return 0;
    };

    void (async () => {
      await delay(280); // let navigation and layout settle
      let r = await measureWithRetry();
      if (cancelled || !r) return;
      const adjust = scrollDelta(r);
      if (adjust !== 0) {
        scrollTo(Math.max(0, scrollOffset() + adjust));
        await delay(340);
        r = await measureWithRetry();
        if (cancelled || !r) return;
      }
      setRect(r);
    })();

    return () => {
      cancelled = true;
    };
    // Re-run per step; the getters are stable reads off refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, stepId, targetKey, screenH, insets.top, insets.bottom]);

  if (!active || !step) return null;

  const scrim = 'rgba(17, 34, 80, 0.74)'; // navy, matching theme.rule

  // A bottom-anchored target (the tab bar) would sit under the pinned button,
  // so the button lifts to just above the spotlight instead.
  const holeTop = rect ? rect.y - PAD : 0;
  const holeBottom = rect ? rect.y + rect.height + PAD : 0;
  const barLifted = rect !== null && holeBottom > screenH - insets.bottom - BAR_HEIGHT;
  const barOffset = barLifted ? screenH - holeTop + 12 : insets.bottom + 16;

  // Put the tooltip on whichever side of the spotlight has more room, so it
  // can never be pushed off the top or under the button.
  const spaceBelow = rect ? screenH - holeBottom - barOffset - 12 : 0;
  const spaceAbove = rect ? holeTop - insets.top - 52 : 0;
  const cardBelow = rect !== null && spaceBelow >= Math.min(CARD_ALLOWANCE, spaceAbove);

  // Above the hole, the card must also clear the button whenever that has
  // been lifted to sit above the hole too — otherwise they overlap.
  const cardStyle = !rect
    ? { top: Math.max(insets.top + 80, screenH / 2 - 130) }
    : cardBelow
      ? { top: holeBottom + 14 }
      : { bottom: (barLifted ? barOffset + BUTTON_HEIGHT : screenH - holeTop) + 14 };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {rect === null ? (
        // No target (or it never measured): dim everything.
        <View style={[StyleSheet.absoluteFill, { backgroundColor: scrim }]} />
      ) : (
        <>
          {/* Four panels around the target. The gap between them is genuinely
              uncovered, so the highlighted control stays tappable. */}
          <View
            style={[
              styles.scrim,
              { backgroundColor: scrim, top: 0, left: 0, right: 0, height: Math.max(0, rect.y - PAD) },
            ]}
          />
          <View
            style={[
              styles.scrim,
              { backgroundColor: scrim, top: holeBottom, left: 0, right: 0, bottom: 0 },
            ]}
          />
          <View
            style={[
              styles.scrim,
              {
                backgroundColor: scrim,
                top: Math.max(0, rect.y - PAD),
                left: 0,
                width: Math.max(0, rect.x - PAD),
                height: rect.height + PAD * 2,
              },
            ]}
          />
          <View
            style={[
              styles.scrim,
              {
                backgroundColor: scrim,
                top: Math.max(0, rect.y - PAD),
                left: rect.x + rect.width + PAD,
                width: Math.max(0, screenW - (rect.x + rect.width + PAD)),
                height: rect.height + PAD * 2,
              },
            ]}
          />
          {/* Ring around the hole — never intercepts touches. */}
          <View
            pointerEvents="none"
            style={[
              styles.ring,
              {
                borderColor: theme.accent,
                top: rect.y - PAD,
                left: rect.x - PAD,
                width: rect.width + PAD * 2,
                height: rect.height + PAD * 2,
              },
            ]}
          />
        </>
      )}

      <Pressable
        onPress={skip}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Skip walkthrough"
        style={[styles.close, { top: insets.top + 10 }]}
      >
        <Ionicons name="close" size={26} color="#ffffff" />
      </Pressable>

      <View style={[styles.card, cardStyle, { backgroundColor: theme.card, borderColor: theme.rule }]}>
        <Text style={[styles.counter, { color: theme.accentDeep }]}>
          {`STEP ${stepIndex + 1} OF ${stepCount}`}
        </Text>
        <Text style={[styles.title, { color: theme.text }]}>{step.title}</Text>
        <Text style={[styles.body, { color: theme.subtleText }]}>{step.body}</Text>
      </View>

      <View style={[styles.bar, { bottom: barOffset }]}>
        <PrimaryButton theme={theme} label={step.continueLabel ?? 'CONTINUE'} onPress={next} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: { position: 'absolute' },
  ring: { position: 'absolute', borderWidth: 2, borderRadius: 4 },
  close: {
    position: 'absolute',
    right: 16,
    zIndex: 3,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderWidth: 2,
    padding: 18,
    zIndex: 2,
  },
  counter: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.6,
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 26,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  body: { fontFamily: fonts.body, fontSize: 14.5, lineHeight: 21 },
  bar: { position: 'absolute', left: 20, right: 20, zIndex: 2 },
});
