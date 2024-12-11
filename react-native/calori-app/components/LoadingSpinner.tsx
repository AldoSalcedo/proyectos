import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export function LoadingSpinner() {
  const { theme } = useTheme();

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator
        size="large"
        color={theme === "light" ? "#007AFF" : "#0A84FF"}
      />
    </View>
  );
}
