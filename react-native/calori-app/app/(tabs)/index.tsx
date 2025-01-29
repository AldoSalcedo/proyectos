import React, { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import { TodayCalories } from "@/components/TodayCalories";
import { Header } from "@/components/Header";
import { FoodList } from "@/components/FoodList";
import { NewFood } from "@/components/NewFood";
import { TodayMeals } from "@/components/TodayMeals";
import { useFoodStorage } from "@/hooks/useFoodStorage";
import { Alert } from "react-native";
import { Meal } from "@/types";

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
    <View className="flex-1">
      <Header name={"Aldo Salcedo"} />

      <View className="h-[60%]">
        <NewFood />
        <TodayCalories meals={todayMeals} />
        <TodayMeals meals={todayMeals} onDelete={handleDeleteTodayMeal} />
      </View>
      <View className="h-[40%] border-t border-gray-200">
        <FoodList onMealAdded={loadTodayMeals} />
      </View>
    </View>
  );
}
