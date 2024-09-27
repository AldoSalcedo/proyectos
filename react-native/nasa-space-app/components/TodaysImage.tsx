import { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { PostImage } from "../types";
import { Link } from "expo-router";

export const TodaysImage: FC<PostImage> = ({
  url,
  date,
  title,
  explanation,
  hdurl,
}) => {
  return (
    <View className="bg-[#2c449d] mb-3 mx-6 rounded-3xl p-4">
      <View>
        <Image
          source={{ uri: url }}
          className="w-full rounded-3xl h-48 border-2 border-white"
        />
      </View>
      <Text className="text-white text-xl my-3 font-bold">{title}</Text>
      <Text className="text-white text-base">{date}</Text>
      <Link
        asChild
        href={`/${title}?date=${date}&url=${encodeURIComponent(url)}&explanation=${encodeURIComponent(explanation)}&hdurl=${encodeURIComponent(hdurl || "")}`}
        className="flex-row-reverse"
      >
        <Pressable>
          <Text className="text-blue-400 text-xl">View</Text>
        </Pressable>
      </Link>
    </View>
  );
};
