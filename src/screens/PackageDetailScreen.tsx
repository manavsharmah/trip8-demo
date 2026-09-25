import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Sun,
  Car,
  Home,
  Shield,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList, ItineraryDay } from "../types";
import { useTheme } from "../theme/ThemeContext";
import { SPACING, RADIUS, ICON_SIZE, ICON_STROKE_WIDTH } from "../theme/tokens";
import { usePackage } from "../data/usePackages";
import { Button } from "../components/Button";
import { ChecklistItem, FAQAccordionItem } from "../components/ChecklistItem";
import { SectionHeader } from "../components/SectionHeader";

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type ScreenRoute = RouteProp<RootStackParamList, "PackageDetail">;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ─── Quick Fact Icon Map ───
const quickFactIcons = {
  bestSeason: Sun,
  vehicleType: Car,
  stayType: Home,
  safetyRating: Shield,
};

const quickFactLabels: Record<string, string> = {
  bestSeason: "Best Season",
  vehicleType: "Vehicle",
  stayType: "Stay Type",
  safetyRating: "Safety",
};

// ─── Itinerary Day Card ───
function ItineraryDayCard({ day }: { day: ItineraryDay }) {
  const { colors, mode } = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      style={{
        backgroundColor: colors.surface,
        borderRadius: RADIUS.card,
        padding: SPACING.base,
        marginBottom: SPACING.md,
        borderWidth: mode === "dark" ? 1 : 0,
        borderColor: colors.border,
        ...(mode === "light"
          ? {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 1,
            }
          : {}),
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Day Badge */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.accent,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SPACING.md,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 14,
              color: "#FFFFFF",
            }}
          >
            D{day.day}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 15,
              color: colors.textPrimary,
              lineHeight: 21,
            }}
          >
            {day.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
              gap: SPACING.md,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MapPin
                size={12}
                color={colors.textSecondary}
                strokeWidth={ICON_STROKE_WIDTH}
              />
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: colors.textSecondary,
                  marginLeft: 3,
                }}
              >
                {day.distance}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Clock
                size={12}
                color={colors.textSecondary}
                strokeWidth={ICON_STROKE_WIDTH}
              />
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: colors.textSecondary,
                  marginLeft: 3,
                }}
              >
                {day.duration}
              </Text>
            </View>
          </View>
        </View>

        {expanded ? (
          <ChevronUp
            size={ICON_SIZE.md}
            color={colors.textSecondary}
            strokeWidth={ICON_STROKE_WIDTH}
          />
        ) : (
          <ChevronDown
            size={ICON_SIZE.md}
            color={colors.textSecondary}
            strokeWidth={ICON_STROKE_WIDTH}
          />
        )}
      </View>

      {expanded && (
        <View style={{ marginTop: SPACING.md, paddingLeft: 52 }}>
          {day.activities.map((activity, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: SPACING.sm,
              }}
            >
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: colors.accent,
                  marginTop: 6,
                  marginRight: SPACING.sm,
                }}
              />
              <Text
                style={{
                  flex: 1,
                  fontFamily: "Inter_400Regular",
                  fontSize: 13,
                  color: colors.textPrimary,
                  lineHeight: 20,
                }}
              >
                {activity}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  );
}

