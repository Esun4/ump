export type QuizMode = 'session' | 'practice';

export type RootStackParamList = {
  Tabs: undefined;
  // topic narrows a practice run to one topic of the active ruleset; it is
  // never set for SRS sessions.
  Quiz: { mode: QuizMode; topic?: string };
  Topics: undefined;
};

export type TabParamList = {
  Home: undefined;
  Stats: undefined;
  Settings: undefined;
};
