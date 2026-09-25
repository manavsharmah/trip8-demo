import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home,
  Compass,
  BookOpen,
  User,
} from "lucide-react-native";
import type { TabParamList } from "../types";
import { useTheme } from "../theme/ThemeContext";
import { ICON_STROKE_WIDTH } from "../theme/tokens";
import { HomeScreen } from "../screens/HomeScreen";
import { ExploreScreen } from "../screens/ExploreScreen";
import { MyBookingsScreen } from "../screens/MyBookingsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  const { colors, mode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: 11,
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Home
              size={size}
              color={color}
              strokeWidth={ICON_STROKE_WIDTH}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Compass
              size={size}
              color={color}
              strokeWidth={ICON_STROKE_WIDTH}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={{
          tabBarLabel: "Bookings",
          tabBarIcon: ({ color, size }) => (
            <BookOpen
              size={size}
              color={color}
              strokeWidth={ICON_STROKE_WIDTH}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <User
              size={size}
              color={color}
              strokeWidth={ICON_STROKE_WIDTH}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
