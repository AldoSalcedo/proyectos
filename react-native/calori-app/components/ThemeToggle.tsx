import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { twColor, twText } from "../utils/theme";

export function ThemeToggle() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <View>
      <TouchableOpacity
        className={`p-2.5 rounded-lg items-center my-2.5 bg-${twColor(themeMode, "surface")}`}
        onPress={toggleTheme}
      >
        <Text className={twText(themeMode)}>
          Theme: {themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
