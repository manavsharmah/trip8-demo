import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  FadeInLeft,
  FadeOutRight,
} from "react-native-reanimated";
import {
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  CheckCircle2,
  X,
  Compass,
  Heart,
  Wallet,
  Gauge,
  ArrowLeft,
  Mountain,
  TreePine,
  Landmark,
  Binoculars,
  Shuffle,
  User,
  HeartHandshake,
  Baby,
  UsersRound,
} from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type {
  RootStackParamList,
  TripVibe,
  TravelCompanions,
  BudgetRange,
  TravelPace,
} from "../types";
import { useTheme } from "../theme/ThemeContext";
import { SPACING, RADIUS, ICON_SIZE, ICON_STROKE_WIDTH } from "../theme/tokens";
import { ProgressSteps } from "../components/ProgressSteps";
import { Button } from "../components/Button";
import { DatePickerField } from "../components/DatePickerField";

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type ScreenRoute = RouteProp<RootStackParamList, "QuoteRequest">;

const TOTAL_STEPS = 7;

const DESTINATION_OPTIONS = [
  "Assam",
  "Meghalaya",
  "Arunachal Pradesh",
  "Shillong",
  "Tawang",
  "Not sure yet",
];

const VIBE_OPTIONS: { label: TripVibe; icon: any }[] = [
  { label: "Adventure & Trekking", icon: Mountain },
  { label: "Relaxation & Nature", icon: TreePine },
  { label: "Culture & Heritage", icon: Landmark },
  { label: "Wildlife & Safari", icon: Binoculars },
  { label: "A mix of everything", icon: Shuffle },
];

const COMPANION_OPTIONS: { label: TravelCompanions; icon: any }[] = [
  { label: "Solo", icon: User },
  { label: "Couple", icon: HeartHandshake },
  { label: "Family with kids", icon: Baby },
  { label: "Group of friends", icon: UsersRound },
];

const BUDGET_OPTIONS: BudgetRange[] = [
  "Under ₹15,000",
  "₹15,000 – ₹30,000",
  "₹30,000 – ₹50,000",
  "₹50,000+",
];

const PACE_OPTIONS: { label: TravelPace; emoji: string }[] = [
  { label: "Packed & action-filled", emoji: "🏃" },
  { label: "Balanced mix", emoji: "⚖️" },
  { label: "Slow & relaxed", emoji: "🧘" },
];

const STEP_LABELS = [
  "Destination",
  "Trip Vibe",
  "Travelers",
  "Budget",
  "Pace",
  "Dates & Count",
  "Preferences",
];

