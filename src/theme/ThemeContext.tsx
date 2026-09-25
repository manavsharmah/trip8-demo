import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { useColorScheme } from "react-native";
import { COLORS } from "./tokens";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  colors: typeof COLORS.light;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(systemScheme === "dark" ? "dark" : "light");

  useEffect(() => {
    if (systemScheme) {
      setMode(systemScheme === "dark" ? "dark" : "light");
    }
  }, [systemScheme]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = useMemo(() => COLORS[mode], [mode]);

  const value = useMemo(
    () => ({ mode, colors, toggleTheme, setMode }),
    [mode, colors]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
