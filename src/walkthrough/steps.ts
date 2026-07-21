// The first-run tour, declared in one place. Screens only register where
// their targets are (see useWalkthroughTarget) — none of the step order or
// copy lives in a screen.

// Keys screens register a measurable View under. A step whose target never
// registers falls back to a centred card, so adding a step here can't wedge
// the tour.
export type TargetKey =
  | 'home.hero'
  | 'home.train'
  | 'home.featured'
  | 'home.gameday'
  | 'app.tabs';

// Where the tour sends the user before showing a step. 'Home' pops back to
// the tab stack; 'Library' pushes the bank picker.
export type StepDestination = 'Home' | 'Library';

export interface WalkthroughStep {
  id: string;
  title: string;
  body: string;
  target?: TargetKey;
  goTo?: StepDestination;
  // Hands the whole screen to the user: nothing is dimmed or cut out, so they
  // can scroll the real list and tap anything. Used where a spotlight would
  // have to cover the entire screen anyway (the bank list). The step card
  // docks above the button instead of chasing a target.
  explore?: boolean;
  // Step 2 only: picking a bank advances the tour on its own, so Continue
  // reads as "keep the default" rather than "skip".
  advanceOnRulesetChange?: boolean;
  continueLabel?: string;
}

export const STEPS: WalkthroughStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to UMP',
    body: 'Scenario drills for umpires. Here’s the quick tour — about a minute.',
    goTo: 'Home',
    continueLabel: 'START TOUR',
  },
  {
    id: 'bank',
    title: 'Pick your bank',
    body: 'Everything you drill comes from one bank. Scroll the list and tap one to switch, or keep Little League.',
    goTo: 'Library',
    explore: true,
    advanceOnRulesetChange: true,
    continueLabel: 'KEEP LITTLE LEAGUE',
  },
  {
    id: 'session',
    title: 'Your daily session',
    body: 'Reviews that are due, plus a few new ones. Miss a question and it comes back sooner.',
    goTo: 'Home',
    target: 'home.hero',
  },
  {
    id: 'train',
    title: 'Drill on your own',
    body: 'Practice a topic, clear trouble spots, revisit bookmarks — none of it touches your schedule. Swap banks anytime under Question Bank.',
    goTo: 'Home',
    target: 'home.train',
  },
  {
    id: 'featured',
    title: 'Play of the day',
    body: 'One animated play each day: make the call, or make the move.',
    goTo: 'Home',
    target: 'home.featured',
  },
  {
    id: 'gameday',
    title: 'On the field',
    body: 'Your plate meeting checklist and the rule myths, for quick checks between innings.',
    goTo: 'Home',
    target: 'home.gameday',
  },
  {
    id: 'tabs',
    title: 'Sim and Stats',
    body: 'The full play simulator, and your accuracy broken down by topic.',
    goTo: 'Home',
    target: 'app.tabs',
  },
  {
    id: 'done',
    title: 'You’re set',
    body: 'Replay this walkthrough anytime from Settings.',
    goTo: 'Home',
    continueLabel: 'DONE',
  },
];
