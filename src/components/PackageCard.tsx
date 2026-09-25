import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { MapPin, Clock } from "lucide-react-native";
import { useTheme } from "../theme/ThemeContext";
import { RADIUS, SPACING, ICON_SIZE, ICON_STROKE_WIDTH } from "../theme/tokens";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PackageCardProps {
  title: string;
  region: string;
  duration: string;
  price: number;
  image: string;
  category?: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function PackageCard({
  title,
  region,
  duration,
  price,
  image,
  category,
  onPress,
  style,
}: PackageCardProps) {
  const { colors, mode } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const formatPrice = (p: number) =>
    `₹${p.toLocaleString("en-IN")}`;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        animatedStyle,
        {
          backgroundColor: colors.surface,
          borderRadius: RADIUS.card,
          overflow: "hidden",
          borderWidth: mode === "dark" ? 1 : 0,
          borderColor: colors.border,
          // Light mode shadow
          ...(mode === "light"
            ? {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
              }
            : {}),
        },
        style,
      ]}
    >
      {/* Image */}
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 180,
          }}
          resizeMode="cover"
        />
        {/* Gold price pill */}
        <View
          style={{
            position: "absolute",
            bottom: -14,
            left: SPACING.md,
            backgroundColor: colors.accent,
            paddingHorizontal: SPACING.md,
            paddingVertical: 6,
            borderRadius: 9999,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 14,
              color: "#FFFFFF",
              letterSpacing: 0.3,
            }}
          >
            {formatPrice(price)}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={{ padding: SPACING.base, paddingTop: SPACING.lg }}>
        {/* Meta row */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: SPACING.xs,
          }}
        >
          <MapPin
            size={ICON_SIZE.sm}
            color={colors.textSecondary}
            strokeWidth={ICON_STROKE_WIDTH}
          />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: colors.textSecondary,
              marginLeft: 4,
            }}
          >
            {region}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              marginHorizontal: 6,
              fontSize: 12,
            }}
          >
            •
          </Text>
          <Clock
            size={ICON_SIZE.sm}
            color={colors.textSecondary}
            strokeWidth={ICON_STROKE_WIDTH}
          />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: colors.textSecondary,
              marginLeft: 4,
            }}
          >
            {duration}
          </Text>
          {category && (
            <>
              <Text
                style={{
                  color: colors.textSecondary,
                  marginHorizontal: 6,
                  fontSize: 12,
                }}
              >
                •
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: colors.textSecondary,
                }}
              >
                {category}
              </Text>
            </>
          )}
        </View>

        {/* Title */}
        <Text
          numberOfLines={2}
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 17,
            color: colors.textPrimary,
            lineHeight: 24,
          }}
        >
          {title}
        </Text>
      </View>
    </AnimatedPressable>
  );
}
