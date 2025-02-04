import * as React from "react";
import { ViewProps, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

interface ThemedViewProps extends ViewProps {
  className?: string;
}

export function ThemedView({
  className = "",
  children,
  style,
  ...props
}: ThemedViewProps) {
  const { theme } = useTheme();

  return (
    <View
      className={`bg-[${theme.background}] ${className}`}
      style={[{ backgroundColor: theme.background }, style]}
      {...props}
    >
      {children}
    </View>
  );
}

export function ThemedText({ className = "", ...props }) {
  const { themeMode } = useTheme();
  return (
    <Text
      className={`text-${themeMode === "dark" ? "dark" : "light"}-text ${className}`}
      {...props}
    />
  );
}

export function HomeThemedView({
  className = "",
  children,
  style,
  ...props
}: ThemedViewProps) {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      className={`bg-[${theme.background}] ${className}`}
      style={[{ backgroundColor: theme.background }, style]}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
}
