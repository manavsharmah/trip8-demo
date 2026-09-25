import React from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Calendar,
  Users,
  Compass,
  MapPin,
  Clock,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList, Booking, BookingStatus } from "../types";
import { useTheme } from "../theme/ThemeContext";
import { SPACING, RADIUS, ICON_SIZE, ICON_STROKE_WIDTH } from "../theme/tokens";
import { useBookingsStore } from "../store/useBookingsStore";
import { SectionHeader } from "../components/SectionHeader";
import { Button } from "../components/Button";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; colorKey: "accent" | "success" | "textSecondary" }
> = {
  pending: { label: "Pending", colorKey: "accent" },
  confirmed: { label: "Confirmed", colorKey: "success" },
  completed: { label: "Completed", colorKey: "success" },
  cancelled: { label: "Cancelled", colorKey: "textSecondary" },
};

function BookingCard({ booking }: { booking: Booking }) {
  const { colors, mode } = useTheme();
  const status = STATUS_CONFIG[booking.status];
  const statusColor = colors[status.colorKey];

  const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: RADIUS.card,
        overflow: "hidden",
        marginBottom: SPACING.base,
        borderWidth: mode === "dark" ? 1 : 0,
        borderColor: colors.border,
        ...(mode === "light"
          ? {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 2,
            }
          : {}),
      }}
    >
      <Image
        source={{ uri: booking.packageImage }}
        style={{ width: "100%", height: 120 }}
        resizeMode="cover"
      />
      <View style={{ padding: SPACING.base }}>
        {/* Status Badge */}
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: `${statusColor}18`,
            paddingHorizontal: SPACING.md,
            paddingVertical: 4,
            borderRadius: 9999,
            marginBottom: SPACING.sm,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 11,
              color: statusColor,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {status.label}
          </Text>
        </View>

        <Text
          numberOfLines={1}
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 17,
            color: colors.textPrimary,
            marginBottom: SPACING.sm,
          }}
        >
          {booking.packageTitle}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: SPACING.base,
            marginBottom: SPACING.sm,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MapPin
              size={13}
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
              {booking.packageRegion}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Clock
              size={13}
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
              {booking.packageDuration}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: colors.border,
            paddingTop: SPACING.md,
            marginTop: SPACING.xs,
          }}
        >
          <View style={{ flexDirection: "row", gap: SPACING.base }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Calendar
                size={13}
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
                {booking.startDate}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Users
                size={13}
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
                {booking.travelers}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
              color: colors.accent,
            }}
          >
            {formatPrice(booking.totalPrice)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export function MyBookingsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NavProp>();
  const bookings = useBookingsStore((state) => state.bookings);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SPACING.base,
          paddingBottom: SPACING.xl,
          flexGrow: 1,
        }}
        ListHeaderComponent={
          <SectionHeader
            title="My Bookings"
            subtitle={
              bookings.length > 0
                ? `${bookings.length} booking${bookings.length > 1 ? "s" : ""}`
                : undefined
            }
            style={{ paddingHorizontal: 0, paddingTop: SPACING.base }}
          />
        }
        renderItem={({ item }) => <BookingCard booking={item} />}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: SPACING.xl * 2,
            }}
          >
            <Compass
              size={56}
              color={colors.textSecondary}
              strokeWidth={1}
            />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 20,
                color: colors.textPrimary,
                marginTop: SPACING.base,
                textAlign: "center",
              }}
            >
              No bookings yet
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.textSecondary,
                marginTop: SPACING.sm,
                textAlign: "center",
                lineHeight: 21,
                paddingHorizontal: SPACING.xl,
              }}
            >
              Start exploring our packages and book your dream trip to
              North-East India!
            </Text>
            <Button
              title="Explore Packages"
              onPress={() => {
                // Navigate to explore tab
                navigation.getParent()?.navigate("Explore");
              }}
              style={{ marginTop: SPACING.lg }}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}
