import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image } from "react-native";

interface IconProps {
  size?: number;
  color?: string;
  [key: string]: any;
}

interface AvatarProps {
  uri: string;
  [key: string]: any;
}

export const CircleInfoIcon = ({
  size = 24,
  color = "white",
  ...props
}: IconProps) => (
  <FontAwesome6 name="circle-info" size={size} color={color} {...props} />
);

export const HomeIcon = ({
  size = 32,
  color = "white",
  ...props
}: IconProps) => (
  <FontAwesome name="home" size={size} color={color} {...props} />
);

export const InfoIcon = ({
  size = 32,
  color = "white",
  ...props
}: IconProps) => (
  <FontAwesome name="info" size={size} color={color} {...props} />
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
