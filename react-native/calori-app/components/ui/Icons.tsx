import React from "react";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface IconProps {
  size?: number;
  color?: string;
  [key: string]: any;
}

interface AvatarProps {
  uri: string;
  [key: string]: any;
}

export const HomeIcon = ({
  size = 32,
  color = "white",
  ...props
}: IconProps) => <AntDesign name="home" size={size} color={color} {...props} />;

export const InfoIcon = ({
  size = 32,
  color = "green",
  ...props
}: IconProps) => (
  <AntDesign name="pluscircle" size={size} color={color} {...props} />
);

export const UserAvatar = ({ uri, ...props }: AvatarProps) => (
  <Image
    source={{
      uri: uri,
    }}
    style={{ width: 40, height: 40, borderRadius: 30 }}
    {...props}
  />
);
