export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export const themes = {
  light: {
    primary: "#007AFF",
    background: "#FFFFFF",
    surface: "#F2F2F7",
    text: "#000000",
    textSecondary: "#6B7280",
    border: "#E5E5EA",
    success: "#34C759",
    error: "#FF3B30",
  },
  dark: {
    primary: "#0A84FF",
    background: "#000000",
    surface: "#1C1C1E",
    text: "#FFFFFF",
    textSecondary: "#8E8E93",
    border: "#38383A",
    success: "#32D74B",
    error: "#FF453A",
  },
} satisfies Record<"light" | "dark", Record<string, string>>;

export type ThemeType = keyof typeof themes;
