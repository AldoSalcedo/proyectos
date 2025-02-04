import React, { useState, useCallback, useEffect } from "react";
import { TodayCalories } from "@/components/TodayCalories";
import { Header } from "@/components/Header";
import { FoodList } from "@/components/FoodList";
import { NewFood } from "@/components/NewFood";
import { TodayMeals } from "@/components/TodayMeals";
import { useFoodStorage } from "@/hooks/useFoodStorage";
import { Alert } from "react-native";
import { Meal } from "@/types";
import { ThemedView } from "@/components/themed";

export default function HomeScreen() {
  const [todayMeals, setTodayMeals] = useState<Meal[]>([]);
  const { getTodayMeals, removeMeal } = useFoodStorage();

  const loadTodayMeals = useCallback(async () => {
    const meals = await getTodayMeals();
    setTodayMeals(meals);
  }, [getTodayMeals]);

  useEffect(() => {
    loadTodayMeals();
  }, [loadTodayMeals]);

  const handleDeleteTodayMeal = async (id: string) => {
    try {
      await removeMeal(id, true);
      loadTodayMeals();
    } catch (error) {
      console.error("Error deleting meal:", error);
      Alert.alert("Error", "Failed to delete meal");
    }
  };

  return (
    <ThemedView className="flex-1">
      <Header name={"Aldo Salcedo"} />

      <NewFood />
      <TodayCalories meals={todayMeals} />
      <TodayMeals meals={todayMeals} onDelete={handleDeleteTodayMeal} />

      <FoodList onMealAdded={loadTodayMeals} />
    </ThemedView>
  );
}
