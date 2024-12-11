import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface UserInfoProps {
  name: string;
}

export function UserInfo({ name }: UserInfoProps) {
  const { theme } = useTheme();

  const textColorClass = theme === "light" ? "text-black" : "text-white";

  return (
    <View className="gap-1">
      <Text className={`font-bold text-xl ${textColorClass}`}>{name}</Text>
      <Text className={"text-gray-500"}>Welcome back to your goal</Text>
    </View>
  );
}
