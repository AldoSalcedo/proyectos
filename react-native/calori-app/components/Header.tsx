import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { UserAvatarImage } from "./ui/Icons";

interface UserInfoProps {
  name: string;
}

export function Header({ name }: UserInfoProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.surface,
      }}
      className="gap-1 flex-row justify-between items-center"
    >
      <View className="p-3">
        <Text style={{ color: theme.text }} className="text-xl font-bold">
          {name}
        </Text>
        <Text style={{ color: theme.textSecondary }}>
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
