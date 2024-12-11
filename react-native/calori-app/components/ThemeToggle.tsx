import { TouchableOpacity, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <View className="flex-row space-x-2">
      <TouchableOpacity
        className={`px-4 py-2 rounded-lg ${
          theme === "light" ? "bg-light-primary" : "bg-gray-300"
        }`}
        onPress={() => setTheme("light")}
      >
        <Text className={theme === "light" ? "text-white" : "text-gray-600"}>
          Light
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`px-4 py-2 rounded-lg ${
          theme === "dark" ? "bg-dark-primary" : "bg-gray-300"
        }`}
        onPress={() => setTheme("dark")}
      >
        <Text className={theme === "dark" ? "text-white" : "text-gray-600"}>
          Dark
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`px-4 py-2 rounded-lg ${
          theme === "christmas" ? "bg-christmas-primary" : "bg-gray-300"
        }`}
        onPress={() => setTheme("christmas")}
      >
        <Text
          className={theme === "christmas" ? "text-white" : "text-gray-600"}
        >
          Christmas
        </Text>
      </TouchableOpacity>
    </View>
  );
}
