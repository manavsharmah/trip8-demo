import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { SPACING } from "../theme/tokens";

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
  style?: ViewStyle;
}

export function ProgressSteps({
  currentStep,
  totalSteps,
  stepLabel,
  style,
}: ProgressStepsProps) {
  const { colors } = useTheme();

  return (
    <View style={[{ paddingHorizontal: SPACING.base, paddingVertical: SPACING.md }, style]}>
      {/* Segmented bar */}
      <View
        style={{
          flexDirection: "row",
          gap: 6,
          marginBottom: SPACING.sm,
        }}
      >
        {Array.from({ length: totalSteps }).map((_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              backgroundColor:
                i < currentStep ? colors.accent : colors.border,
            }}
          />
        ))}
      </View>

      {/* Step caption */}
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 13,
          color: colors.textSecondary,
        }}
      >
        Step {currentStep} of {totalSteps} — {stepLabel}
      </Text>
    </View>
  );
}
