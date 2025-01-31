import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export function LoadingSpinner() {
  const { themeMode } = useTheme();

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color={``} />
    </View>
  );
}
