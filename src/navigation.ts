import { NavigatorScreenParams } from '@react-navigation/native';
import { SimCrew } from './sim/types';

export type QuizMode = 'session' | 'practice';

// Practice runs can be narrowed three ways, all mutually exclusive:
// a topic, the user's trouble spots, or their bookmarks. SRS sessions
// always run the whole bank.
export type PracticeFilter = 'trouble' | 'bookmarks';

export type RootStackParamList = {
  // Nested params so the walkthrough can send the user to a specific tab,
  // not just back to the tab stack.
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  Quiz: { mode: QuizMode; topic?: string; filter?: PracticeFilter };
  Topics: undefined;
  Library: undefined;
  Coverage: undefined;
  PlateMeeting: undefined;
  Myths: undefined;
  // A run of shuffled plays for the crew, one play from the library, or a
  // run of just the plays the user last got wrong.
  SimPlay: { crew: SimCrew; scenarioId?: string; missed?: boolean };
};

export type TabParamList = {
  Home: undefined;
  Field: undefined;
  Stats: undefined;
  Settings: undefined;
};
