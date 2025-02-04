import * as React from "react";
import { Pressable, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { PlusIcon } from "./ui/Icons";
import { Link } from "expo-router";
import { ThemedText } from "./themed";

export function NewFood() {
  const { theme } = useTheme();

  return (
    <View
      className="gap-1 flex-row justify-between items-center m-2 rounded-xl"
      style={{
        backgroundColor: theme.surface,
      }}
    >
      <View className="p-3">
        <ThemedText
          style={{ color: theme.text }}
          className={`text-xl font-bold`}
        >
          Add New Food
        </ThemedText>
      </View>
      <View className="p-3">
        <Link asChild href={"/addfoodformview"}>
          <Pressable>
            <PlusIcon color={theme.success} />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
