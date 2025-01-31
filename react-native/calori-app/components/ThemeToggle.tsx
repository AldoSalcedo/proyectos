import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { themeMode, toggleTheme, theme } = useTheme();

  return (
    <View>
      <TouchableOpacity
        className="p-2.5 rounded-lg items-center my-2.5"
        style={{
          backgroundColor: theme.surface,
        }}
        onPress={toggleTheme}
      >
        <Text style={{ color: theme.text }}>
          Theme: {themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
