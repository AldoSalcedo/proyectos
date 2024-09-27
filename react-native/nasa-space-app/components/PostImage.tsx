import { FC, useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { PostImage as PostImageTypes } from "../types";
import { Link } from "expo-router";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export const PostImage: FC<PostImageTypes> = ({
  title,
  date,
  url,
  explanation,
  hdurl,
}) => {
  return (
    <Link
      href={`/${title}?date=${date}&url=${encodeURIComponent(url)}&explanation=${encodeURIComponent(explanation)}&hdurl=${encodeURIComponent(hdurl || "")}`}
      asChild
    >
      <StyledPressable className="active:opacity-70 border border-black active:border-white/50 bg-[#122771] rounded-2xl mb-3 p-4 mx-4">
        <View className="flex-shrink">
          <Text className="text-white font-bold text-lg mb-3">{title}</Text>
          <Text className="text-white">{date}</Text>
        </View>
      </StyledPressable>
    </Link>
  );
};

export function AnimatedPostImage({ ...postImage }: PostImageTypes) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity }}>
      <PostImage {...postImage} />
    </Animated.View>
  );
}
