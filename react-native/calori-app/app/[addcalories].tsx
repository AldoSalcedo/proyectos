import { View, Text, Pressable, TextInput, Modal } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { styled } from "nativewind";
import { FoodInput } from "@/types/index";
import { useFoodStorage } from "@/hooks/useFoodStorage";
import { FoodList } from "@/components/FoodList";
import React from "react";

const StyledPressable = styled(Pressable);

export default function AddCalories() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [foods, setFoods] = useState<FoodInput[]>([]);
  const [originalFoods, setOriginalFoods] = useState<FoodInput[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const isFirstRender = useRef(true);

  const [foodInput, setFoodInput] = useState<FoodInput>({
    name: "",
    calories: null,
    portion: null,
  });

  const { onSaveFood, onGetFoods } = useFoodStorage();

  useEffect(() => {
    const loadInitialFoods = async () => {
      try {
        const savedFoods = await onGetFoods();
        setFoods(savedFoods || []);
        setOriginalFoods(savedFoods || []);
      } catch (error) {
        console.error("Error loading initial foods:", error);
      }
    };
    loadInitialFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFoodInput({ name: "", calories: null, portion: null });
  }, [isModalVisible]);

  const isFormValid = useMemo(() => {
    const isNameValid = foodInput.name.trim().length > 0;
    const isCaloriesValid =
      foodInput.calories !== null && foodInput.calories > 0;
    const isPortionValid = foodInput.portion !== null && foodInput.portion > 0;

    return isNameValid && isCaloriesValid && isPortionValid;
  }, [foodInput]);

  useEffect(() => {
    const errors: string[] = [];

    if (!foodInput.name.trim()) {
      errors.push("Name is required");
    }
    if (!foodInput.calories || foodInput.calories <= 0) {
      errors.push("Calories must be greater than 0");
    }
    if (!foodInput.portion || foodInput.portion <= 0) {
      errors.push("Portion must be greater than 0");
    }

    setValidationErrors(errors);
  }, [foodInput]);

  function handleInputChange(field: keyof FoodInput) {
    return (text: string) => {
      if (field === "name") {
        setFoodInput((prev) => ({ ...prev, [field]: text.trim() }));
        return;
      }

      // Handle numeric inputs
      const numericValue = text.replace(/[^0-9.]/g, ""); // Solo permite números y punto
      const parsedValue = numericValue ? parseFloat(numericValue) : null;

      setFoodInput((prev) => ({
        ...prev,
        [field]: parsedValue,
      }));
    };
  }

  const toggleModal = useCallback(() => {
    setIsModalVisible((prev) => !prev);
    // Limpiamos el formulario cuando se cierra el modal
    if (isModalVisible) {
      setFoodInput({
        name: "",
        calories: null,
        portion: null,
      });
    }
  }, [isModalVisible]);

  const handleAddFood = useCallback(async () => {
    if (!isFormValid) {
      setSuccessMessage("Please fill all fields correctly");
      return;
    }

    try {
      const foodToSave = {
        ...foodInput,
        calories: Number(foodInput.calories),
        portion: Number(foodInput.portion),
      };

      await onSaveFood(foodToSave);
      const updatedFoods = await onGetFoods();

      if (!updatedFoods) {
        throw new Error("Failed to get updated foods");
      }

      setFoods(updatedFoods);
      setSuccessMessage("Food added successfully!");

      setFoodInput({
        name: "",
        calories: null,
        portion: null,
      });

      setTimeout(() => {
        toggleModal();
        setSuccessMessage("");
      }, 1500);
    } catch (error) {
      console.error("Error saving food:", error);
      setSuccessMessage("Error saving food. Please try again.");
    }
  }, [foodInput, isFormValid, toggleModal, onSaveFood, onGetFoods]);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      // If search is empty, show all foods
      onGetFoods().then(setFoods);
      return;
    }

    // Filter foods based on search query
    const filteredFoods = foods.filter((food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFoods(filteredFoods);
  }, [searchQuery, foods, onGetFoods]);

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const savedFoods = await onGetFoods();
        if (searchQuery.length === 0) {
          setFoods(savedFoods || []);
        } else {
          setOriginalFoods(savedFoods || []);
        }
      } catch (error) {
        console.error("Error loading foods:", error);
      }
    };
    loadFoods();
  }, [onGetFoods, searchQuery]);

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
          <Pressable onPress={toggleModal}>
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
          <StyledPressable
            onPress={handleSearch}
            className={`px-6 py-2 rounded-lg
              ${theme === "light" ? "bg-green-500" : ""}
              ${theme === "dark" ? "bg-green-600" : ""}
              ${theme === "christmas" ? "bg-red-500" : ""}
            `}
          >
            <Text className="text-white font-semibold">Search</Text>
          </StyledPressable>
          {searchQuery.length > 0 && (
            <StyledPressable
              onPress={() => {
                setSearchQuery("");
                setFoods(originalFoods);
              }}
              className={`px-6 py-2 rounded-lg bg-gray-500`}
            >
              <Text className="text-white font-semibold">Clear</Text>
            </StyledPressable>
          )}
        </View>
      </View>

      {/* Success Message */}
      {successMessage && (
        <View className="mx-6 mb-4">
          <Text
            className={`p-3 rounded-lg text-center ${
              successMessage.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {successMessage}
          </Text>
        </View>
      )}

      {/* Foods List */}
      <FoodList foods={foods} />

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <Pressable
          className="flex-1 justify-center items-center bg-black/50"
          onPress={toggleModal}
        >
          <Pressable
            className={`m-5 p-6 rounded-2xl shadow-lg w-[90%] max-w-md
              ${theme === "light" ? "bg-white" : ""}
              ${theme === "dark" ? "bg-gray-800" : ""}
              ${theme === "christmas" ? "bg-white" : ""}
            `}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text
                className={`text-lg font-semibold
                  ${theme === "light" ? "text-black" : ""}
                  ${theme === "dark" ? "text-white" : ""}
                  ${theme === "christmas" ? "text-red-600" : ""}
                `}
              >
                Add Custom Food
              </Text>
              <Pressable onPress={toggleModal}>
                <AntDesign
                  name="close"
                  size={24}
                  color={theme === "dark" ? "#FFFFFF" : "#000000"}
                />
              </Pressable>
            </View>

            {/* Modal Content */}
            <View className="space-y-4">
              <TextInput
                className={`px-4 py-2 rounded-lg border
                  ${theme === "light" ? "border-gray-300 bg-white text-black" : ""}
                  ${theme === "dark" ? "border-gray-600 bg-gray-700 text-white" : ""}
                  ${theme === "christmas" ? "border-red-500 bg-white text-black" : ""}
                `}
                placeholder="Food name"
                placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                value={foodInput.name}
                onChangeText={handleInputChange("name")}
              />
              <TextInput
                className={`px-4 py-2 rounded-lg border
                  ${theme === "light" ? "border-gray-300 bg-white text-black" : ""}
                  ${theme === "dark" ? "border-gray-600 bg-gray-700 text-white" : ""}
                  ${theme === "christmas" ? "border-red-500 bg-white text-black" : ""}
                `}
                placeholder="Calories (e.g., 250)"
                placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                keyboardType="numeric"
                value={foodInput.calories?.toString() ?? ""}
                onChangeText={handleInputChange("calories")}
              />
              <TextInput
                className={`px-4 py-2 rounded-lg border
                  ${theme === "light" ? "border-gray-300 bg-white text-black" : ""}
                  ${theme === "dark" ? "border-gray-600 bg-gray-700 text-white" : ""}
                  ${theme === "christmas" ? "border-red-500 bg-white text-black" : ""}
                `}
                placeholder="Portion size (e.g., 100)"
                placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                keyboardType="numeric"
                value={foodInput.portion?.toString() ?? ""}
                onChangeText={handleInputChange("portion")}
              />
              <StyledPressable
                className={`py-3 rounded-lg ${
                  !isFormValid ? "opacity-50" : ""
                } ${
                  theme === "light"
                    ? "bg-green-500"
                    : theme === "dark"
                      ? "bg-green-600"
                      : "bg-red-500"
                }`}
                disabled={!isFormValid}
                onPress={handleAddFood}
              >
                <Text className="text-white font-semibold text-center">
                  Add Food
                </Text>
              </StyledPressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
