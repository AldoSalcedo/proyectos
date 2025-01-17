import React from "react";
import type { ViewProps } from "react-native";
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
    <SafeAreaView className={tw(className, themeMode)} style={style} {...props}>
      {children}
    </SafeAreaView>
  );
}
