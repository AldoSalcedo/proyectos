import { Text, View } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { ThemeToggle } from "../../components/ThemeToggle";
import { useFoodStorage } from "@/hooks/useFoodStorage";
import { useCallback, useState } from "react";
import { FoodInput, TodayCaloriesProps } from "@/types";
import { TodayCalories } from "@/components/TodayCalories";
import React from "react";
import { TodayMeals } from "@/components/TodayMeals";

const totalCaloriesPerDay = 2000;

export default function Index() {
  const [todayFood, setTodayFood] = useState<FoodInput[]>([]);
  const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesProps>({
    total: totalCaloriesPerDay,
    consumed: 0,
    remaining: totalCaloriesPerDay,
    percentage: 0,
  });
  const { theme } = useTheme();
  const { onGetTodayFood } = useFoodStorage();

  const calculateTodayStatistics = (meals: FoodInput[]) => {
    try {
      const caloriesConsumed = meals.reduce(
        (acum, curr) => acum + Number(curr.calories),
        0,
      );
      const remainingCalories = totalCaloriesPerDay - caloriesConsumed;
      const percentage = (caloriesConsumed / totalCaloriesPerDay) * 100;

      setTodayStatistics({
        total: totalCaloriesPerDay,
        consumed: caloriesConsumed,
        percentage,
        remaining: remainingCalories,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = (await onGetTodayFood()) as FoodInput[];
      calculateTodayStatistics(todayFoodResponse);
      setTodayFood(todayFoodResponse);
    } catch (error) {
      setTodayFood([]);
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodayFood().catch(null);
    }, [loadTodayFood]),
  );

  return (
    <View
      className={`flex-1 p-6
        ${theme === "light" ? "bg-light-background" : ""}
        ${theme === "dark" ? "bg-dark-background" : ""}
        ${theme === "christmas" ? "bg-christmas-background" : ""}
      `}
    >
      <View className="flex-row align-center justify-between mb-6">
        <View>
          <Text
            className={`text-lg font-semibold mb-8
            ${theme === "light" ? "text-light-text" : ""}
            ${theme === "dark" ? "text-dark-text" : ""}
            ${theme === "christmas" ? "text-christmas-text" : ""}
          `}
          >
            Calories
          </Text>
        </View>
        <View>
          <Link asChild href="/addcalories">
            <AntDesign
              name="pluscircle"
              size={24}
              color={
                theme === "light"
                  ? "#000000"
                  : theme === "dark"
                    ? "#FFFFFF"
                    : theme === "christmas"
                      ? "#FF0000"
                      : "#000000"
              }
            />
          </Link>
        </View>
      </View>
      <TodayCalories {...todayStatistics} />
      <TodayMeals />
      <ThemeToggle />
    </View>
  );
}
