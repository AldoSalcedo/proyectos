import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { twColor } from "../utils/theme";

export function LoadingSpinner() {
  const { themeMode } = useTheme();

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator
        size="large"
        color={`bg-${twColor(themeMode, "primary")}`}
      />
    </View>
  );
}
