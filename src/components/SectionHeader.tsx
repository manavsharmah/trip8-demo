import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { SPACING } from "../theme/tokens";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
}

export function SectionHeader({ title, subtitle, style }: SectionHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={[{ marginBottom: SPACING.base, paddingHorizontal: SPACING.base }, style]}>
      <Text
        style={{
          fontFamily: "Inter_700Bold",
          fontSize: 24,
          color: colors.textPrimary,
          lineHeight: 32,
        }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: colors.textSecondary,
            marginTop: SPACING.xs,
            lineHeight: 20,
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}
