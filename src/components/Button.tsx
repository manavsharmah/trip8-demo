import React from "react";
import { Pressable, Text, ActivityIndicator, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "../theme/ThemeContext";
import { RADIUS } from "../theme/tokens";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  size?: "sm" | "md" | "lg";
}

export function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  size = "md",
}: ButtonProps) {
  const { colors, mode } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const isPrimary = variant === "primary";
  const isDisabled = disabled || loading;

  const paddingVertical = size === "sm" ? 8 : size === "md" ? 14 : 18;
  const paddingHorizontal = size === "sm" ? 16 : size === "md" ? 24 : 32;
  const fontSize = size === "sm" ? 13 : size === "md" ? 15 : 17;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={[
        animatedStyle,
        {
          backgroundColor: isPrimary ? colors.primary : "transparent",
          borderWidth: isPrimary ? 0 : 1.5,
          borderColor: isPrimary ? undefined : colors.primary,
          borderRadius: RADIUS.button,
          paddingVertical,
          paddingHorizontal,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          opacity: isDisabled ? 0.5 : 1,
          width: fullWidth ? "100%" : undefined,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isPrimary ? "#FFFFFF" : colors.primary}
        />
      ) : (
        <Text
          style={{
            color: isPrimary ? "#FFFFFF" : colors.primary,
            fontFamily: "Inter_600SemiBold",
            fontSize,
            letterSpacing: 0.3,
          }}
        >
          {title}
        </Text>
      )}
    </AnimatedPressable>
  );
}
