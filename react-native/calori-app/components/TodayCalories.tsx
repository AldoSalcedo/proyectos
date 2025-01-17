import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { tw, twColor } from "../utils/theme";
import { Meal } from "../types";

interface TodayCaloriesProps {
  meals: Meal[];
  goal?: number;
}

export function TodayCalories({ meals, goal = 2000 }: TodayCaloriesProps) {
  const { themeMode } = useTheme();
  const totalCalories = meals.reduce((total, meal) => total + meal.calories, 0);
  const remainingCalories = goal - totalCalories;
  const progress = (totalCalories / goal) * 100;

  return (
    <View className={tw("m-4 rounded-xl p-4 shadow-lg", themeMode)}>
      <View className="flex-row justify-between items-center mb-4">
        <Text
          className={`text-lg font-semibold text-${twColor(themeMode, "text")}`}
        >
          Today's Calories
        </Text>
        <Text className={`text-${twColor(themeMode, "text-secondary")}`}>
          Goal: {goal} cal
        </Text>
      </View>

      <View
        className={`h-2.5 rounded-full bg-${twColor(themeMode, "border")} mb-4`}
      >
        <View
          className={`h-full rounded-full bg-${twColor(themeMode, "success")}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </View>

      <View className="flex-row justify-around">
        <View className="items-center">
          <Text
            className={`text-2xl font-semibold text-${twColor(themeMode, "text")}`}
          >
            {totalCalories}
          </Text>
          <Text className={`text-${twColor(themeMode, "text-secondary")} mt-1`}>
            Consumed
          </Text>
        </View>
        <View className="items-center">
          <Text
            className={`text-2xl font-semibold text-${twColor(
              themeMode,
              remainingCalories < 0 ? "error" : "success",
            )}`}
          >
            {remainingCalories}
          </Text>
          <Text className={`text-${twColor(themeMode, "text-secondary")} mt-1`}>
            Remaining
          </Text>
        </View>
      </View>
    </View>
  );
}
