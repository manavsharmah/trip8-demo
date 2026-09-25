/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#16A34A",
          dark: "#22C55E",
        },
        accent: {
          DEFAULT: "#F59E0B",
          dark: "#FBBF24",
        },
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#121212",
        },
        surface: {
          DEFAULT: "#F8F9FA",
          dark: "#1E1E1E",
        },
        "text-primary": {
          DEFAULT: "#111827",
          dark: "#F3F4F6",
        },
        "text-secondary": {
          DEFAULT: "#6B7280",
          dark: "#9CA3AF",
        },
        border: {
          DEFAULT: "#E5E7EB",
          dark: "#2D2D2D",
        },
        success: {
          DEFAULT: "#22C55E",
          dark: "#4ADE80",
        },
        warning: {
          DEFAULT: "#F59E0B",
          dark: "#FBBF24",
        },
      },
      fontFamily: {
        heading: ["Inter_700Bold"],
        "heading-semibold": ["Inter_600SemiBold"],
        sans: ["Inter_400Regular"],
        "sans-medium": ["Inter_500Medium"],
        "sans-semibold": ["Inter_600SemiBold"],
        "sans-bold": ["Inter_700Bold"],
      },
      borderRadius: {
        card: "12px",
        button: "10px",
      },
      spacing: {
        "4": "4px",
        "8": "8px",
        "12": "12px",
        "16": "16px",
        "24": "24px",
        "32": "32px",
      },
    },
  },
  plugins: [],
};
