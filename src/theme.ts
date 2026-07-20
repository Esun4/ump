// Visual identity: flat, grid-first, light-ground. Square corners
// everywhere and ink rules doing the structural work. The palette is
// tonal — navy ink on ivory, sapphire for every accent, and warm taupe
// and champagne carrying the neutrals so the greys never go cold.
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
  // Sapphire identity color. `accentSoft` is the pale tint it sits on;
  // `accentDeep` is the navy step small text uses on that tint.
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
  background: '#f5f4f0', // ivory
  card: '#ffffff',
  cardRaised: '#e7e2ce', // champagne
  text: '#112250', // navy
  subtleText: '#5a6178',
  faintText: '#8f8a7c', // warm taupe, darkened to stay readable
  border: '#d5d0c3', // warm taupe, lightened to a hairline
  hairline: '#d5d0c3',
  rule: '#112250',
  primary: '#3b507d', // sapphire
  primaryPressed: '#2e3f63',
  onPrimary: '#ffffff',
  accent: '#3b507d',
  accentSoft: '#e6eaf2',
  // Deepened sapphire rather than the navy ink — eyebrows, tags and
  // active-row titles have to stay legible as *accent*, not read as body.
  accentDeep: '#354872',
  correct: '#2f7d54',
  correctBg: '#e6f0e9',
  correctText: '#1f5136',
  correctPanel: '#eef4f0',
  // Sapphire can't double as the error color the way the old accent did,
  // so wrong answers get their own muted brick — used nowhere else.
  wrong: '#a8443a',
  wrongBg: '#f6ebe8',
  danger: '#a8443a',
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
