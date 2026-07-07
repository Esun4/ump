import { useColorScheme } from 'react-native';

export interface Theme {
  dark: boolean;
  background: string;
  card: string;
  text: string;
  subtleText: string;
  border: string;
  primary: string;
  onPrimary: string;
  correct: string;
  correctBg: string;
  wrong: string;
  wrongBg: string;
  danger: string;
}

export const lightTheme: Theme = {
  dark: false,
  background: '#f4f5f7',
  card: '#ffffff',
  text: '#1a1d21',
  subtleText: '#6b7280',
  border: '#e2e4e8',
  primary: '#1d4ed8',
  onPrimary: '#ffffff',
  correct: '#15803d',
  correctBg: '#dcfce7',
  wrong: '#b91c1c',
  wrongBg: '#fee2e2',
  danger: '#b91c1c',
};

export const darkTheme: Theme = {
  dark: true,
  background: '#111418',
  card: '#1c2128',
  text: '#e6e8eb',
  subtleText: '#9aa2ad',
  border: '#2c333d',
  primary: '#3b82f6',
  onPrimary: '#ffffff',
  correct: '#4ade80',
  correctBg: '#143520',
  wrong: '#f87171',
  wrongBg: '#3d1a1a',
  danger: '#f87171',
};

export function useTheme(): Theme {
  return useColorScheme() === 'dark' ? darkTheme : lightTheme;
}
