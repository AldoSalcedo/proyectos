import { View, Text, Pressable, TextInput } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

export default function AddCalories() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch() {
    // Implement search logic here
    console.log("Searching for:", searchQuery);
  }

  return (
    <View
      className={`flex-1 p-6
        ${theme === "light" ? "bg-light-background" : ""}
        ${theme === "dark" ? "bg-dark-background" : ""}
        ${theme === "christmas" ? "bg-christmas-background" : ""}
      `}
    >
      <View className="flex-row align-center justify-between mx-6">
        <View>
          <Text
            className={`text-xl mb-8
              ${theme === "light" ? "text-light-text" : ""}
              ${theme === "dark" ? "text-dark-text" : ""}
              ${theme === "christmas" ? "text-christmas-text" : ""}
            `}
          >
            Add Food
          </Text>
        </View>
        <View>
          <Pressable>
            <AntDesign
              name="pluscircle"
              size={24}
              color={
                theme === "light"
                  ? "#000000"
                  : theme === "dark"
                    ? "#FFFFFF"
                    : theme === "christmas"
                      ? "#FF0000"
                      : "#000000"
              }
            />
          </Pressable>
        </View>
      </View>

      {/* Search Section */}
      <View className="mx-6 mb-4">
        <View className="flex-row space-x-2">
          <TextInput
            className={`flex-1 px-4 py-2 rounded-lg border
              ${theme === "light" ? "border-gray-300 bg-white text-black" : ""}
              ${theme === "dark" ? "border-gray-600 bg-gray-800 text-white" : ""}
              ${theme === "christmas" ? "border-red-500 bg-white text-black" : ""}
            `}
            placeholder="Search for food..."
            placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable
            onPress={handleSearch}
            className={`px-6 py-2 rounded-lg
              ${theme === "light" ? "bg-blue-500" : ""}
              ${theme === "dark" ? "bg-blue-600" : ""}
              ${theme === "christmas" ? "bg-red-500" : ""}
            `}
          >
            <Text className="text-white font-semibold">Search</Text>
          </Pressable>
        </View>
      </View>

      <Link href="/" className="mt-4">
        <Text
          className={`
            ${theme === "light" ? "text-light-text" : ""}
            ${theme === "dark" ? "text-dark-text" : ""}
            ${theme === "christmas" ? "text-christmas-text" : ""}
          `}
        >
          Go back
        </Text>
      </Link>
    </View>
  );
}
