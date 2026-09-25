import React from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Calendar,
  Users,
  BedDouble,
  Edit3,
  MapPin,
  Clock,
} from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types";
import { useTheme } from "../../theme/ThemeContext";
import { SPACING, RADIUS, ICON_SIZE, ICON_STROKE_WIDTH } from "../../theme/tokens";
import { usePackage } from "../../data/usePackages";
import { useBookingsStore } from "../../store/useBookingsStore";
import { ProgressSteps } from "../../components/ProgressSteps";
import { Button } from "../../components/Button";

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type ScreenRoute = RouteProp<RootStackParamList, "BookingReview">;

export function ReviewScreen() {
  const { colors, mode } = useTheme();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { packageId, travelers, startDate, roomPreference } = route.params;
  const pkg = usePackage(packageId);
  const addBooking = useBookingsStore((state) => state.addBooking);

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

  const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;
  const baseTotal = pkg.price * travelers;
  const taxes = Math.round(baseTotal * 0.05); // 5% GST mock
  const serviceFee = 500;
  const grandTotal = baseTotal + taxes + serviceFee;

  const handleConfirm = () => {
    const bookingId = `BK${Date.now().toString(36).toUpperCase()}`;

    addBooking({
      id: bookingId,
      packageId: pkg.id,
      packageTitle: pkg.title,
      packageRegion: pkg.region,
      packageDuration: pkg.duration,
      packageImage: pkg.heroImage,
      travelers,
      startDate,
      totalPrice: grandTotal,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      roomPreference,
    });

    navigation.navigate("BookingConfirmation", { bookingId });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      <ProgressSteps currentStep={2} totalSteps={3} stepLabel="Review" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SPACING.base,
          paddingBottom: SPACING.xl,
        }}
      >
        {/* Package Summary Card */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: RADIUS.card,
            overflow: "hidden",
            marginBottom: SPACING.lg,
            borderWidth: mode === "dark" ? 1 : 0,
            borderColor: colors.border,
          }}
        >
          <Image
            source={{ uri: pkg.heroImage }}
            style={{ width: "100%", height: 140 }}
            resizeMode="cover"
          />
          <View style={{ padding: SPACING.base }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: colors.textPrimary,
                marginBottom: 4,
              }}
            >
              {pkg.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: SPACING.md,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MapPin
                  size={14}
                  color={colors.textSecondary}
                  strokeWidth={ICON_STROKE_WIDTH}
                />
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 13,
                    color: colors.textSecondary,
                    marginLeft: 4,
                  }}
                >
                  {pkg.region}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Clock
                  size={14}
                  color={colors.textSecondary}
                  strokeWidth={ICON_STROKE_WIDTH}
                />
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 13,
                    color: colors.textSecondary,
                    marginLeft: 4,
                  }}
                >
                  {pkg.duration}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Booking Details */}
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: SPACING.base,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: colors.textPrimary,
              }}
            >
              Booking Details
            </Text>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Edit3
                size={14}
                color={colors.primary}
                strokeWidth={ICON_STROKE_WIDTH}
              />
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 13,
                  color: colors.primary,
                  marginLeft: 4,
                }}
              >
                Edit
              </Text>
            </Pressable>
          </View>

          <DetailRow
            icon={Calendar}
            label="Start Date"
            value={startDate}
            colors={colors}
          />
          <DetailRow
            icon={Users}
            label="Travellers"
            value={`${travelers} ${travelers === 1 ? "person" : "people"}`}
            colors={colors}
          />
          {roomPreference && (
            <DetailRow
              icon={BedDouble}
              label="Room"
              value={roomPreference}
              colors={colors}
            />
          )}
        </View>

        {/* Price Breakdown */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: RADIUS.card,
            padding: SPACING.base,
            marginBottom: SPACING.xl,
            borderWidth: mode === "dark" ? 1 : 0,
            borderColor: colors.border,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: colors.textPrimary,
              marginBottom: SPACING.base,
            }}
          >
            Price Breakdown
          </Text>

          <PriceRow
            label={`${formatPrice(pkg.price)} × ${travelers} traveller${travelers > 1 ? "s" : ""}`}
            value={formatPrice(baseTotal)}
            colors={colors}
          />
          <PriceRow
            label="GST (5%)"
            value={formatPrice(taxes)}
            colors={colors}
          />
          <PriceRow
            label="Service fee"
            value={formatPrice(serviceFee)}
            colors={colors}
          />

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: colors.border,
              marginTop: SPACING.md,
              paddingTop: SPACING.md,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: colors.textPrimary,
              }}
            >
              Total
            </Text>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 22,
                color: colors.accent,
              }}
            >
              {formatPrice(grandTotal)}
            </Text>
          </View>
        </View>

        <Button
          title="Confirm & Book"
          onPress={handleConfirm}
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Helper Components ───

function DetailRow({
  icon: Icon,
  label,
  value,
  colors,
}: {
  icon: any;
  label: string;
  value: string;
  colors: any;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.md,
      }}
    >
      <Icon
        size={ICON_SIZE.sm}
        color={colors.textSecondary}
        strokeWidth={ICON_STROKE_WIDTH}
      />
      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 13,
          color: colors.textSecondary,
          marginLeft: 8,
          width: 80,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 14,
          color: colors.textPrimary,
          flex: 1,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function PriceRow({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: any;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: SPACING.sm,
      }}
    >
      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 14,
          color: colors.textSecondary,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 14,
          color: colors.textPrimary,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
