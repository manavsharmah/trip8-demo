import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  Dimensions,
} from "react-native";
import Animated, {
  FadeIn,
  SlideInDown,
  Easing,
} from "react-native-reanimated";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react-native";
import { useTheme } from "../theme/ThemeContext";
import { SPACING, RADIUS, ICON_SIZE, ICON_STROKE_WIDTH } from "../theme/tokens";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface DatePickerFieldProps {
  /** Display label shown above the field */
  label?: string;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Currently selected date (or null) */
  value: Date | null;
  /** Called with the selected date when confirmed */
  onChange: (date: Date) => void;
  /** Minimum selectable date (dates before this are disabled) */
  minimumDate?: Date;
  /** Error message to display below the field */
  error?: string;
}

function formatDisplayDate(date: Date): string {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()].substring(0, 3);
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBeforeDay(date: Date, reference: Date): boolean {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const r = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate());
  return d < r;
}

export function DatePickerField({
  label,
  placeholder = "Select a date",
  value,
  onChange,
  minimumDate,
  error,
}: DatePickerFieldProps) {
  const { colors, mode } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);

  // Calendar state: which month/year is being viewed
  const today = useMemo(() => new Date(), []);
  const initialMonth = value ? value.getMonth() : today.getMonth();
  const initialYear = value ? value.getFullYear() : today.getFullYear();
  const [viewMonth, setViewMonth] = useState(initialMonth);
  const [viewYear, setViewYear] = useState(initialYear);

  const openModal = () => {
    // Reset to show the month of the current value or today
    const refDate = value || today;
    setViewMonth(refDate.getMonth());
    setViewYear(refDate.getFullYear());
    setSelectedDate(value);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    if (selectedDate) {
      onChange(selectedDate);
    }
    closeModal();
  };

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Generate the calendar grid
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const days: (number | null)[] = [];

    // Leading empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Day numbers
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }
    return days;
  }, [viewYear, viewMonth]);

  const effectiveMinDate = minimumDate || today;

  return (
    <>
      {/* Trigger Field */}
      <View>
        <Pressable
          onPress={openModal}
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: error ? "#EF4444" : colors.border,
            borderRadius: RADIUS.button,
            paddingHorizontal: SPACING.base,
            paddingVertical: 14,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: value ? "Inter_400Regular" : "Inter_400Regular",
              fontSize: 15,
              color: value ? colors.textPrimary : colors.textSecondary,
            }}
          >
            {value ? formatDisplayDate(value) : placeholder}
          </Text>
          <Calendar
            size={ICON_SIZE.md}
            color={colors.textSecondary}
            strokeWidth={ICON_STROKE_WIDTH}
          />
        </Pressable>
        {error && (
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: "#EF4444",
              marginTop: SPACING.xs,
            }}
          >
            {error}
          </Text>
        )}
      </View>

      {/* Calendar Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={closeModal}
      >
        <Animated.View
          entering={FadeIn.duration(200)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={closeModal}
          />
          <Animated.View
            entering={SlideInDown.duration(300).easing(Easing.out(Easing.cubic))}
            style={{
              backgroundColor: colors.background,
              borderTopLeftRadius: SPACING.lg,
              borderTopRightRadius: SPACING.lg,
              paddingHorizontal: SPACING.base,
              paddingTop: SPACING.lg,
              paddingBottom: SPACING.xl,
              ...(mode === "dark"
                ? { borderWidth: 1, borderColor: colors.border, borderBottomWidth: 0 }
                : {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 20,
                    elevation: 20,
                  }),
            }}
          >
            {/* Header: Month/Year + Chevrons */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: SPACING.lg,
              }}
            >
              <Pressable
                onPress={goToPrevMonth}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.surface,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronLeft
                  size={ICON_SIZE.md}
                  color={colors.textPrimary}
                  strokeWidth={ICON_STROKE_WIDTH}
                />
              </Pressable>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 17,
                  color: colors.textPrimary,
                }}
              >
                {MONTH_NAMES[viewMonth]} {viewYear}
              </Text>
              <Pressable
                onPress={goToNextMonth}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.surface,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronRight
                  size={ICON_SIZE.md}
                  color={colors.textPrimary}
                  strokeWidth={ICON_STROKE_WIDTH}
                />
              </Pressable>
            </View>

            {/* Day-of-week header */}
            <View
              style={{
                flexDirection: "row",
                marginBottom: SPACING.sm,
              }}
            >
              {DAYS_OF_WEEK.map((day) => (
                <View key={day} style={{ flex: 1, alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 12,
                      color: colors.textSecondary,
                      textTransform: "uppercase",
                    }}
                  >
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Calendar grid */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return (
                    <View
                      key={`empty-${index}`}
                      style={{
                        width: "14.285%",
                        aspectRatio: 1,
                      }}
                    />
                  );
                }

                const cellDate = new Date(viewYear, viewMonth, day);
                const isToday = isSameDay(cellDate, today);
                const isSelected = selectedDate && isSameDay(cellDate, selectedDate);
                const isDisabled = isBeforeDay(cellDate, effectiveMinDate);

                return (
                  <View
                    key={`day-${day}`}
                    style={{
                      width: "14.285%",
                      aspectRatio: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 2,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        if (!isDisabled) {
                          setSelectedDate(cellDate);
                        }
                      }}
                      disabled={isDisabled}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isSelected ? colors.primary : "transparent",
                        borderWidth: isToday && !isSelected ? 1.5 : 0,
                        borderColor: isToday && !isSelected ? colors.accent : undefined,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: isSelected
                            ? "Inter_600SemiBold"
                            : isToday
                            ? "Inter_500Medium"
                            : "Inter_400Regular",
                          fontSize: 15,
                          color: isSelected
                            ? "#FFFFFF"
                            : isDisabled
                            ? `${colors.textSecondary}50`
                            : isToday
                            ? colors.accent
                            : colors.textPrimary,
                        }}
                      >
                        {day}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>

            {/* Confirm Button */}
            <Pressable
              onPress={handleConfirm}
              disabled={!selectedDate}
              style={{
                backgroundColor: selectedDate ? colors.primary : `${colors.primary}40`,
                borderRadius: RADIUS.button,
                paddingVertical: 14,
                alignItems: "center",
                marginTop: SPACING.lg,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 15,
                  color: "#FFFFFF",
                  letterSpacing: 0.3,
                }}
              >
                Confirm
              </Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </Modal>
    </>
  );
}
