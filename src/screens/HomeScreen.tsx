import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Verified,
  Zap,
  Palette,
  Car,
  Hotel,
  Map,
  Sparkles,
  ArrowRight,
  Star,
  Quote,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList, Testimonial } from "../types";
import { useTheme } from "../theme/ThemeContext";
import { SPACING, RADIUS, ICON_SIZE, ICON_STROKE_WIDTH } from "../theme/tokens";
import { useTrendingPackages } from "../data/usePackages";
import { SectionHeader } from "../components/SectionHeader";
import { PackageCard } from "../components/PackageCard";
import { Button } from "../components/Button";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ─── Trust Tags ───
const trustTags = [
  { icon: Verified, label: "Verified" },
  { icon: Zap, label: "Instant" },
  { icon: Palette, label: "Custom" },
];

// ─── Service Pillars ───
const services = [
  {
    icon: Car,
    title: "Car Rentals & Self-Drive",
    bullets: ["Sanitized vehicles", "GPS-equipped", "24/7 roadside assist"],
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80",
  },
  {
    icon: Hotel,
    title: "Hotels & Stays",
    bullets: ["Verified properties", "Best price match", "Free cancellation"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
  },
  {
    icon: Map,
    title: "Complete Tour Packages",
    bullets: ["All-inclusive pricing", "Expert local guides", "Flexible plans"],
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80",
  },
  {
    icon: Sparkles,
    title: "Unique Experiences",
    bullets: ["Cultural immersion", "Adventure activities", "Hidden gems"],
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80",
  },
];

// ─── How It Works Steps ───
const howItWorks = [
  {
    num: "01",
    title: "Tell Us Your Dream Trip",
    desc: "Enter your destination, dates, and preferences — we handle the rest.",
  },
  {
    num: "02",
    title: "Get Quotes from Verified Operators",
    desc: "Compare customized travel plans and pricing from trusted local experts.",
  },
  {
    num: "03",
    title: "Book & Travel Stress-Free",
    desc: "Confirm your favorite plan and enjoy your trip with Trip8 support.",
  },
];

// ─── Destinations ───
const destinations = [
  { name: "Assam", image: "https://images.unsplash.com/photo-1585753738828-e1e0b1000f7e?w=400&q=80" },
  { name: "Meghalaya", image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&q=80" },
  { name: "Arunachal Pradesh", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80" },
  { name: "Shillong", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80" },
  { name: "Tawang", image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&q=80" },
];

// ─── Testimonials ───
const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    text: "Trip8 made planning our Meghalaya trip so effortless! We got three quotes within hours and picked the best one. The living root bridge trek was the highlight of our lives.",
    avatar: "",
  },
  {
    id: "2",
    name: "Rahul Gupta",
    location: "Bangalore",
    rating: 5,
    text: "The Tawang expedition was breathtaking. Our Trip8 operator knew every hidden spot. Sela Pass in snow was magical — worth every penny.",
    avatar: "",
  },
  {
    id: "3",
    name: "Ananya Bose",
    location: "Kolkata",
    rating: 5,
    text: "I was hesitant about solo travel in the Northeast, but Trip8's verified operators gave me confidence. The Kaziranga safari exceeded all expectations!",
    avatar: "",
  },
  {
    id: "4",
    name: "Vikram Mehta",
    location: "Mumbai",
    rating: 4,
    text: "Compared to other travel platforms, Trip8 gave us genuinely customized options. No cookie-cutter packages — everything was tailored to our family's pace.",
    avatar: "",
  },
  {
    id: "5",
    name: "Sneha Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "The Dawki River is even more beautiful in person than photos. Trip8 found us an amazing homestay in Mawlynnong that wasn't on any other platform.",
    avatar: "",
  },
];

export function HomeScreen() {
  const { colors, mode } = useTheme();
  const navigation = useNavigation<NavProp>();
  const trendingPackages = useTrendingPackages();

  // Greeting based on time
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ─── Header ─── */}
        <View style={{ paddingHorizontal: SPACING.base, paddingTop: SPACING.base }}>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: colors.textSecondary,
            }}
          >
            {greeting}, Traveller 👋
          </Text>
        </View>

        {/* ─── Hero Section ─── */}
        <View
          style={{
            paddingHorizontal: SPACING.base,
            paddingTop: SPACING.lg,
            paddingBottom: SPACING.xl,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 32,
              color: colors.textPrimary,
              lineHeight: 40,
              marginBottom: SPACING.md,
            }}
          >
            Best North East Trip{"\n"}Experience at{" "}
            <Text style={{ color: colors.accent }}>Lowest Price</Text>
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 15,
              color: colors.textSecondary,
              lineHeight: 23,
              marginBottom: SPACING.lg,
            }}
          >
            Compare multiple quotes from verified travel operators. Custom itineraries,
            better deals, zero stress.
          </Text>

          {/* Trust Tags */}
          <View
            style={{
              flexDirection: "row",
              marginBottom: SPACING.lg,
              gap: SPACING.sm,
            }}
          >
            {trustTags.map((tag) => (
              <View
                key={tag.label}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: `${colors.primary}12`,
                  paddingHorizontal: SPACING.md,
                  paddingVertical: 6,
                  borderRadius: 9999,
                }}
              >
                <tag.icon
                  size={14}
                  color={colors.primary}
                  strokeWidth={ICON_STROKE_WIDTH}
                />
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 12,
                    color: colors.primary,
                    marginLeft: 4,
                  }}
                >
                  {tag.label}
                </Text>
              </View>
            ))}
          </View>

          {/* CTA Button */}
          <Button
            title="Get a Custom Quote"
            onPress={() => navigation.navigate("QuoteRequest", {})}
            fullWidth
          />
        </View>

        {/* ─── Service Pillars ─── */}
        <SectionHeader
          title="Everything You'll Need"
          subtitle="From transport to stays, we've got every detail covered"
        />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: SPACING.md,
            gap: SPACING.md,
          }}
        >
          {services.map((service) => (
            <View
              key={service.title}
              style={{
                width: (SCREEN_WIDTH - SPACING.md * 3) / 2,
                backgroundColor: colors.surface,
                borderRadius: RADIUS.card,
                overflow: "hidden",
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
                source={{ uri: service.image }}
                style={{ width: "100%", height: 100 }}
                resizeMode="cover"
              />
              <View style={{ padding: SPACING.md }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 14,
                    color: colors.textPrimary,
                    marginBottom: SPACING.sm,
                    lineHeight: 20,
                  }}
                >
                  {service.title}
                </Text>
                {service.bullets.map((b) => (
                  <View
                    key={b}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.success,
                        fontSize: 12,
                        marginRight: 4,
                      }}
                    >
                      ✓
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 11,
                        color: colors.textSecondary,
                      }}
                    >
                      {b}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* ─── Trending Trips ─── */}
        <View style={{ marginTop: SPACING.xl }}>
          <SectionHeader
            title="Trending Trips"
            subtitle="Most popular packages this season"
          />
          <View style={{ paddingHorizontal: SPACING.base, gap: SPACING.base }}>
            {trendingPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                title={pkg.title}
                region={pkg.region}
                duration={pkg.duration}
                price={pkg.price}
                image={pkg.heroImage}
                category={pkg.category}
                onPress={() =>
                  navigation.navigate("PackageDetail", { packageId: pkg.id })
                }
              />
            ))}
          </View>
        </View>

        {/* ─── How Trip8 Works ─── */}
        <View style={{ marginTop: SPACING.xl }}>
          <SectionHeader
            title="How Trip8 Works"
            subtitle="Three simple steps to your perfect trip"
          />
          <View style={{ paddingHorizontal: SPACING.base, gap: SPACING.lg }}>
            {howItWorks.map((step) => (
              <View
                key={step.num}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 40,
                    color: colors.accent,
                    lineHeight: 44,
                    marginRight: SPACING.base,
                    opacity: 0.7,
                    width: 50,
                  }}
                >
                  {step.num}
                </Text>
                <View style={{ flex: 1, paddingTop: 4 }}>
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 17,
                      color: colors.textPrimary,
                      marginBottom: 4,
                    }}
                  >
                    {step.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 14,
                      color: colors.textSecondary,
                      lineHeight: 21,
                    }}
                  >
                    {step.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ─── Destination Explorer ─── */}
        <View style={{ marginTop: SPACING.xl }}>
          <SectionHeader
            title="Plan Your Next Trip"
            subtitle="Choose a destination to get started"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: SPACING.base,
              gap: SPACING.md,
            }}
          >
            {destinations.map((dest) => (
              <Pressable
                key={dest.name}
                onPress={() =>
                  navigation.navigate("QuoteRequest", { destination: dest.name })
                }
                style={{
                  width: 150,
                  borderRadius: RADIUS.card,
                  overflow: "hidden",
                  backgroundColor: colors.surface,
                  borderWidth: mode === "dark" ? 1 : 0,
                  borderColor: colors.border,
                  ...(mode === "light"
                    ? {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.06,
                        shadowRadius: 6,
                        elevation: 2,
                      }
                    : {}),
                }}
              >
                <Image
                  source={{ uri: dest.image }}
                  style={{ width: 150, height: 100 }}
                  resizeMode="cover"
                />
                <View style={{ padding: SPACING.md }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 14,
                      color: colors.textPrimary,
                      marginBottom: SPACING.sm,
                    }}
                  >
                    {dest.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Inter_500Medium",
                        fontSize: 12,
                        color: colors.primary,
                      }}
                    >
                      Get Quote
                    </Text>
                    <ArrowRight
                      size={12}
                      color={colors.primary}
                      strokeWidth={ICON_STROKE_WIDTH}
                      style={{ marginLeft: 4 }}
                    />
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* ─── Testimonials ─── */}
        <View style={{ marginTop: SPACING.xl }}>
          <SectionHeader
            title="Why Travellers Love Trip8"
            subtitle="Real stories from real adventurers"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: SPACING.base,
              gap: SPACING.md,
            }}
          >
            {testimonials.map((t) => (
              <View
                key={t.id}
                style={{
                  width: SCREEN_WIDTH * 0.75,
                  backgroundColor: colors.surface,
                  borderRadius: RADIUS.card,
                  padding: SPACING.base,
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
                <Quote
                  size={24}
                  color={colors.accent}
                  strokeWidth={ICON_STROKE_WIDTH}
                  style={{ marginBottom: SPACING.md, opacity: 0.5 }}
                />
                <Text
                  numberOfLines={4}
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: colors.textPrimary,
                    lineHeight: 22,
                    marginBottom: SPACING.md,
                  }}
                >
                  "{t.text}"
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* Avatar placeholder */}
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: colors.primary,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: SPACING.sm,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 14,
                        color: "#FFFFFF",
                      }}
                    >
                      {t.name.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 13,
                        color: colors.textPrimary,
                      }}
                    >
                      {t.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 12,
                        color: colors.textSecondary,
                      }}
                    >
                      {t.location}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: "auto",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Star
                      size={14}
                      color={colors.accent}
                      fill={colors.accent}
                      strokeWidth={ICON_STROKE_WIDTH}
                    />
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 13,
                        color: colors.accent,
                        marginLeft: 4,
                      }}
                    >
                      {t.rating}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ─── Footer ─── */}
        <View
          style={{
            marginTop: SPACING.xl,
            paddingHorizontal: SPACING.base,
            paddingTop: SPACING.lg,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 18,
              color: colors.textPrimary,
              marginBottom: SPACING.sm,
            }}
          >
            trip8
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: colors.textSecondary,
              textAlign: "center",
              lineHeight: 18,
            }}
          >
            Near Ganesh Turning, Kahilipara{"\n"}Guwahati, Assam
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: colors.primary,
              marginTop: SPACING.sm,
            }}
          >
            hello@trip8.ai
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 11,
              color: colors.textSecondary,
              marginTop: SPACING.base,
            }}
          >
            © 2024 Trip8. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
