// Design tokens — single source of truth for all design values
// Used directly in code for non-className usage (e.g., icon colors, Reanimated values)
// Tailwind classes generated from tailwind.config.js mirror these values

export const COLORS = {
  light: {
    primary: "#16A34A",
    accent: "#F59E0B",
    background: "#FFFFFF",
    surface: "#F8F9FA",
    textPrimary: "#111827",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    success: "#22C55E",
    warning: "#F59E0B",
  },
  dark: {
    primary: "#22C55E",
    accent: "#FBBF24",
    background: "#121212",
    surface: "#1E1E1E",
    textPrimary: "#F3F4F6",
    textSecondary: "#9CA3AF",
    border: "#2D2D2D",
    success: "#4ADE80",
    warning: "#FBBF24",
  },
} as const;

export type ColorToken = keyof typeof COLORS.light;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
} as const;

export const RADIUS = {
  card: 12,
  button: 10,
  pill: 9999,
} as const;

export const FONTS = {
  heading: {
    semiBold: "Inter_600SemiBold",
    bold: "Inter_700Bold",
  },
  sans: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semiBold: "Inter_600SemiBold",
    bold: "Inter_700Bold",
  },
} as const;

export const ICON_SIZE = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export const ICON_STROKE_WIDTH = 1.5;
