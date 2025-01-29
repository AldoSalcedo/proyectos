import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { tw, twColor } from "../utils/theme";
import { Meal } from "../types";
import CircularProgress from "react-native-circular-progress-indicator";

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
    <View className={tw("mx-4 rounded-xl p-4 shadow-lg", themeMode)}>
      <View className="flex-row justify-between items-center">
        <Text
          className={`text-lg font-semibold text-${twColor(themeMode, "text")}`}
        >
          Today's Calories
        </Text>
        <Text className={`text-${twColor(themeMode, "text-secondary")}`}>
          Goal: {goal} cal
        </Text>
      </View>

      <View className="items-center py-1">
        <CircularProgress
          value={progress}
          valueSuffix="%"
          radius={40}
          duration={1000}
          progressValueColor={`#${twColor(themeMode, "text")}`}
          maxValue={100}
          activeStrokeColor={remainingCalories < 0 ? "#ff4444" : "#4CAF50"}
        />
      </View>

      <View className="flex-row justify-around mt-2">
        <View className="items-center">
          <Text
            className={`text-xl font-semibold text-${twColor(themeMode, "text")}`}
          >
            {totalCalories}
          </Text>
          <Text className={`text-${twColor(themeMode, "text-secondary")} mt-1`}>
            Consumed
          </Text>
        </View>
        <View className="items-center">
          <Text
            className={`text-xl font-semibold text-${twColor(
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
