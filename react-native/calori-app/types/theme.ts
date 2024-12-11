export type ThemeMode = "light" | "dark" | "christmas";

export interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary?: string;
  accent?: string;
}

export type Theme = {
  [key in ThemeMode]: ThemeColors;
};
