import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { twColor } from "../utils/theme";
import { InfoIcon } from "./ui/Icons";
import { Link } from "expo-router";

export function NewFood() {
  const { themeMode } = useTheme();

  return (
    <View className="gap-1 flex-row justify-between items-center bg-white my-4">
      <View className="p-3">
        <Text
          className={`text-xl font-bold text-${twColor(themeMode, "text")}`}
        >
          Add New Food
        </Text>
      </View>
      <View className="p-3">
        <Link asChild href={"/addcalories"}>
          <Pressable>
            <InfoIcon />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
