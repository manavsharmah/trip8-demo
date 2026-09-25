import { create } from "zustand";
import type { Booking } from "../types";

interface BookingsState {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  getBooking: (id: string) => Booking | undefined;
}

export const useBookingsStore = create<BookingsState>((set, get) => ({
  bookings: [],
  addBooking: (booking) =>
    set((state) => ({ bookings: [booking, ...state.bookings] })),
  getBooking: (id) => get().bookings.find((b) => b.id === id),
}));
