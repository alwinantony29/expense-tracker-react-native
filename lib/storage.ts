import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const STORAGE_KEYS = {
  TAGS: "@tags",
  TRANSACTIONS: "@transactions",
  SETTINGS: "@settings",
} as const;

export const CURRENCIES = [
  { label: "Indian Rupee (INR)", value: "INR", symbol: "₹" },
  { label: "US Dollar (USD)", value: "USD", symbol: "$" },
  { label: "Euro (EUR)", value: "EUR", symbol: "€" },
  { label: "British Pound (GBP)", value: "GBP", symbol: "£" },
];

export type Currency = (typeof CURRENCIES)[number];
