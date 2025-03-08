import { MMKV } from "react-native-mmkv";
import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const storage = new MMKV();

export const STORAGE_KEYS = {
  TAGS: "@tags",
  CATEGORIES: "@categories",
  TRANSACTIONS: "@transactions",
  SETTINGS: "@settings",
} as const;

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "transactions",
      columns: [
        { name: "amount", type: "number" },
        { name: "description", type: "string", isOptional: true },
        { name: "date", type: "string" },
        { name: "categoryId", type: "string" },
        { name: "tags", type: "string", isOptional: true }, // JSON string of tag IDs
        { name: "createdAt", type: "number" },
        { name: "updatedAt", type: "number" },
      ],
    }),
  ],
});

export const CURRENCIES = [
  { label: "Indian Rupee (INR)", value: "INR", symbol: "₹" },
  { label: "US Dollar (USD)", value: "USD", symbol: "$" },
  { label: "Euro (EUR)", value: "EUR", symbol: "€" },
  { label: "British Pound (GBP)", value: "GBP", symbol: "£" },
];

export type Currency = (typeof CURRENCIES)[number];
