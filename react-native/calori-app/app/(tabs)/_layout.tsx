import React from "react";
import { Tabs } from "expo-router";
import { HomeIcon, PlusIcon } from "@/components/ui/Icons";
import { useTheme } from "@/context/ThemeContext";
import { View } from "react-native";

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.background,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
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
            tabBarIcon: ({ color }) => <PlusIcon color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
