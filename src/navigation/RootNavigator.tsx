import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";
import { useTheme } from "../theme/ThemeContext";
import { TabNavigator } from "./TabNavigator";
import { PackageDetailScreen } from "../screens/PackageDetailScreen";
import { QuoteRequestScreen } from "../screens/QuoteRequestScreen";
import { TripDetailsScreen } from "../screens/booking/TripDetailsScreen";
import { ReviewScreen } from "../screens/booking/ReviewScreen";
import { ConfirmationScreen } from "../screens/booking/ConfirmationScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen
          name="PackageDetail"
          component={PackageDetailScreen}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="QuoteRequest"
          component={QuoteRequestScreen}
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="BookingTripDetails"
          component={TripDetailsScreen}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="BookingReview"
          component={ReviewScreen}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="BookingConfirmation"
          component={ConfirmationScreen}
          options={{
            animation: "slide_from_right",
            gestureEnabled: false, // Disable swipe-back on confirmation
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
