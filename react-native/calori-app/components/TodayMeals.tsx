import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Meal } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

interface TodayMealsProps {
  meals: Meal[];
  onDelete: (id: string) => void;
}

export function TodayMeals({ meals, onDelete }: TodayMealsProps) {
  const { themeMode } = useTheme();

  if (!meals.length) {
    return (
      <View className="h-32 justify-center items-center">
        <Text className={`text-base`}>No meals added today</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 max-h-48">
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            className={`flex-row justify-between items-center p-4 border-b `}
          >
            <View>
              <Text className={`text-base font-medium `}>{item.name}</Text>
              <Text className={``}>
                {item.portion}g • {item.calories} cal
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => onDelete(item.id)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="trash-outline" size={24} color="#ff4444" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
