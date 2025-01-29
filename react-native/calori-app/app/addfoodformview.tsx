import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useFoodStorage } from "../hooks/useFoodStorage";
import { HomeIcon } from "@/components/ui/Icons";
import { useTheme } from "@/context/ThemeContext";
import { twColor, twText } from "@/utils/theme";
import { ThemedView } from "@/components/themed";
import { useFoodContext } from "@/context/FoodContext";

export default function AddFood() {
  const { themeMode } = useTheme();
  const [name, setName] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [portion, setPortion] = useState<string>("");

  const router = useRouter();
  const { saveMeal } = useFoodStorage();
  const { refreshFoods } = useFoodContext();

  async function handleSave() {
    if (!name.trim() || !calories.trim() || !portion.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await saveMeal({
        name,
        calories: Number(calories),
        portion: Number(portion),
      });
      refreshFoods();
      Alert.alert("Success", "Food added successfully", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save food");
    }
  }

  return (
    <ThemedView className="p-5">
      <Link asChild href={"/"}>
        <Pressable className="pb-2 active:opacity-80">
          <HomeIcon color={`text-${twColor(themeMode, "primary")}`} />
        </Pressable>
      </Link>

      <Text className={`text-xl font-bold ${twText(themeMode)}`}>
        Add New Food
      </Text>

      <View className="mt-4 space-y-4">
        <View>
          <Text className={twText(themeMode)}>Food Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter food name"
            className={`mt-1 p-2 border rounded-lg ${twText(themeMode)} border-${twColor(themeMode, "border")}`}
            placeholderTextColor={`text-${twColor(themeMode, "text-secondary")}`}
          />
        </View>

        <View>
          <Text className={twText(themeMode)}>Calories</Text>
          <TextInput
            value={calories}
            onChangeText={setCalories}
            placeholder="Enter calories"
            keyboardType="numeric"
            className={`mt-1 p-2 border rounded-lg ${twText(themeMode)} border-${twColor(themeMode, "border")}`}
            placeholderTextColor={`text-${twColor(themeMode, "text-secondary")}`}
          />
        </View>

        <View>
          <Text className={twText(themeMode)}>Portion (grams)</Text>
          <TextInput
            value={portion}
            onChangeText={setPortion}
            placeholder="Enter portion size"
            keyboardType="numeric"
            className={`mt-1 p-2 border rounded-lg ${twText(themeMode)} border-${twColor(themeMode, "border")}`}
            placeholderTextColor={`text-${twColor(themeMode, "text-secondary")}`}
          />
        </View>

        <TouchableOpacity
          onPress={handleSave}
          className={`mt-4 p-4 rounded-lg bg-${twColor(themeMode, "secondary")}`}
        >
          <Text className={`${twText(themeMode)}`}>Save Food</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
