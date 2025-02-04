import * as React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Meal } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { ThemedText, ThemedView } from "./themed";

interface TodayMealsProps {
  meals: Meal[];
  onDelete: (id: string) => void;
}

export function TodayMeals({ meals, onDelete }: TodayMealsProps) {
  const { theme } = useTheme();

  if (!meals.length) {
    return (
      <View className="h-32 justify-center items-center">
        <ThemedText style={{ color: theme.text }} className="text-base">
          No meals added today
        </ThemedText>
      </View>
    );
  }

  return (
    <ThemedView className="flex-1 max-h-48 mx-2">
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            className="flex-row justify-between items-center p-2 mb-1 rounded-lg"
            style={{
              backgroundColor: theme.surface,
            }}
          >
            <View>
              <ThemedText
                style={{ color: theme.text }}
                className="text-base font-medium"
              >
                {item.name}
              </ThemedText>
              <Text style={{ color: theme.textSecondary }}>
                {item.portion}g • {item.calories} cal
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => onDelete(item.id)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="trash-outline" size={24} color={theme.error} />
            </TouchableOpacity>
          </View>
        )}
      />
    </ThemedView>
  );
}
