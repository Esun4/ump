import { useCallback } from 'react';
import { View } from 'react-native';
import { TargetKey } from './steps';
import { useWalkthrough } from './WalkthroughContext';

/**
 * Marks a View as a spotlight target. Spread the result onto any host View:
 *
 *   <View {...useWalkthroughTarget('home.hero')}>…</View>
 *
 * Registration is a plain ref callback, so it costs nothing when the tour
 * isn't running and cleans itself up on unmount.
 */
export function useWalkthroughTarget(key: TargetKey): { ref: (node: View | null) => void } {
  const { registerTarget } = useWalkthrough();
  const ref = useCallback(
    (node: View | null) => registerTarget(key, node),
    [key, registerTarget],
  );
  return { ref };
}
