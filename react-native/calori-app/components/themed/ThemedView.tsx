import React from "react";
import { ViewProps, Text } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { tw } from "@/utils/theme";
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
  const { themeMode } = useTheme();

  return (
    <SafeAreaView
      className={`bg-${themeMode === "dark" ? "dark" : "light"}-background ${tw(className, themeMode)}`}
      style={style}
      {...props}
    >
      {children}
    </SafeAreaView>
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
