import React from "react";
import { View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Meal } from "../types";
import CircularProgress from "react-native-circular-progress-indicator";
import { ThemedText, ThemedView } from "./themed";

interface TodayCaloriesProps {
  meals: Meal[];
  goal?: number;
}

export function TodayCalories({ meals, goal = 2000 }: TodayCaloriesProps) {
  const { theme } = useTheme();
  const totalCalories = meals.reduce((total, meal) => total + meal.calories, 0);
  const remainingCalories = goal - totalCalories;
  const progress = (totalCalories / goal) * 100;

  return (
    <ThemedView
      style={{ backgroundColor: theme.surface }}
      className="mx-2 mt-0 mb-0.5 pb-1 rounded-lg"
    >
      <View className="flex-row justify-between items-center px-2">
        <ThemedText
          style={{ color: theme.text }}
          className={`text-lg font-semibold`}
        >
          Today's Calories
        </ThemedText>
        <ThemedText style={{ color: theme.text }}>Goal: {goal} cal</ThemedText>
      </View>

      <View className="items-center py-1">
        <CircularProgress
          value={progress}
          valueSuffix="%"
          radius={40}
          duration={1000}
          progressValueColor={theme.success}
          maxValue={100}
          activeStrokeColor={
            remainingCalories < 0 ? theme.error : theme.success
          }
          inActiveStrokeColor={theme.border}
        />
      </View>

      <View className="flex-row justify-around mt-2">
        <View className="items-center">
          <ThemedText
            style={{ color: theme.text }}
            className={`text-xl font-semibold`}
          >
            {totalCalories}
          </ThemedText>
          <ThemedText style={{ color: theme.text }} className={``}>
            Consumed
          </ThemedText>
        </View>
        <View className="items-center">
          <ThemedText
            style={{ color: theme.text }}
            className={`text-xl font-semibold`}
          >
            {remainingCalories}
          </ThemedText>
          <ThemedText style={{ color: theme.text }} className={``}>
            Remaining
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}
