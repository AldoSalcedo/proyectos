/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal, AddMealParams } from "../types";

const STORAGE_KEY = "@food-tracker:meals";
const TODAY_FOOD_STORAGE_KEY = "@MyTodayFood:Key";

export function useFoodStorage() {
  const saveMeal = useCallback(async (params: AddMealParams): Promise<void> => {
    try {
      const meals = await getMeals();
      const newMeal: Meal = {
        id: `meal-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        name: params.name,
        calories: params.calories,
        portion: params.portion,
        date: new Date().toISOString(),
      };
      const updatedMeals = [...meals, newMeal];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMeals));
    } catch (error) {
      console.error("Error saving meal:", error);
      throw new Error("Failed to save meal");
    }
  }, []);

  const getMeals = useCallback(async (): Promise<Meal[]> => {
    try {
      const meals = await AsyncStorage.getItem(STORAGE_KEY);
      return meals ? JSON.parse(meals) : [];
    } catch (error) {
      console.error("Error getting meals:", error);
      return [];
    }
  }, []);

  const saveTodayMeals = useCallback(async (meal: Meal): Promise<void> => {
    try {
      const todayMeals = await getTodayMeals();
      const updatedMeals = [
        ...todayMeals,
        {
          ...meal,
          id: `today-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
          date: new Date().toISOString(),
        },
      ];
      await AsyncStorage.setItem(
        TODAY_FOOD_STORAGE_KEY,
        JSON.stringify(updatedMeals),
      );
    } catch (error) {
      console.error("Error saving today meal:", error);
      throw new Error("Failed to save today meal");
    }
  }, []);

  const getTodayMeals = useCallback(async (): Promise<Meal[]> => {
    try {
      const meals = await AsyncStorage.getItem(TODAY_FOOD_STORAGE_KEY);
      return meals ? JSON.parse(meals) : [];
    } catch (error) {
      console.error("Error getting today meals:", error);
      return [];
    }
  }, []);

  const removeMeal = useCallback(
    async (id: string, isToday: boolean = false): Promise<void> => {
      try {
        const storageKey = isToday ? TODAY_FOOD_STORAGE_KEY : STORAGE_KEY;
        const meals = isToday ? await getTodayMeals() : await getMeals();
        const filteredMeals = meals.filter((meal) => meal.id !== id);
        await AsyncStorage.setItem(storageKey, JSON.stringify(filteredMeals));
      } catch (error) {
        console.error("Error removing meal:", error);
        throw new Error("Failed to remove meal");
      }
    },
    [getMeals, getTodayMeals],
  );

  return {
    saveMeal,
    getMeals,
    saveTodayMeals,
    getTodayMeals,
    removeMeal,
  };
}
