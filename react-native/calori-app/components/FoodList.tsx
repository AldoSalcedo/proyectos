import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { FoodInput } from "@/types/index";
import { AntDesign } from "@expo/vector-icons";
import { useFoodStorage } from "@/hooks/useFoodStorage";
import React from "react";

interface FoodListProps {
  foods: FoodInput[];
}

export function FoodList({ foods }: FoodListProps) {
  const { theme } = useTheme();
  const { onSaveTodayFood } = useFoodStorage();

  const handleAddItemPress = async ({ calories, name, portion }: FoodInput) => {
    try {
      await onSaveTodayFood({ calories, name, portion });
      Alert.alert("Comida agregada al dia");
    } catch (error) {
      console.error(error);
      Alert.alert("Comida no agregada");
    }
  };

  return (
    <ScrollView className="mx-6 mb-20">
      {foods.map((food, index) => (
        <View
          key={index}
          className={`mb-4 p-4 rounded-lg border flex-row justify-between items-start
            ${theme === "light" ? "border-gray-200 bg-green-100" : ""}
            ${theme === "dark" ? "border-gray-700 bg-green-900" : ""}
            ${theme === "christmas" ? "border-red-500 bg-green-100" : ""}
          `}
        >
          <View className="flex-1">
            <Text
              className={`font-bold text-lg mb-1
              ${theme === "light" ? "text-gray-800" : ""}
              ${theme === "dark" ? "text-white" : ""}
              ${theme === "christmas" ? "text-red-600" : ""}
            `}
            >
              {food.name}
            </Text>
            <Text
              className={`
              ${theme === "light" ? "text-gray-600" : ""}
              ${theme === "dark" ? "text-gray-300" : ""}
              ${theme === "christmas" ? "text-green-700" : ""}
            `}
            >
              Portion: {food.portion}g
            </Text>
          </View>
          <View className="items-center ml-4">
            <View className="bg-white rounded-full p-1 mb-2 border border-black">
              <Pressable onPress={() => handleAddItemPress(food)}>
                <AntDesign
                  name="plus"
                  size={13}
                  color={
                    theme === "light"
                      ? "#000000"
                      : theme === "dark"
                        ? "#000000"
                        : theme === "christmas"
                          ? "#FF0000"
                          : "#000000"
                  }
                />
              </Pressable>
            </View>
            <Text
              className={`
              ${theme === "light" ? "text-gray-600" : ""}
              ${theme === "dark" ? "text-gray-300" : ""}
              ${theme === "christmas" ? "text-green-700" : ""}
            `}
            >
              Calories: {food.calories}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
