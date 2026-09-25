import React from "react";
import { Pressable, Text } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { SPACING, RADIUS } from "../theme/tokens";

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function Chip({ label, selected, onPress }: ChipProps) {
  const { colors, mode } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: selected ? colors.primary : "transparent",
        borderWidth: selected ? 0 : 1,
        borderColor: colors.primary,
        borderRadius: 9999,
        paddingHorizontal: SPACING.base,
        paddingVertical: SPACING.sm,
        marginRight: SPACING.sm,
        marginBottom: SPACING.sm,
      }}
    >
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 13,
          color: selected ? "#FFFFFF" : colors.primary,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
