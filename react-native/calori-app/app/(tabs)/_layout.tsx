import React from "react";
import { Tabs } from "expo-router";
import { HomeIcon, InfoIcon } from "@/components/ui/Icons";
import { useTheme } from "@/context/ThemeContext";
import { twColor } from "@/utils/theme";
import { ThemedView } from "@/components/themed";

export default function TabsLayout() {
  const { themeMode } = useTheme();

  return (
    <ThemedView className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: `bg-${twColor(themeMode, "surface")}`,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: `text-${twColor(themeMode, "primary")}`,
          tabBarInactiveTintColor: `text-${twColor(themeMode, "text-secondary")}`,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="userinfo"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <InfoIcon color={color} />,
          }}
        />
      </Tabs>
    </ThemedView>
  );
}
