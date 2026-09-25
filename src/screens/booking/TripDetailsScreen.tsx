import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, Users, BedDouble } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types";
import { useTheme } from "../../theme/ThemeContext";
import { SPACING, RADIUS, ICON_SIZE, ICON_STROKE_WIDTH } from "../../theme/tokens";
import { usePackage } from "../../data/usePackages";
import { ProgressSteps } from "../../components/ProgressSteps";
import { Button } from "../../components/Button";
import { Chip } from "../../components/Chip";
import { DatePickerField } from "../../components/DatePickerField";

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type ScreenRoute = RouteProp<RootStackParamList, "BookingTripDetails">;

const ROOM_OPTIONS = ["Standard", "Deluxe", "Premium", "No Preference"];

function formatDateForBooking(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function TripDetailsScreen() {
  const { colors, mode } = useTheme();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const pkg = usePackage(route.params.packageId);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [travelers, setTravelers] = useState(2);
  const [roomPreference, setRoomPreference] = useState("No Preference");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!pkg) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
            color: colors.textPrimary,
          }}
        >
          Package not found
        </Text>
      </SafeAreaView>
    );
  }

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};
    if (!startDate) newErrors.startDate = "Please select a start date";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    navigation.navigate("BookingReview", {
      packageId: pkg.id,
      travelers,
      startDate: formatDateForBooking(startDate!),
      roomPreference:
        roomPreference === "No Preference" ? undefined : roomPreference,
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      <ProgressSteps currentStep={1} totalSteps={3} stepLabel="Trip Details" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SPACING.base,
          paddingBottom: SPACING.xl,
        }}
      >
        {/* Package summary */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: RADIUS.card,
            padding: SPACING.base,
            marginBottom: SPACING.lg,
            borderWidth: mode === "dark" ? 1 : 0,
            borderColor: colors.border,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 17,
              color: colors.textPrimary,
              marginBottom: 4,
            }}
          >
            {pkg.title}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 13,
              color: colors.textSecondary,
            }}
          >
            {pkg.region} • {pkg.duration}
          </Text>
        </View>

        {/* Start Date — DatePickerField */}
        <View style={{ marginBottom: SPACING.lg }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: SPACING.sm,
            }}
          >
            <Calendar
              size={ICON_SIZE.sm}
              color={colors.accent}
              strokeWidth={ICON_STROKE_WIDTH}
            />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: colors.textPrimary,
                marginLeft: 6,
              }}
            >
              Trip Start Date
            </Text>
          </View>
          <DatePickerField
            placeholder="Select start date"
            value={startDate}
            onChange={(date) => {
              setStartDate(date);
              setErrors((prev) => ({ ...prev, startDate: "" }));
            }}
            error={errors.startDate}
          />
        </View>

        {/* Traveler Count */}
        <View style={{ marginBottom: SPACING.lg }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: SPACING.sm,
            }}
          >
            <Users
              size={ICON_SIZE.sm}
              color={colors.accent}
              strokeWidth={ICON_STROKE_WIDTH}
            />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: colors.textPrimary,
                marginLeft: 6,
              }}
            >
              Number of Travellers
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: SPACING.base,
            }}
          >
            <Pressable
              onPress={() => setTravelers(Math.max(1, travelers - 1))}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.surface,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 20,
                  color: colors.textPrimary,
                }}
              >
                −
              </Text>
            </Pressable>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 28,
                color: colors.textPrimary,
                minWidth: 48,
                textAlign: "center",
              }}
            >
              {travelers}
            </Text>
            <Pressable
              onPress={() => setTravelers(Math.min(10, travelers + 1))}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.surface,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 20,
                  color: colors.textPrimary,
                }}
              >
                +
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Room Preference */}
        <View style={{ marginBottom: SPACING.xl }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: SPACING.sm,
            }}
          >
            <BedDouble
              size={ICON_SIZE.sm}
              color={colors.accent}
              strokeWidth={ICON_STROKE_WIDTH}
            />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: colors.textPrimary,
                marginLeft: 6,
              }}
            >
              Room Preference
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {ROOM_OPTIONS.map((opt) => (
              <Chip
                key={opt}
                label={opt}
                selected={roomPreference === opt}
                onPress={() => setRoomPreference(opt)}
              />
            ))}
          </View>
        </View>

        <Button
          title="Continue to Review"
          onPress={handleContinue}
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
}
