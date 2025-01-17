import React from "react";
import { TodayCalories } from "@/components/TodayCalories";
import { Header } from "@/components/Header";
import { FoodList } from "@/components/FoodList";
import { FoodItem } from "@/types";
import { NewFood } from "@/components/NewFood";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <Header name={"Aldo Salcedo"} />
      <NewFood />
      <TodayCalories meals={[]} />
      <FoodList
        onSelectFood={function (food: FoodItem): void {
          throw new Error("Function not implemented.");
        }}
      />
    </View>
  );
}
