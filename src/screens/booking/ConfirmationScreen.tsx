import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckCircle2, PartyPopper, ArrowRight } from "lucide-react-native";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types";
import { useTheme } from "../../theme/ThemeContext";
import { SPACING, ICON_STROKE_WIDTH } from "../../theme/tokens";
import { useBookingsStore } from "../../store/useBookingsStore";
import { Button } from "../../components/Button";

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type ScreenRoute = RouteProp<RootStackParamList, "BookingConfirmation">;

export function ConfirmationScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const booking = useBookingsStore((state) =>
    state.bookings.find((b) => b.id === route.params.bookingId)
  );

  const handleViewBookings = () => {
    // Reset navigation stack to the tab navigator's MyBookings tab
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Main",
            state: {
              routes: [{ name: "MyBookings" }],
              index: 2,
            },
          },
        ],
      })
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: SPACING.xl,
      }}
    >
      {/* Success Icon */}
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: `${colors.success}18`,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: SPACING.lg,
        }}
      >
        <CheckCircle2 size={56} color={colors.success} strokeWidth={1.5} />
      </View>

      <Text
        style={{
          fontFamily: "Inter_700Bold",
          fontSize: 28,
          color: colors.textPrimary,
          textAlign: "center",
          marginBottom: SPACING.md,
        }}
      >
        Booking Confirmed! 🎉
      </Text>

      {booking && (
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: SPACING.base,
            marginBottom: SPACING.lg,
            width: "100%",
            alignItems: "center",
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 13,
              color: colors.textSecondary,
              marginBottom: 4,
            }}
          >
            Booking ID
          </Text>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 18,
              color: colors.accent,
              letterSpacing: 1,
            }}
          >
            {booking.id}
          </Text>
        </View>
      )}

      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 15,
          color: colors.textSecondary,
          textAlign: "center",
          lineHeight: 23,
          marginBottom: SPACING.lg,
        }}
      >
        Your trip has been booked successfully. You'll receive a confirmation
        with all the details shortly. Our travel operator will reach out to
        finalize the itinerary.
      </Text>

      {/* What happens next */}
      <View
        style={{
          backgroundColor: `${colors.primary}08`,
          borderRadius: 12,
          padding: SPACING.base,
          marginBottom: SPACING.xl,
          width: "100%",
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 15,
            color: colors.textPrimary,
            marginBottom: SPACING.md,
          }}
        >
          What happens next?
        </Text>
        {[
          "Travel operator confirms your booking within 24 hours",
          "You'll receive a detailed day-by-day itinerary",
          "Pre-trip support available via call or message anytime",
        ].map((item, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: SPACING.sm,
            }}
          >
            <ArrowRight
              size={14}
              color={colors.primary}
              strokeWidth={ICON_STROKE_WIDTH}
              style={{ marginTop: 3, marginRight: SPACING.sm }}
            />
            <Text
              style={{
                flex: 1,
                fontFamily: "Inter_400Regular",
                fontSize: 13,
                color: colors.textSecondary,
                lineHeight: 20,
              }}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>

      <Button
        title="View My Bookings"
        onPress={handleViewBookings}
        fullWidth
      />
    </SafeAreaView>
  );
}
