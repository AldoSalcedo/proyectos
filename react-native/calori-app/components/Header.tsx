import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { twColor } from "../utils/theme";
import { UserAvatarImage } from "./ui/Icons";

interface UserInfoProps {
  name: string;
}

export function Header({ name }: UserInfoProps) {
  const { themeMode } = useTheme();

  return (
    <View className="gap-1 flex-row justify-between items-center bg-white">
      <View className="p-3">
        <Text
          className={`text-xl font-bold text-${twColor(themeMode, "text")}`}
        >
          {name}
        </Text>
        <Text className={`text-${twColor(themeMode, "text-secondary")}`}>
          Welcome back to your goal
        </Text>
      </View>
      <View className="p-3">
        <UserAvatarImage
          uri={"https://avatars.githubusercontent.com/u/61251101?v=4"}
        />
      </View>
    </View>
  );
}
