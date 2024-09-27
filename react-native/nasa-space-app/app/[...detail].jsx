import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { HomeIcon } from "../assets/icons";

export default function About() {
  const { detail, url, explanation, date } = useLocalSearchParams();

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#2c549d" },
          headerLeft: () => (
            <Link asChild href="/" className="mr-3">
              <Pressable>
                <HomeIcon />
              </Pressable>
            </Link>
          ),
        }}
      />
      <ScrollView>
        <View className="bg-[#071a5d] p-4 rounded-3xl my-6 border-2 border-white">
          <Image
            source={{ uri: url }}
            className="w-full rounded-3xl h-48 border-2 border-white"
          />
          <Text className="text-white text-xl font-bold my-2">{detail}</Text>
          <Text className="text-white my-1 font-bold">{date}</Text>
          <Text className="text-white my-3">{explanation}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
