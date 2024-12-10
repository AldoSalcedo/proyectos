import React from "react";
import { Text, View } from "react-native";

const staticInfo = {
  name: "Aldo Salcedo",
  welcomeText: "Welcome Back to your goal",
};

export const UserInfo = () => {
  return (
    <View>
      <Text className="light  ">{`Hello ${staticInfo.name}`}</Text>
      <Text>{`${staticInfo.welcomeText}`}</Text>
    </View>
  );
};
