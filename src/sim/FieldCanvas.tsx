import React, { useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';
import { fonts, Theme } from '../theme';
import {
  DIRT_R,
  FENCE_R,
  FIRST,
  HOME_CIRCLE_R,
  MOUND,
  SECOND,
  THIRD,
  WORLD,
  WORLD_H,
  WORLD_W,
} from './geometry';
import { SimActor, Waypoint } from './types';

// Renders the diamond as SVG (in world units) and floats one animated
// marker per actor above it, all driven by a single master clock that
// counts scenario seconds. Trails are each umpire's full path, drawn
// dashed once the reveal starts.

const toSvgX = (x: number) => x - WORLD.minX;
const toSvgY = (y: number) => WORLD.maxY - y;

// Foul lines meet the fence where the 45° lines hit the arc.
const POLE = FENCE_R / Math.SQRT2;

interface Palette {
  grass: string;
  dirt: string;
  chalk: string;
  faintLine: string;
  fence: string;
  base: string;
}

// Flat and ink-drawn to match the rest of the app: no green grass or
// brown dirt, just tonal greys with ink lines and white bases.
function palette(theme: Theme): Palette {
  return {
    grass: '#f3f2f2',
    dirt: '#e2dfde',
    chalk: theme.rule,
    faintLine: 'rgba(32, 30, 29, 0.22)',
    fence: theme.rule,
    base: '#ffffff',
  };
}

function FieldSurface({ theme }: { theme: Theme }) {
  const p = palette(theme);
  const baseSize = 4;
  const bases = [FIRST, SECOND, THIRD];
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
      pointerEvents="none"
    >
      {/* Fair territory: sector from foul pole to foul pole. */}
      <Path
        d={`M ${toSvgX(0)} ${toSvgY(0)} L ${toSvgX(-POLE)} ${toSvgY(POLE)} A ${FENCE_R} ${FENCE_R} 0 0 1 ${toSvgX(POLE)} ${toSvgY(POLE)} Z`}
        fill={p.grass}
        stroke={p.fence}
        strokeWidth={2.5}
      />
      {/* Skinned infield and the home-plate circle. */}
      <Circle cx={toSvgX(MOUND.x)} cy={toSvgY(MOUND.y)} r={DIRT_R} fill={p.dirt} />
      <Circle cx={toSvgX(0)} cy={toSvgY(0)} r={HOME_CIRCLE_R} fill={p.dirt} />
      {/* Foul lines. */}
      <Line
        x1={toSvgX(0)}
        y1={toSvgY(0)}
        x2={toSvgX(-POLE)}
        y2={toSvgY(POLE)}
        stroke={p.chalk}
        strokeWidth={1.2}
      />
      <Line
        x1={toSvgX(0)}
        y1={toSvgY(0)}
        x2={toSvgX(POLE)}
        y2={toSvgY(POLE)}
        stroke={p.chalk}
        strokeWidth={1.2}
      />
      {/* Base paths between the bases. */}
      <Polyline
        points={[FIRST, SECOND, THIRD]
          .map((b) => `${toSvgX(b.x)},${toSvgY(b.y)}`)
          .join(' ')}
        fill="none"
        stroke={p.faintLine}
        strokeWidth={1.2}
      />
      {/* Mound. */}
      <Circle cx={toSvgX(MOUND.x)} cy={toSvgY(MOUND.y)} r={5} fill={p.grass} opacity={0.55} />
      {/* Bases, squared to the base paths (45° to the viewer). */}
      {bases.map((b, i) => (
        <Rect
          key={i}
          x={toSvgX(b.x) - baseSize / 2}
          y={toSvgY(b.y) - baseSize / 2}
          width={baseSize}
          height={baseSize}
          fill={p.base}
          transform={`rotate(45 ${toSvgX(b.x)} ${toSvgY(b.y)})`}
        />
      ))}
      {/* Home plate. */}
      <Rect
        x={toSvgX(0) - baseSize / 2}
        y={toSvgY(0) - baseSize / 2}
        width={baseSize}
        height={baseSize}
        fill={p.base}
      />
    </Svg>
  );
}

// Waypoint times must be strictly increasing for interpolate();
// holds are authored as repeated positions, so nudge equal times apart.
function monotonic(wps: Waypoint[]): Waypoint[] {
  let last = -Infinity;
  return wps.map((w) => {
    const t = w.t <= last ? last + 0.001 : w.t;
    last = t;
    return { ...w, t };
  });
}

const MARKER: Record<SimActor['kind'], number> = {
  umpire: 21,
  runner: 17,
  fielder: 13,
  ball: 9,
};

