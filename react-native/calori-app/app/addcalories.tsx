import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { useFoodStorage } from "../hooks/useFoodStorage";

export default function AddCalories() {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [portion, setPortion] = useState("");
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { saveMeal } = useFoodStorage();

  async function handleSave() {
    if (!name || !calories || !portion) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await saveMeal({
        name,
        calories: Number(calories),
        portion: Number(portion),
      });
      Alert.alert("Success", "Food added successfully", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save food");
    }
  }

  return (
    <View className="flex-1 p-5" style={{ paddingTop: insets.top }}>
      <Text style={[styles.title, styles[`${theme}Text`]]}>Add New Food</Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, styles[`${theme}Text`]]}>Food Name</Text>
          <TextInput
            style={[styles.input, styles[`${theme}Input`]]}
            value={name}
            onChangeText={setName}
            placeholder="Enter food name"
            placeholderTextColor={theme === "dark" ? "#666" : "#999"}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, styles[`${theme}Text`]]}>Calories</Text>
          <TextInput
            style={[styles.input, styles[`${theme}Input`]]}
            value={calories}
            onChangeText={setCalories}
            placeholder="Enter calories"
            keyboardType="numeric"
            placeholderTextColor={theme === "dark" ? "#666" : "#999"}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, styles[`${theme}Text`]]}>
            Portion (grams)
          </Text>
          <TextInput
            style={[styles.input, styles[`${theme}Input`]]}
            value={portion}
            onChangeText={setPortion}
            placeholder="Enter portion size"
            keyboardType="numeric"
            placeholderTextColor={theme === "dark" ? "#666" : "#999"}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, styles[`${theme}Button`]]}
          onPress={handleSave}
        >
          <Text style={[styles.buttonText, styles[`${theme}ButtonText`]]}>
            Save Food
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  light: {
    backgroundColor: "#fff",
  },
  dark: {
    backgroundColor: "#1a1a1a",
  },
  christmas: {
    backgroundColor: "#2a4c2a",
  },
  lightText: {
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
  christmasText: {
    color: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    gap: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  lightInput: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    color: "#000",
  },
  darkInput: {
    backgroundColor: "#333",
    borderColor: "#666",
    color: "#fff",
  },
  christmasInput: {
    backgroundColor: "#1a331a",
    borderColor: "#4c724c",
    color: "#fff",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  lightButton: {
    backgroundColor: "#2ecc71",
  },
  darkButton: {
    backgroundColor: "#27ae60",
  },
  christmasButton: {
    backgroundColor: "#c0392b",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  lightButtonText: {
    color: "#fff",
  },
  darkButtonText: {
    color: "#fff",
  },
  christmasButtonText: {
    color: "#fff",
  },
});
