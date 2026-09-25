import React, { useState } from "react";
import { View, Text, Pressable, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Check, ChevronDown } from "lucide-react-native";
import { useTheme } from "../theme/ThemeContext";
import { SPACING, ICON_SIZE, ICON_STROKE_WIDTH } from "../theme/tokens";

// ─── ChecklistItem ───

interface ChecklistItemProps {
  text: string;
  variant?: "gold" | "green";
  style?: ViewStyle;
}

export function ChecklistItem({
  text,
  variant = "green",
  style,
}: ChecklistItemProps) {
  const { colors } = useTheme();
  const iconColor = variant === "gold" ? colors.accent : colors.success;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "flex-start",
          paddingVertical: SPACING.sm,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          backgroundColor: `${iconColor}18`,
          alignItems: "center",
          justifyContent: "center",
          marginRight: SPACING.md,
          marginTop: 1,
        }}
      >
        <Check
          size={14}
          color={iconColor}
          strokeWidth={2.5}
        />
      </View>
      <Text
        style={{
          flex: 1,
          fontFamily: "Inter_400Regular",
          fontSize: 14,
          color: colors.textPrimary,
          lineHeight: 21,
        }}
      >
        {text}
      </Text>
    </View>
  );
}

// ─── FAQAccordionItem ───

interface FAQAccordionItemProps {
  question: string;
  answer: string;
  style?: ViewStyle;
}

export function FAQAccordionItem({
  question,
  answer,
  style,
}: FAQAccordionItemProps) {
  const { colors, mode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const rotation = useSharedValue(0);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    rotation.value = withTiming(isOpen ? 0 : 180, { duration: 250 });
  };

  return (
    <View
      style={[
        {
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      <Pressable
        onPress={toggleOpen}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: SPACING.base,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontFamily: "Inter_600SemiBold",
            fontSize: 15,
            color: colors.textPrimary,
            lineHeight: 22,
            paddingRight: SPACING.md,
          }}
        >
          {question}
        </Text>
        <Animated.View style={chevronStyle}>
          <ChevronDown
            size={ICON_SIZE.md}
            color={colors.textSecondary}
            strokeWidth={ICON_STROKE_WIDTH}
          />
        </Animated.View>
      </Pressable>

      {isOpen && (
        <View style={{ paddingBottom: SPACING.base }}>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: colors.textSecondary,
              lineHeight: 22,
            }}
          >
            {answer}
          </Text>
        </View>
      )}
    </View>
  );
}
