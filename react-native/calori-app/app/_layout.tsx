import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ThemedView } from "@/components/themed";
import { FoodProvider } from "../context/FoodContext";
import { useTheme } from "../context/ThemeContext";

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { themeMode } = useTheme();

  const statusBarStyle = themeMode === "dark" ? "light" : "dark";

  return (
    <ThemedView className="flex-1">
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={statusBarStyle} />
    </ThemedView>
  );
}

export default function Layout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <FoodProvider>
        <AppContent />
      </FoodProvider>
    </ThemeProvider>
  );
}
