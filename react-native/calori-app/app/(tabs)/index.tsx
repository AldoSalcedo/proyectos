import { Text, View } from "react-native";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { ThemeToggle } from "../../components/ThemeToggle";

export default function Index() {
  const { theme } = useTheme();

  return (
    <View
      className={`flex-1 p-6
        ${theme === "light" ? "bg-light-background" : ""}
        ${theme === "dark" ? "bg-dark-background" : ""}
        ${theme === "christmas" ? "bg-christmas-background" : ""}
      `}
    >
      <View className="flex-row align-center justify-between mb-6">
        <View>
          <Text
            className={`text-lg font-semibold mb-8
            ${theme === "light" ? "text-light-text" : ""}
            ${theme === "dark" ? "text-dark-text" : ""}
            ${theme === "christmas" ? "text-christmas-text" : ""}
          `}
          >
            Calories
          </Text>
        </View>
        <View>
          <Link asChild href="/addcalories">
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
          </Link>
        </View>
      </View>
      <ThemeToggle />
    </View>
  );
}
