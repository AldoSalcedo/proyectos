import type { PropsWithChildren, ReactElement } from "react";
import { View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  return (
    <View>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View>{headerImage}</Animated.View>
        <View>{children}</View>
      </Animated.ScrollView>
    </View>
  );
}
