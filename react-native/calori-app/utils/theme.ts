import { ThemeMode } from "../types/theme";

export function tw(baseClasses: string, themeMode: ThemeMode) {
  const themeClasses = `bg-${themeMode}-background text-${themeMode}-text`;
  return baseClasses ? `${baseClasses} ${themeClasses}` : themeClasses;
}

export function twColor(themeMode: ThemeMode, colorType: string) {
  return `${themeMode}-${colorType}`;
}

export function twText(themeMode: ThemeMode, colorType: string = "text") {
  return `text-${themeMode}-${colorType}`;
}

export function twBg(themeMode: ThemeMode, colorType: string = "background") {
  return `bg-${themeMode}-${colorType}`;
}
