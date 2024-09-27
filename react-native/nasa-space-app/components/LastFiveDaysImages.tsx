import { FC } from "react";
import { Text, View } from "react-native";
import { PostImage as PostImageTypes } from "../types";
import { AnimatedPostImage } from "./PostImage";

export const LastFiveDAysImages: FC<{ postImages?: PostImageTypes[] }> = ({
  postImages,
}) => {
  return (
    <View className="flex-1 my-2">
      <Text className="text-white mb-5 text-base">Last 5 Days</Text>
      {postImages?.map((postImage) => (
        <AnimatedPostImage
          key={`post-image-${postImage.title}`}
          {...postImage}
        />
      ))}
    </View>
  );
};
