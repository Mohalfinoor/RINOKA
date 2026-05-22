/**
 * Types definition for Rinoka Summarecon Mutiara Makassar Applet
 */

export enum PaymentMethod {
  CASH = "Cash Keras",
  KPR = "KPR Bank",
  BERTALU = "Cash Bertahap (12x/24x)"
}

export interface UnitType {
  id: string; // "lyon" | "paris" | "lyon-classic" | "paris-classic"
  name: string; // Tipe Lyon | Tipe Paris
  style: string; // "Classic French" | "Classic French Premium"
  sizeLT: number; // Luas Tanah (m2) e.g., 72 | 84
  sizeLB: number; // Luas Bangunan (m2) e.g., 82 | 117
  dimension: string; // "6x12" | "7x12"
  bedrooms: number;
  bathrooms: number;
  carports: number;
  priceMin: number; // in Rupiah, e.g., 1200000000
  priceMax: number;
  description: string;
  features: string[];
  imageUrl: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface ReservationState {
  selectedUnitId: string;
  paymentMethod: PaymentMethod;
  downPaymentPercent: number; // e.g., 10, 20
  tenorYears: number; // e.g., 5, 10, 15, 20
  interestRate: number; // e.g., 5.5
  additions: {
    smartHomeUpgrade: boolean;
    canopyPremium: boolean;
    kitchenSetClassic: boolean;
    solarPanel: boolean;
  };
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
}
