export type QuizMode = 'session' | 'practice';

// Practice runs can be narrowed three ways, all mutually exclusive:
// a topic, the user's trouble spots, or their bookmarks. SRS sessions
// always run the whole bank.
export type PracticeFilter = 'trouble' | 'bookmarks';

export type RootStackParamList = {
  Tabs: undefined;
  Quiz: { mode: QuizMode; topic?: string; filter?: PracticeFilter };
  Topics: undefined;
  Library: undefined;
  Coverage: undefined;
  PlateMeeting: undefined;
  Myths: undefined;
};

export type TabParamList = {
  Home: undefined;
  Stats: undefined;
  Settings: undefined;
};
