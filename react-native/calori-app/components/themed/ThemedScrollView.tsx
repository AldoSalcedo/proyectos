import React from "react";
import { ScrollView } from "react-native";
import type { ScrollViewProps } from "react-native";
import { useTheme } from "@/context/ThemeContext";

interface ThemedScrollViewProps extends ScrollViewProps {
  className?: string;
}

export function ThemedScrollView({
  className = "",
  children,
  style,
  ...props
}: ThemedScrollViewProps) {
  const { themeMode } = useTheme();

  return (
    <ScrollView className={themeMode} style={style} {...props}>
      {children}
    </ScrollView>
  );
}
