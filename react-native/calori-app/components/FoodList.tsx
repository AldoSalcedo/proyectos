import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FoodItem } from "../types";
import { useTheme } from "../context/ThemeContext";
import { tw, twColor } from "../utils/theme";

const FOOD_DATA: FoodItem[] = [
  { id: "1", name: "Apple", calories: 52 },
  { id: "2", name: "Banana", calories: 89 },
  { id: "3", name: "Orange", calories: 47 },
  // Add more food items...
];

interface FoodListProps {
  onSelectFood: (food: FoodItem) => void;
}

export function FoodList({ onSelectFood }: FoodListProps) {
  const { themeMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View className={tw("flex-1", themeMode)}>
      <TextInput
        className={`p-2.5 border-b border-${twColor(themeMode, "border")} text-${twColor(themeMode, "text")} mb-2.5`}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search foods..."
        placeholderTextColor={`text-${twColor(themeMode, "text-secondary")}`}
      />
      <FlatList
        data={FOOD_DATA.filter((food) =>
          food.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelectFood(item)}
            className={`flex-row justify-between p-4 border-b border-${twColor(themeMode, "border")}`}
          >
            <Text className={`text-base text-${twColor(themeMode, "text")}`}>
              {item.name}
            </Text>
            <Text className={`text-${twColor(themeMode, "text-secondary")}`}>
              {item.calories} cal
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
