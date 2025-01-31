import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useFoodStorage } from "../hooks/useFoodStorage";
import { HomeIcon } from "@/components/ui/Icons";
import { useTheme } from "@/context/ThemeContext";
import { ThemedView, ThemedText } from "@/components/themed";
import { useFoodContext } from "@/context/FoodContext";

export default function AddFood() {
  const [name, setName] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [portion, setPortion] = useState<string>("");

  const router = useRouter();
  const { saveMeal } = useFoodStorage();
  const { refreshFoods } = useFoodContext();
  const { theme } = useTheme();

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

  const inputStyle = {
    backgroundColor: theme.surface,
    color: theme.text,
    borderColor: theme.border,
  };

  return (
    <ThemedView className="flex-1 p-5">
      <Link asChild href={"/"}>
        <Pressable className="pb-2 active:opacity-80">
          <HomeIcon color={theme.primary} />
        </Pressable>
      </Link>

      <ThemedText
        className="text-xl font-bold mb-4"
        style={{ color: theme.text }}
      >
        Add New Food
      </ThemedText>

      <View className="mt-4 space-y-4">
        <View>
          <ThemedText className="mb-2" style={{ color: theme.text }}>
            Food Name
          </ThemedText>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter food name"
            className="p-3 rounded-lg border"
            style={inputStyle}
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View>
          <ThemedText className="mb-2" style={{ color: theme.text }}>
            Calories
          </ThemedText>
          <TextInput
            value={calories}
            onChangeText={setCalories}
            placeholder="Enter calories"
            keyboardType="numeric"
            className="p-3 rounded-lg border"
            style={inputStyle}
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View>
          <ThemedText className="mb-2" style={{ color: theme.text }}>
            Portion (grams)
          </ThemedText>
          <TextInput
            value={portion}
            onChangeText={setPortion}
            placeholder="Enter portion size"
            keyboardType="numeric"
            className="p-3 rounded-lg border"
            style={inputStyle}
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <TouchableOpacity
          onPress={handleSave}
          style={{ backgroundColor: theme.success }}
          className="mt-6 p-4 rounded-lg items-center"
        >
          <ThemedText style={{ color: theme.text }}>Save Food</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
