import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themes, ThemeType } from "@/utils/theme";

interface ThemeContextType {
  themeMode: ThemeType;
  toggleTheme: () => void;
  theme: typeof themes.light;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeType>(systemTheme || "light");

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("themeMode");
      if (storedTheme) {
        setThemeMode(storedTheme as ThemeType);
      }
    };
    loadTheme();
  }, []);

  const theme = themes[themeMode];

  const toggleTheme = async () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newThemeMode);
    await AsyncStorage.setItem("themeMode", newThemeMode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
