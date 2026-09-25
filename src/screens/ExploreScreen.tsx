import React, { useState, useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, PackageOpen } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";
import { useTheme } from "../theme/ThemeContext";
import { SPACING, ICON_SIZE, ICON_STROKE_WIDTH } from "../theme/tokens";
import { usePackages } from "../data/usePackages";
import { SectionHeader } from "../components/SectionHeader";
import { PackageCard } from "../components/PackageCard";
import { Chip } from "../components/Chip";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const REGIONS = ["All", "Assam", "Meghalaya", "Arunachal Pradesh", "Assam + Arunachal"];

export function ExploreScreen() {
  const { colors, mode } = useTheme();
  const navigation = useNavigation<NavProp>();
  const packages = usePackages();
  const [selectedRegion, setSelectedRegion] = useState("All");

  const filteredPackages = useMemo(() => {
    if (selectedRegion === "All") return packages;
    return packages.filter((pkg) => pkg.region === selectedRegion);
  }, [packages, selectedRegion]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      <FlatList
        data={filteredPackages}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SPACING.xl,
        }}
        ListHeaderComponent={
          <View>
            <SectionHeader
              title="Explore Packages"
              subtitle="Find the perfect trip for your next adventure"
              style={{ paddingTop: SPACING.base }}
            />

            {/* Region Chips */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingHorizontal: SPACING.base,
                marginBottom: SPACING.base,
              }}
            >
              {REGIONS.map((region) => (
                <Chip
                  key={region}
                  label={region}
                  selected={selectedRegion === region}
                  onPress={() => setSelectedRegion(region)}
                />
              ))}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: SPACING.base, marginBottom: SPACING.base }}>
            <PackageCard
              title={item.title}
              region={item.region}
              duration={item.duration}
              price={item.price}
              image={item.heroImage}
              category={item.category}
              onPress={() =>
                navigation.navigate("PackageDetail", { packageId: item.id })
              }
            />
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: SPACING.xl * 2,
              paddingHorizontal: SPACING.xl,
            }}
          >
            <PackageOpen
              size={48}
              color={colors.textSecondary}
              strokeWidth={1}
            />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: colors.textPrimary,
                marginTop: SPACING.base,
                textAlign: "center",
              }}
            >
              No packages found
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.textSecondary,
                marginTop: SPACING.sm,
                textAlign: "center",
              }}
            >
              Try selecting a different region filter
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
