import React from "react";
import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  User,
  Moon,
  Sun,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  FileText,
  Shield,
  Cookie,
  CreditCard,
  ExternalLink,
} from "lucide-react-native";
import { useTheme } from "../theme/ThemeContext";
import { SPACING, RADIUS, ICON_SIZE, ICON_STROKE_WIDTH } from "../theme/tokens";
import { SectionHeader } from "../components/SectionHeader";
import { FAQAccordionItem } from "../components/ChecklistItem";

const FAQS = [
  {
    question: "What is Trip8?",
    answer:
      "Trip8 is a travel marketplace where you can get multiple quotes from verified travel agencies for your custom trip to North-East India. Compare prices, read reviews, chat with operators, and book — all in one place.",
  },
  {
    question: "How is Trip8 different from MakeMyTrip or other travel apps?",
    answer:
      "Unlike fixed-package platforms, Trip8 connects you directly with local travel operators who compete to offer you the best customized plan. Our AI-powered suggestions and multiple-quote system ensure you get truly personalized itineraries at competitive prices.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Simply go to the 'Get a Custom Quote' section, fill in your destination, travel dates, number of travelers, and any preferences. Within minutes, verified travel partners will send you customized quotes to compare.",
  },
  {
    question: "Are there any hidden charges?",
    answer:
      "No hidden charges at all. Trip8 is committed to transparent pricing. The price you see in your quote is the price you pay. All taxes and fees are clearly itemized during the booking review.",
  },
];

const LEGAL_LINKS = [
  { icon: Shield, label: "Privacy Policy" },
  { icon: Cookie, label: "Cookie Policy" },
  { icon: FileText, label: "Terms & Conditions" },
  { icon: CreditCard, label: "Refunds & Cancellation" },
];

export function ProfileScreen() {
  const { colors, mode, toggleTheme } = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SPACING.xl }}
      >
        {/* User Info */}
        <View
          style={{
            alignItems: "center",
            paddingVertical: SPACING.xl,
            paddingHorizontal: SPACING.base,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: SPACING.md,
            }}
          >
            <User size={36} color="#FFFFFF" strokeWidth={ICON_STROKE_WIDTH} />
          </View>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 22,
              color: colors.textPrimary,
            }}
          >
            Guest User
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: colors.textSecondary,
              marginTop: SPACING.xs,
            }}
          >
            Welcome to Trip8
          </Text>
        </View>

        {/* Theme Toggle */}
        <View
          style={{
            marginHorizontal: SPACING.base,
            marginBottom: SPACING.lg,
          }}
        >
          <Pressable
            onPress={toggleTheme}
            style={{
              backgroundColor: colors.surface,
              borderRadius: RADIUS.card,
              padding: SPACING.base,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: mode === "dark" ? 1 : 0,
              borderColor: colors.border,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {mode === "dark" ? (
                <Moon
                  size={ICON_SIZE.md}
                  color={colors.accent}
                  strokeWidth={ICON_STROKE_WIDTH}
                />
              ) : (
                <Sun
                  size={ICON_SIZE.md}
                  color={colors.accent}
                  strokeWidth={ICON_STROKE_WIDTH}
                />
              )}
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 15,
                  color: colors.textPrimary,
                  marginLeft: SPACING.md,
                }}
              >
                {mode === "dark" ? "Dark Mode" : "Light Mode"}
              </Text>
            </View>
            <View
              style={{
                width: 48,
                height: 28,
                borderRadius: 14,
                backgroundColor: mode === "dark" ? colors.primary : colors.border,
                justifyContent: "center",
                padding: 3,
              }}
            >
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: "#FFFFFF",
                  alignSelf: mode === "dark" ? "flex-end" : "flex-start",
                }}
              />
            </View>
          </Pressable>
        </View>

        {/* FAQ */}
        <View style={{ paddingHorizontal: SPACING.base }}>
          <SectionHeader
            title="Still Have Questions?"
            subtitle="Everything you need to know about Trip8"
            style={{ paddingHorizontal: 0 }}
          />
          {FAQS.map((faq, i) => (
            <FAQAccordionItem
              key={i}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </View>

        {/* Contact */}
        <View
          style={{
            paddingHorizontal: SPACING.base,
            marginTop: SPACING.xl,
          }}
        >
          <SectionHeader
            title="Get in Touch"
            subtitle="We'd love to hear from you"
            style={{ paddingHorizontal: 0 }}
          />
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: RADIUS.card,
              padding: SPACING.base,
              borderWidth: mode === "dark" ? 1 : 0,
              borderColor: colors.border,
              gap: SPACING.md,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MapPin
                size={ICON_SIZE.sm}
                color={colors.accent}
                strokeWidth={ICON_STROKE_WIDTH}
              />
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: colors.textPrimary,
                  marginLeft: SPACING.sm,
                  flex: 1,
                }}
              >
                Near Ganesh Turning, Kahilipara, Guwahati, Assam
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Mail
                size={ICON_SIZE.sm}
                color={colors.accent}
                strokeWidth={ICON_STROKE_WIDTH}
              />
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: colors.primary,
                  marginLeft: SPACING.sm,
                }}
              >
                hello@trip8.ai
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: SPACING.base }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Instagram
                  size={ICON_SIZE.sm}
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
                  @trip8.ai
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Linkedin
                  size={ICON_SIZE.sm}
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
                  trip8ai
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Legal Links */}
        <View
          style={{
            paddingHorizontal: SPACING.base,
            marginTop: SPACING.xl,
          }}
        >
          <SectionHeader
            title="Legal"
            style={{ paddingHorizontal: 0 }}
          />
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: RADIUS.card,
              overflow: "hidden",
              borderWidth: mode === "dark" ? 1 : 0,
              borderColor: colors.border,
            }}
          >
            {LEGAL_LINKS.map((link, i) => (
              <Pressable
                key={link.label}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: SPACING.base,
                  paddingVertical: SPACING.md,
                  borderBottomWidth: i < LEGAL_LINKS.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <link.icon
                    size={ICON_SIZE.sm}
                    color={colors.textSecondary}
                    strokeWidth={ICON_STROKE_WIDTH}
                  />
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 14,
                      color: colors.textPrimary,
                      marginLeft: SPACING.md,
                    }}
                  >
                    {link.label}
                  </Text>
                </View>
                <ExternalLink
                  size={14}
                  color={colors.textSecondary}
                  strokeWidth={ICON_STROKE_WIDTH}
                />
              </Pressable>
            ))}
          </View>
        </View>

        {/* App Version */}
        <View
          style={{
            alignItems: "center",
            marginTop: SPACING.xl,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: colors.textSecondary,
            }}
          >
            Trip8 v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
