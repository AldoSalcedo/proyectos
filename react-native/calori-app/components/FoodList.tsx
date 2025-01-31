import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Meal } from "../types";
import { useTheme } from "../context/ThemeContext";
import { useFoodStorage } from "@/hooks/useFoodStorage";
import { Ionicons } from "@expo/vector-icons";
import { useFoodContext } from "@/context/FoodContext";

interface FoodListProps {
  onMealAdded: () => void;
}

export function FoodList({ onMealAdded }: FoodListProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [foods, setFoods] = useState<Meal[]>([]);
  const { refreshTimestamp } = useFoodContext();

  const { getMeals, saveTodayMeals, removeMeal } = useFoodStorage();

  const loadFoods = useCallback(async () => {
    try {
      const foodResponse = await getMeals();
      setFoods(foodResponse);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to load food");
    }
  }, [getMeals]);

  useEffect(() => {
    loadFoods();
  }, [loadFoods, refreshTimestamp]);

  const handleDeleteFood = async (id: string) => {
    try {
      await removeMeal(id, false);
      loadFoods(); // Refresh the list
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to delete food");
    }
  };

  const handleAddTodayMeal = async (item: Meal) => {
    try {
      await saveTodayMeals(item);
      onMealAdded();
      Alert.alert("Success", "Meal added to today's list");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to add meal to today's list");
    }
  };

  return (
    <View className="flex-1">
      <TextInput
        style={{
          color: theme.text,
          borderBottomColor: theme.border,
          backgroundColor: theme.surface,
        }}
        className="mx-4 p-2.5 border-b"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search foods..."
        placeholderTextColor={theme.textSecondary}
      />
      <FlatList
        className="flex-1"
        data={foods?.filter((food) =>
          food.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={loadFoods}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleAddTodayMeal(item)}
            style={{
              borderBottomColor: theme.border,
              backgroundColor: theme.surface,
            }}
            className="flex-row justify-between items-center mx-4 p-4 border-b"
          >
            <Text style={{ color: theme.text }} className="text-base">
              {item.name}
            </Text>
            <View className="flex-row items-center gap-4">
              <Text style={{ color: theme.textSecondary }}>
                {item.calories} cal
              </Text>
              <TouchableOpacity
                onPress={() => handleDeleteFood(item.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="trash-outline" size={24} color={theme.error} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
