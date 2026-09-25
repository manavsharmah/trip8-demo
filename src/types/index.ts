// ─── Package & Itinerary ───

export interface ItineraryDay {
  day: number;
  title: string;
  distance: string;
  duration: string;
  activities: string[];
}

export interface PackageFAQ {
  question: string;
  answer: string;
}

export interface QuickFacts {
  bestSeason: string;
  vehicleType: string;
  stayType: string;
  safetyRating: string;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  region: string;
  duration: string;
  days: number;
  nights: number;
  price: number;
  description: string;
  heroImage: string;
  gallery: string[];
  quickFacts: QuickFacts;
  itinerary: ItineraryDay[];
  highlights: string[];
  inclusions: string[];
  faqs: PackageFAQ[];
  category: string;
  isTrending: boolean;
}

// ─── Booking ───

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking {
  id: string;
  packageId: string;
  packageTitle: string;
  packageRegion: string;
  packageDuration: string;
  packageImage: string;
  travelers: number;
  startDate: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  roomPreference?: string;
}

// ─── Quote Request ───

export type TripVibe =
  | "Adventure & Trekking"
  | "Relaxation & Nature"
  | "Culture & Heritage"
  | "Wildlife & Safari"
  | "A mix of everything";

export type TravelCompanions =
  | "Solo"
  | "Couple"
  | "Family with kids"
  | "Group of friends";

export type BudgetRange =
  | "Under ₹15,000"
  | "₹15,000 – ₹30,000"
  | "₹30,000 – ₹50,000"
  | "₹50,000+";

export type TravelPace =
  | "Packed & action-filled"
  | "Balanced mix"
  | "Slow & relaxed";

export interface QuoteRequest {
  id: string;
  destination: string;
  startDate: string;
  travelers: number;
  preferences: string;
  tripVibe: TripVibe;
  travelCompanions: TravelCompanions;
  budgetRange: BudgetRange;
  travelPace: TravelPace;
  status: "submitted" | "quotes_received";
  createdAt: string;
}

// ─── Navigation ───

export type RootStackParamList = {
  Main: undefined;
  PackageDetail: { packageId: string };
  QuoteRequest: { destination?: string };
  BookingTripDetails: { packageId: string };
  BookingReview: {
    packageId: string;
    travelers: number;
    startDate: string;
    roomPreference?: string;
  };
  BookingConfirmation: { bookingId: string };
};

export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  MyBookings: undefined;
  Profile: undefined;
};

// ─── Testimonial ───

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}
