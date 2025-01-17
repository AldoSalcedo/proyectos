import { ThemeMode } from "../types/theme";

export function tw(baseClasses: string, themeMode: ThemeMode) {
  // If baseClasses is empty, just return the theme background and text colors
  const themeClasses = `bg-${themeMode}-background text-${themeMode}-text`;
  return baseClasses ? `${baseClasses} ${themeClasses}` : themeClasses;
}

export function twColor(themeMode: ThemeMode, colorType: string) {
  return `${themeMode}-${colorType}`;
}

// Add helper for text colors
export function twText(themeMode: ThemeMode, colorType: string = "text") {
  return `text-${themeMode}-${colorType}`;
}