function Marker({
  theme,
  actor,
  clock,
  scale,
}: {
  theme: Theme;
  actor: SimActor;
  clock: Animated.Value;
  scale: number; // px per foot
}) {
  const size = MARKER[actor.kind];
  const wps = monotonic(actor.waypoints);
  const px = (w: Waypoint) => toSvgX(w.x) * scale - size / 2;
  const py = (w: Waypoint) => toSvgY(w.y) * scale - size / 2;

  let translateX: Animated.AnimatedInterpolation<number> | number = px(wps[0]);
  let translateY: Animated.AnimatedInterpolation<number> | number = py(wps[0]);
  let markerScale: Animated.AnimatedInterpolation<number> | number = wps[0].s ?? 1;
  if (wps.length > 1) {
    const ts = wps.map((w) => w.t);
    translateX = clock.interpolate({
      inputRange: ts,
      outputRange: wps.map(px),
      extrapolate: 'clamp',
    });
    translateY = clock.interpolate({
      inputRange: ts,
      outputRange: wps.map(py),
      extrapolate: 'clamp',
    });
    markerScale = clock.interpolate({
      inputRange: ts,
      outputRange: wps.map((w) => w.s ?? 1),
      extrapolate: 'clamp',
    });
  }

  let shape: React.ReactNode;
  if (actor.kind === 'ball') {
    shape = (
      <View
        style={[
          styles.ball,
          {
            width: size,
            height: size,
            backgroundColor: '#ffffff',
            borderColor: theme.accent,
          },
        ]}
      />
    );
  } else if (actor.kind === 'umpire') {
    shape = (
      <View
        style={[
          styles.umpire,
          {
            width: size,
            height: size,
            backgroundColor: actor.quizzed ? theme.accent : theme.card,
            borderColor: actor.quizzed ? theme.accent : theme.rule,
          },
        ]}
      >
        <Text
          style={[
            styles.umpireLabel,
            { color: actor.quizzed ? theme.onPrimary : theme.text },
          ]}
        >
          {actor.label}
        </Text>
      </View>
    );
  } else if (actor.kind === 'runner') {
    shape = (
      <View
        style={[
          styles.runner,
          {
            width: size,
            height: size,
            backgroundColor: theme.text,
          },
        ]}
      >
        <Text style={[styles.runnerLabel, { color: theme.card }]}>
          {actor.label}
        </Text>
      </View>
    );
  } else {
    shape = (
      <View
        style={[
          styles.fielder,
          { width: size, height: size, borderColor: theme.faintText },
        ]}
      >
        <Text style={[styles.fielderLabel, { color: theme.faintText }]}>
          {actor.label}
        </Text>
      </View>
    );
  }

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.marker,
        {
          transform: [{ translateX }, { translateY }, { scale: markerScale }],
          zIndex: actor.kind === 'ball' ? 4 : actor.kind === 'umpire' ? 3 : 2,
        },
      ]}
    >
      {shape}
    </Animated.View>
  );
}

export default function FieldCanvas({
  theme,
  actors,
  clock,
  showTrails,
}: {
  theme: Theme;
  actors: SimActor[];
  clock: Animated.Value;
  showTrails: boolean;
}) {
  const [width, setWidth] = useState(0);
  const scale = width / WORLD_W;

  return (
    <View
      style={{ width: '100%', aspectRatio: WORLD_W / WORLD_H }}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <FieldSurface theme={theme} />
      {showTrails && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Svg width="100%" height="100%" viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}>
            {actors
              .filter((a) => a.kind === 'umpire' && a.waypoints.length > 1)
              .map((a) => (
                <Polyline
                  key={a.id}
                  points={a.waypoints
                    .map((w) => `${toSvgX(w.x)},${toSvgY(w.y)}`)
                    .join(' ')}
                  fill="none"
                  stroke={a.quizzed ? theme.accent : theme.text}
                  strokeWidth={a.quizzed ? 1.6 : 1.1}
                  strokeDasharray="3 3"
                  opacity={a.quizzed ? 0.95 : 0.4}
                />
              ))}
          </Svg>
        </View>
      )}
      {width > 0 &&
        actors.map((a) => (
          <Marker key={a.id} theme={theme} actor={a} clock={clock} scale={scale} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  ball: {
    borderRadius: 999,
    borderWidth: 1.5,
  },
  umpire: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  umpireLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 0.2,
  },
  runner: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  runnerLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
  },
  fielder: {
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fielderLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 7,
  },
});
