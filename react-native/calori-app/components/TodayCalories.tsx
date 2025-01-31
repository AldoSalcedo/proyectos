import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
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
    <View className={``}>
      <View className="flex-row justify-between items-center">
        <Text className={`text-lg font-semibold`}>Today's Calories</Text>
        <Text className={``}>Goal: {goal} cal</Text>
      </View>

      <View className="items-center py-1">
        <CircularProgress
          value={progress}
          valueSuffix="%"
          radius={40}
          duration={1000}
          progressValueColor={``}
          maxValue={100}
          activeStrokeColor={remainingCalories < 0 ? "#ff4444" : "#4CAF50"}
        />
      </View>

      <View className="flex-row justify-around mt-2">
        <View className="items-center">
          <Text className={`text-xl font-semibold`}>{totalCalories}</Text>
          <Text className={``}>Consumed</Text>
        </View>
        <View className="items-center">
          <Text className={`text-xl font-semibold`}>{remainingCalories}</Text>
          <Text className={``}>Remaining</Text>
        </View>
      </View>
    </View>
  );
}
