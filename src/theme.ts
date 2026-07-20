// Visual identity: flat, grid-first, light-ground. Square corners
// everywhere, ink rules doing the structural work, and a single muted
// claret carrying every accent the old navy-and-brass theme used to split
// between two colors.
export interface Theme {
  dark: boolean;
  background: string;
  card: string;
  cardRaised: string;
  text: string;
  subtleText: string;
  faintText: string;
  // Hairline rules inside and around cards.
  border: string;
  hairline: string;
  // The heavy ink rule that separates major sections and screen headers.
  rule: string;
  // Primary action surface, and the darker fill it takes while pressed.
  primary: string;
  primaryPressed: string;
  onPrimary: string;
  // Claret identity color. `accentSoft` is the 100 tint it sits on;
  // `accentDeep` is the 700 step small text uses on that tint.
  accent: string;
  accentSoft: string;
  accentDeep: string;
  correct: string;
  correctBg: string;
  // Ink-weight green for body copy on a correct-answer ground, and the
  // quieter tint the feedback panel uses behind it.
  correctText: string;
  correctPanel: string;
  wrong: string;
  wrongBg: string;
  danger: string;
}

export const lightTheme: Theme = {
  dark: false,
  background: '#f3f2f2',
  card: '#ffffff',
  cardRaised: '#eae9e9',
  text: '#201e1d',
  subtleText: '#6b6664',
  faintText: '#8a8583',
  border: '#cdc9c9',
  hairline: '#cdc9c9',
  rule: '#201e1d',
  primary: '#a13f38',
  primaryPressed: '#8a352f',
  onPrimary: '#ffffff',
  accent: '#a13f38',
  accentSoft: '#f6ecea',
  accentDeep: '#6f2c27',
  correct: '#2f7d54',
  correctBg: '#e6f0e9',
  correctText: '#1f5136',
  correctPanel: '#eef4f0',
  wrong: '#a13f38',
  wrongBg: '#f6ecea',
  danger: '#a13f38',
};

// Type roles. Archivo carries the whole app: 800 for the wordmark, big
// numbers, eyebrows, and labels; 600 for emphasis inside body copy; 400
// for scenarios and running text.
export const fonts = {
  display: 'Archivo_800ExtraBold',
  displaySemi: 'Archivo_800ExtraBold',
  displayMedium: 'Archivo_600SemiBold',
  body: 'Archivo_400Regular',
  bodyMedium: 'Archivo_600SemiBold',
  bodyBold: 'Archivo_800ExtraBold',
};

// The redesign is authored for the light ground only — there is one theme.
export function useTheme(): Theme {
  return lightTheme;
}