// ─── Main Screen ───
export function PackageDetailScreen() {
  const { colors, mode } = useTheme();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const pkg = usePackage(route.params.packageId);

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
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          variant="secondary"
          style={{ marginTop: SPACING.base }}
        />
      </SafeAreaView>
    );
  }

  const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* ─── Hero Image ─── */}
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: pkg.heroImage }}
            style={{ width: SCREEN_WIDTH, height: 300 }}
            resizeMode="cover"
          />
          {/* Gradient overlay */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 120,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          />
          {/* Back button */}
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              top: 50,
              left: SPACING.base,
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeft size={22} color="#FFFFFF" strokeWidth={ICON_STROKE_WIDTH} />
          </Pressable>

          {/* Title overlay */}
          <View
            style={{
              position: "absolute",
              bottom: SPACING.base,
              left: SPACING.base,
              right: SPACING.base,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 13,
                color: "rgba(255,255,255,0.85)",
                marginBottom: 4,
              }}
            >
              {pkg.region} • {pkg.duration}
            </Text>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 24,
                color: "#FFFFFF",
                lineHeight: 30,
              }}
            >
              {pkg.title}
            </Text>
          </View>
        </View>

        {/* ─── Quick Facts ─── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: SPACING.base,
            paddingVertical: SPACING.base,
            gap: SPACING.md,
          }}
        >
          {(
            Object.keys(quickFactIcons) as Array<keyof typeof quickFactIcons>
          ).map((key) => {
            const Icon = quickFactIcons[key];
            return (
              <View
                key={key}
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: RADIUS.card,
                  padding: SPACING.md,
                  minWidth: 100,
                  alignItems: "center",
                  borderWidth: mode === "dark" ? 1 : 0,
                  borderColor: colors.border,
                  ...(mode === "light"
                    ? {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.04,
                        shadowRadius: 4,
                        elevation: 1,
                      }
                    : {}),
                }}
              >
                <Icon
                  size={ICON_SIZE.md}
                  color={colors.accent}
                  strokeWidth={ICON_STROKE_WIDTH}
                />
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 11,
                    color: colors.textSecondary,
                    marginTop: 6,
                  }}
                >
                  {quickFactLabels[key]}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 13,
                    color: colors.textPrimary,
                    marginTop: 2,
                    textAlign: "center",
                  }}
                >
                  {pkg.quickFacts[key]}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        {/* ─── Description ─── */}
        <View style={{ paddingHorizontal: SPACING.base, paddingBottom: SPACING.base }}>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: colors.textSecondary,
              lineHeight: 22,
            }}
          >
            {pkg.description}
          </Text>
        </View>

        {/* ─── Photo Gallery ─── */}
        <View style={{ marginBottom: SPACING.lg }}>
          <SectionHeader title="Photo Gallery" style={{ paddingBottom: 0 }} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: SPACING.base,
              gap: SPACING.md,
              paddingTop: SPACING.md,
            }}
          >
            {pkg.gallery.map((uri, i) => (
              <Image
                key={i}
                source={{ uri }}
                style={{
                  width: 240,
                  height: 160,
                  borderRadius: RADIUS.card,
                }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        </View>

        {/* ─── Itinerary ─── */}
        <View style={{ paddingHorizontal: SPACING.base }}>
          <SectionHeader
            title="Day-by-Day Itinerary"
            subtitle="Tap each day to see activities"
            style={{ paddingHorizontal: 0 }}
          />
          {pkg.itinerary.map((day) => (
            <ItineraryDayCard key={day.day} day={day} />
          ))}
        </View>

        {/* ─── Trip Highlights ─── */}
        <View style={{ paddingHorizontal: SPACING.base, marginTop: SPACING.base }}>
          <SectionHeader
            title="Trip Highlights"
            style={{ paddingHorizontal: 0 }}
          />
          {pkg.highlights.map((h, i) => (
            <ChecklistItem key={i} text={h} variant="gold" />
          ))}
        </View>

        {/* ─── What's Included ─── */}
        <View style={{ paddingHorizontal: SPACING.base, marginTop: SPACING.lg }}>
          <SectionHeader
            title="What's Included"
            style={{ paddingHorizontal: 0 }}
          />
          {pkg.inclusions.map((inc, i) => (
            <ChecklistItem key={i} text={inc} variant="green" />
          ))}
        </View>

        {/* ─── FAQ ─── */}
        <View style={{ paddingHorizontal: SPACING.base, marginTop: SPACING.lg }}>
          <SectionHeader
            title="Frequently Asked Questions"
            style={{ paddingHorizontal: 0 }}
          />
          {pkg.faqs.map((faq, i) => (
            <FAQAccordionItem
              key={i}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </View>
      </ScrollView>

      {/* ─── Sticky Bottom Price Bar ─── */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.surface,
          paddingHorizontal: SPACING.base,
          paddingVertical: SPACING.md,
          paddingBottom: SPACING.lg,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderTopWidth: 1,
          borderTopColor: colors.border,
          ...(mode === "light"
            ? {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 8,
              }
            : {}),
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: colors.textSecondary,
            }}
          >
            Starting from
          </Text>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 24,
              color: colors.accent,
            }}
          >
            {formatPrice(pkg.price)}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 11,
              color: colors.textSecondary,
            }}
          >
            per person
          </Text>
        </View>
        <Button
          title="Book This Trip"
          onPress={() =>
            navigation.navigate("BookingTripDetails", { packageId: pkg.id })
          }
          size="lg"
        />
      </View>
    </View>
  );
}
