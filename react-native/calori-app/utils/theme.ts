import { ThemeMode } from "../context/ThemeContext";

const themeColors = {
  light: {
    primary: "#007AFF",
    background: "#FFFFFF",
    surface: "#F2F2F7",
    text: "#000000",
    "text-secondary": "#6B7280",
    border: "#E5E5EA",
    success: "#34C759",
    error: "#FF3B30",
  },
  dark: {
    primary: "#0A84FF",
    background: "#000000",
    surface: "#1C1C1E",
    text: "#FFFFFF",
    "text-secondary": "#8E8E93",
    border: "#38383A",
    success: "#32D74B",
    error: "#FF453A",
  },
} as const;

export function getThemeColor(
  mode: ThemeMode,
  colorName: keyof typeof themeColors.light,
) {
  return themeColors[mode][colorName];
}

export function tw(className: string, mode: ThemeMode) {
  return `${className} bg-${mode === "dark" ? "dark" : "light"}-background`;
}

export function twText(mode: ThemeMode) {
  return `text-${mode === "dark" ? "dark" : "light"}-text`;
}

export function twColor(themeMode: ThemeMode, colorType: string) {
  return `${themeMode}-${colorType}`;
}

export function twBg(themeMode: ThemeMode, colorType: string = "background") {
  return `bg-${themeMode}-${colorType}`;
}
