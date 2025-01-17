import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { View } from "react-native";

export default function UserInfoScreen() {
  return (
    <View className="flex-1">
      <ThemeToggle />
    </View>
  );
}
