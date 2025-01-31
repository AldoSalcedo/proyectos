export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  error: string;
  success: string;
}

export interface Theme {
  colors: ThemeColors;
}

export type ThemeScheme = {
  [key in ThemeMode]: Theme;
};
