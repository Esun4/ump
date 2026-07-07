export type QuizMode = 'session' | 'practice';

export type RootStackParamList = {
  Tabs: undefined;
  Quiz: { mode: QuizMode };
};

export type TabParamList = {
  Home: undefined;
  Stats: undefined;
  Settings: undefined;
};
