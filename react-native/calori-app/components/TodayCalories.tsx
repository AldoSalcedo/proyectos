import { useTheme } from "@/context/ThemeContext";
import { TodayCaloriesProps } from "@/types";
import React, { FC } from "react";
import { Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

export const TodayCalories: FC<TodayCaloriesProps> = ({
  total = 2000,
  consumed = 0,
  remaining = 0,
  percentage = 0,
}) => {
  const { theme } = useTheme();
  return (
    <View
      className={`mb-4 p-4 rounded-lg border flex-row justify-between items-start
            ${theme === "light" ? "border-gray-200 bg-green-100" : ""}
            ${theme === "dark" ? "border-gray-700 bg-green-900" : ""}
            ${theme === "christmas" ? "border-red-500 bg-green-100" : ""}
          `}
    >
      <View className="flex-1">
        <CircularProgress value={percentage} valueSuffix="%" />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold mb-2">Today</Text>
        <View className="flex-row mb-1 justify-between">
          <Text>Total:</Text>
          <Text>{total}</Text>
        </View>
        <View className="flex-row mb-1 justify-between">
          <Text>Consumed:</Text>
          <Text>{consumed}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text>Remaining:</Text>
          <Text>{remaining}</Text>
        </View>
      </View>
    </View>
  );
};