export function QuoteRequestScreen() {
  const { colors, mode } = useTheme();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();

  // State for all quiz steps
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [destination, setDestination] = useState(
    route.params?.destination || ""
  );
  const [tripVibe, setTripVibe] = useState<TripVibe | "">("");
  const [travelCompanions, setTravelCompanions] = useState<TravelCompanions | "">("");
  const [budgetRange, setBudgetRange] = useState<BudgetRange | "">("");
  const [travelPace, setTravelPace] = useState<TravelPace | "">("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [travelers, setTravelers] = useState(2);
  const [preferences, setPreferences] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Auto-advance: if user arrives with pre-filled destination, skip step 1
  useEffect(() => {
    if (route.params?.destination && step === 1) {
      setDirection("forward");
      setStep(2);
    }
  }, []);

  const goNext = () => {
    setDirection("forward");
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    if (step === 1) {
      navigation.goBack();
      return;
    }
    setDirection("back");
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  // ─── Success Screen ───
  if (submitted) {
    const vibeText = tripVibe ? tripVibe.toLowerCase() : "adventure";
    const destText = destination || "North-East India";
    const travelerText = travelers === 1 ? "1 traveler" : `${travelers} travelers`;

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
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: `${colors.success}18`,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: SPACING.lg,
          }}
        >
          <CheckCircle2 size={44} color={colors.success} strokeWidth={1.5} />
        </View>
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: 24,
            color: colors.textPrimary,
            textAlign: "center",
            marginBottom: SPACING.md,
          }}
        >
          You're all set! 🎉
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 15,
            color: colors.textSecondary,
            textAlign: "center",
            lineHeight: 23,
            marginBottom: SPACING.xl,
          }}
        >
          Got it! We're matching you with verified operators for a{" "}
          <Text style={{ fontFamily: "Inter_600SemiBold", color: colors.textPrimary }}>
            {vibeText}
          </Text>
          -style trip to{" "}
          <Text style={{ fontFamily: "Inter_600SemiBold", color: colors.textPrimary }}>
            {destText}
          </Text>{" "}
          for{" "}
          <Text style={{ fontFamily: "Inter_600SemiBold", color: colors.textPrimary }}>
            {travelerText}
          </Text>
          . You'll receive personalized quotes within minutes.
        </Text>
        <Button
          title="Back to Home"
          onPress={() => navigation.goBack()}
          fullWidth
        />
      </SafeAreaView>
    );
  }

  // ─── MCQ Option Card ───
  const MCQOption = ({
    label,
    selected,
    onPress,
    icon: Icon,
    emoji,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
    icon?: any;
    emoji?: string;
  }) => (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: selected ? `${colors.primary}12` : colors.surface,
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? colors.primary : colors.border,
        borderRadius: RADIUS.card,
        paddingHorizontal: SPACING.base,
        paddingVertical: SPACING.base,
        marginBottom: SPACING.sm,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {Icon && (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: selected ? `${colors.primary}18` : `${colors.textSecondary}10`,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SPACING.md,
          }}
        >
          <Icon
            size={20}
            color={selected ? colors.primary : colors.textSecondary}
            strokeWidth={ICON_STROKE_WIDTH}
          />
        </View>
      )}
      {emoji && !Icon && (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: selected ? `${colors.primary}18` : `${colors.textSecondary}10`,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SPACING.md,
          }}
        >
          <Text style={{ fontSize: 20 }}>{emoji}</Text>
        </View>
      )}
      <Text
        style={{
          fontFamily: selected ? "Inter_600SemiBold" : "Inter_500Medium",
          fontSize: 15,
          color: selected ? colors.primary : colors.textPrimary,
          flex: 1,
        }}
      >
        {label}
      </Text>
      {selected && (
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircle2 size={16} color="#FFFFFF" strokeWidth={2} />
        </View>
      )}
    </Pressable>
  );

  // ─── Step Content ───
  const renderStepContent = () => {
    const enteringAnim = direction === "forward" ? FadeInRight.duration(250) : FadeInLeft.duration(250);

    switch (step) {
      // Step 1: Destination
      case 1:
        return (
          <Animated.View key="step1" entering={enteringAnim}>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 22,
                color: colors.textPrimary,
                marginBottom: SPACING.sm,
              }}
            >
              Where do you want to go?
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.textSecondary,
                marginBottom: SPACING.lg,
                lineHeight: 21,
              }}
            >
              Choose your dream destination in North-East India
            </Text>
            {DESTINATION_OPTIONS.map((opt) => (
              <MCQOption
                key={opt}
                label={opt}
                selected={destination === opt}
                icon={MapPin}
                onPress={() => {
                  setDestination(opt);
                  // Auto-advance after brief visual feedback
                  setTimeout(() => {
                    setDirection("forward");
                    setStep(2);
                  }, 300);
                }}
              />
            ))}
          </Animated.View>
        );

      // Step 2: Trip Vibe
      case 2:
        return (
          <Animated.View key="step2" entering={enteringAnim}>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 22,
                color: colors.textPrimary,
                marginBottom: SPACING.sm,
              }}
            >
              What kind of trip are you dreaming of?
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.textSecondary,
                marginBottom: SPACING.lg,
                lineHeight: 21,
              }}
            >
              This helps us match you with the right operators
            </Text>
            {VIBE_OPTIONS.map((opt) => (
              <MCQOption
                key={opt.label}
                label={opt.label}
                selected={tripVibe === opt.label}
                icon={opt.icon}
                onPress={() => {
                  setTripVibe(opt.label);
                  setTimeout(() => {
                    setDirection("forward");
                    setStep(3);
                  }, 300);
                }}
              />
            ))}
          </Animated.View>
        );

      // Step 3: Who's Traveling
      case 3:
        return (
          <Animated.View key="step3" entering={enteringAnim}>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 22,
                color: colors.textPrimary,
                marginBottom: SPACING.sm,
              }}
            >
              Who's coming along?
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.textSecondary,
                marginBottom: SPACING.lg,
                lineHeight: 21,
              }}
            >
              We'll tailor activities and stays to your group
            </Text>
            {COMPANION_OPTIONS.map((opt) => (
              <MCQOption
                key={opt.label}
                label={opt.label}
                selected={travelCompanions === opt.label}
                icon={opt.icon}
                onPress={() => {
                  setTravelCompanions(opt.label);
                  setTimeout(() => {
                    setDirection("forward");
                    setStep(4);
                  }, 300);
                }}
              />
            ))}
          </Animated.View>
        );

      // Step 4: Budget
      case 4:
        return (
          <Animated.View key="step4" entering={enteringAnim}>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 22,
                color: colors.textPrimary,
                marginBottom: SPACING.sm,
              }}
            >
              What's your budget per person?
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.textSecondary,
                marginBottom: SPACING.lg,
                lineHeight: 21,
              }}
            >
              We'll find packages that fit your range
            </Text>
            {BUDGET_OPTIONS.map((opt) => (
              <MCQOption
                key={opt}
                label={opt}
                selected={budgetRange === opt}
                icon={Wallet}
                onPress={() => {
                  setBudgetRange(opt);
                  setTimeout(() => {
                    setDirection("forward");
                    setStep(5);
                  }, 300);
                }}
              />
            ))}
          </Animated.View>
        );

      // Step 5: Travel Pace
      case 5:
        return (
          <Animated.View key="step5" entering={enteringAnim}>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 22,
                color: colors.textPrimary,
                marginBottom: SPACING.sm,
              }}
            >
              How do you like to travel?
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.textSecondary,
                marginBottom: SPACING.lg,
                lineHeight: 21,
              }}
            >
              Pick the pace that suits your style
            </Text>
            {PACE_OPTIONS.map((opt) => (
              <MCQOption
                key={opt.label}
                label={opt.label}
                selected={travelPace === opt.label}
                emoji={opt.emoji}
                onPress={() => {
                  setTravelPace(opt.label);
                  setTimeout(() => {
                    setDirection("forward");
                    setStep(6);
                  }, 300);
                }}
              />
            ))}
          </Animated.View>
        );

      // Step 6: Dates & Travelers
      case 6:
        return (
          <Animated.View key="step6" entering={enteringAnim}>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 22,
                color: colors.textPrimary,
                marginBottom: SPACING.sm,
              }}
            >
              When are you planning to go?
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.textSecondary,
                marginBottom: SPACING.lg,
                lineHeight: 21,
              }}
            >
              Select your preferred start date and group size
            </Text>

            {/* Date Picker */}
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
                  Start Date
                </Text>
              </View>
              <DatePickerField
                placeholder="Select start date"
                value={startDate}
                onChange={setStartDate}
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

            <Button
              title="Continue"
              onPress={goNext}
              fullWidth
            />
          </Animated.View>
        );

      // Step 7: Preferences + Submit
      case 7:
        return (
          <Animated.View key="step7" entering={enteringAnim}>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 22,
                color: colors.textPrimary,
                marginBottom: SPACING.sm,
              }}
            >
              Anything else?
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.textSecondary,
                marginBottom: SPACING.lg,
                lineHeight: 21,
              }}
            >
              Any specific requests or preferences? (optional)
            </Text>

            <View style={{ marginBottom: SPACING.xl }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: SPACING.sm,
                }}
              >
                <MessageSquare
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
                  Special Preferences
                </Text>
              </View>
              <TextInput
                placeholder="E.g., budget-friendly stays, adventure activities, vegetarian meals..."
                placeholderTextColor={colors.textSecondary}
                value={preferences}
                onChangeText={setPreferences}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                style={{
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: RADIUS.button,
                  paddingHorizontal: SPACING.base,
                  paddingVertical: Platform.OS === "ios" ? 14 : 12,
                  paddingTop: SPACING.md,
                  fontFamily: "Inter_400Regular",
                  fontSize: 15,
                  color: colors.textPrimary,
                  minHeight: 120,
                }}
              />
            </View>

            <Button
              title="Get My Personalized Quote"
              onPress={handleSubmit}
              fullWidth
            />
          </Animated.View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      {/* Header: back + close */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: SPACING.base,
          paddingVertical: SPACING.sm,
        }}
      >
        <Pressable
          onPress={goBack}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ArrowLeft
            size={ICON_SIZE.lg}
            color={colors.textPrimary}
            strokeWidth={ICON_STROKE_WIDTH}
          />
        </Pressable>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: colors.textPrimary,
          }}
        >
          Custom Quote
        </Text>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X
            size={ICON_SIZE.lg}
            color={colors.textSecondary}
            strokeWidth={ICON_STROKE_WIDTH}
          />
        </Pressable>
      </View>

      {/* Progress Steps */}
      <ProgressSteps
        currentStep={step}
        totalSteps={TOTAL_STEPS}
        stepLabel={STEP_LABELS[step - 1]}
      />

      {/* Scrollable Step Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SPACING.base,
          paddingBottom: SPACING.xl,
          paddingTop: SPACING.md,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {renderStepContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
