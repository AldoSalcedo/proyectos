import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { UserAvatar } from "@/components/ui/Icons";
import { Pressable } from "react-native";

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
          headerLeft: () => <WelcomeMessage name="Aldo Salcedo" />,
          headerRight: () => (
            <Link asChild href="/userinfo">
              <Pressable>
                <UserAvatar
                  uri={"https://avatars.githubusercontent.com/u/61251101?v=4"}
                />
              </Pressable>
            </Link>
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
