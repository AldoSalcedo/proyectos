import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Image } from "react-native";
import { UserInfo } from "@/components/UserInfo";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

SplashScreen.preventAutoHideAsync();

function LayoutContent() {
  const { theme } = useTheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const navigationTheme = {
    ...(theme === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme === "dark" ? DarkTheme.colors : DefaultTheme.colors),
      primary:
        theme === "christmas"
          ? "#D42426"
          : theme === "dark"
            ? "#0A84FF"
            : "#007AFF",
      background:
        theme === "christmas"
          ? "#0C3823"
          : theme === "dark"
            ? "#1C1C1E"
            : "#FFFFFF",
      text: theme === "dark" || theme === "christmas" ? "#FFFFFF" : "#000000",
    },
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: navigationTheme.colors.background,
          },
          headerTintColor: navigationTheme.colors.text,
          headerTitle: "",
          headerLeft: () => <UserInfo name="Aldo Salcedo" />,
          headerRight: () => (
            <Image
              source={{
                uri: "https://avatars.githubusercontent.com/u/61251101?v=4",
              }}
              style={{ width: 40, height: 40, borderRadius: 30 }}
            />
          ),
        }}
      ></Stack>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}
