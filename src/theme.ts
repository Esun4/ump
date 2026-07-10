import { useColorScheme } from 'react-native';

// Visual identity: the umpire's own world. Dark mode is a night game —
// deep navy field, chalk-warm text, brass accents. Light mode is a day
// game — warm chalk paper, navy ink, the same brass details.
export interface Theme {
  dark: boolean;
  background: string;
  card: string;
  cardRaised: string;
  text: string;
  subtleText: string;
  faintText: string;
  border: string;
  hairline: string;
  // Primary action surface (buttons): brass at night, navy by day.
  primary: string;
  onPrimary: string;
  // Brass identity color for chips, active states, and data marks.
  accent: string;
  accentSoft: string;
  correct: string;
  correctBg: string;
  wrong: string;
  wrongBg: string;
  danger: string;
}

export const lightTheme: Theme = {
  dark: false,
  background: '#F4F3EE',
  card: '#FFFFFF',
  cardRaised: '#FFFFFF',
  text: '#1A2334',
  subtleText: '#5F6878',
  faintText: '#9AA0AC',
  border: '#E3E1D8',
  hairline: '#EDEBE3',
  primary: '#1E2A44',
  onPrimary: '#F4F3EE',
  accent: '#9A6C1D',
  accentSoft: '#F3E9D4',
  correct: '#2E7D4F',
  correctBg: '#E3F1E8',
  wrong: '#C0492F',
  wrongBg: '#FAE7E2',
  danger: '#C0492F',
};

export const darkTheme: Theme = {
  dark: true,
  background: '#0B101A',
  card: '#131A28',
  cardRaised: '#192134',
  text: '#EDEDE5',
  subtleText: '#8B95A9',
  faintText: '#5C6579',
  border: '#232E44',
  hairline: '#1B2436',
  primary: '#D9A24E',
  onPrimary: '#1D1305',
  accent: '#D9A24E',
  accentSoft: '#2A2312',
  correct: '#63C883',
  correctBg: '#122A1D',
  wrong: '#EF7B6B',
  wrongBg: '#331B18',
  danger: '#EF7B6B',
};

// Type roles. Display is Barlow Condensed — the scoreboard/jersey face —
// reserved for the wordmark, screen titles, and big numbers. Body text
// stays on the system face for a native feel.
export const fonts = {
  display: 'BarlowCondensed_700Bold',
  displaySemi: 'BarlowCondensed_600SemiBold',
  displayMedium: 'BarlowCondensed_500Medium',
};

export function useTheme(): Theme {
  return useColorScheme() === 'dark' ? darkTheme : lightTheme;
}
