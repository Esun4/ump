import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ScrollView, View } from 'react-native';
import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { loadWalkthroughSeen, setWalkthroughSeen } from '../srs/storage';
import { STEPS, StepDestination, TargetKey, WalkthroughStep } from './steps';

interface WalkthroughValue {
  active: boolean;
  step: WalkthroughStep | null;
  stepIndex: number;
  stepCount: number;
  start: () => void;
  next: () => void;
  skip: () => void;
  registerTarget: (key: TargetKey, node: View | null) => void;
  getTarget: (key: TargetKey) => View | null;
  registerScroller: (node: ScrollView | null) => void;
  scrollTo: (y: number) => void;
  noteScrollOffset: (y: number) => void;
  scrollOffset: () => number;
}

const noop = () => {};

const WalkthroughContext = createContext<WalkthroughValue>({
  active: false,
  step: null,
  stepIndex: 0,
  stepCount: STEPS.length,
  start: noop,
  next: noop,
  skip: noop,
  registerTarget: noop,
  getTarget: () => null,
  registerScroller: noop,
  scrollTo: noop,
  noteScrollOffset: noop,
  scrollOffset: () => 0,
});

export function WalkthroughProvider({
  navigationRef,
  children,
}: {
  navigationRef: NavigationContainerRef<RootStackParamList>;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Targets and the scroller are refs, not state: registering a node must not
  // re-render every screen. The overlay polls for what it needs instead.
  const targets = useRef(new Map<TargetKey, View>());
  const scroller = useRef<ScrollView | null>(null);
  const offset = useRef(0);

  const step = active ? (STEPS[stepIndex] ?? null) : null;

  const goTo = useCallback(
    (dest: StepDestination) => {
      if (!navigationRef.isReady()) return;
      // 'Home' means the Home tab specifically — this also pops Library off
      // the stack and switches tabs if the user started from Settings.
      if (dest === 'Home') navigationRef.navigate('Tabs', { screen: 'Home' });
      else navigationRef.navigate('Library');
    },
    [navigationRef],
  );

  const finish = useCallback(() => {
    setActive(false);
    setStepIndex(0);
    void setWalkthroughSeen();
  }, []);

  const start = useCallback(() => {
    setStepIndex(0);
    setActive(true);
    goTo('Home');
  }, [goTo]);

  const next = useCallback(() => {
    if (stepIndex >= STEPS.length - 1) {
      finish();
      return;
    }
    setStepIndex(stepIndex + 1);
  }, [stepIndex, finish]);

  const skip = useCallback(() => {
    goTo('Home');
    finish();
  }, [finish, goTo]);

  // First run: auto-start once, only if the tour has never been finished.
  useEffect(() => {
    let cancelled = false;
    void loadWalkthroughSeen().then((seen) => {
      if (!cancelled && !seen) setActive(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Drive navigation for whichever step is showing.
  useEffect(() => {
    if (step?.goTo) goTo(step.goTo);
  }, [step?.id, step?.goTo, goTo]);

  // These must keep a stable identity: screens pass them straight to `ref`,
  // and a changing callback would detach and re-register every target on
  // each step. They only ever read or write refs, so they never need deps.
  const registerTarget = useCallback((key: TargetKey, node: View | null) => {
    if (node) targets.current.set(key, node);
    else targets.current.delete(key);
  }, []);
  const getTarget = useCallback((key: TargetKey) => targets.current.get(key) ?? null, []);
  const registerScroller = useCallback((node: ScrollView | null) => {
    scroller.current = node;
  }, []);
  const scrollTo = useCallback((y: number) => {
    scroller.current?.scrollTo({ y, animated: true });
  }, []);
  const noteScrollOffset = useCallback((y: number) => {
    offset.current = y;
  }, []);
  const scrollOffset = useCallback(() => offset.current, []);

  const value = useMemo<WalkthroughValue>(
    () => ({
      active,
      step,
      stepIndex,
      stepCount: STEPS.length,
      start,
      next,
      skip,
      registerTarget,
      getTarget,
      registerScroller,
      scrollTo,
      noteScrollOffset,
      scrollOffset,
    }),
    [
      active,
      step,
      stepIndex,
      start,
      next,
      skip,
      registerTarget,
      getTarget,
      registerScroller,
      scrollTo,
      noteScrollOffset,
      scrollOffset,
    ],
  );

  return (
    <WalkthroughContext.Provider value={value}>{children}</WalkthroughContext.Provider>
  );
}

export function useWalkthrough(): WalkthroughValue {
  return useContext(WalkthroughContext);
}
