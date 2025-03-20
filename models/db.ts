import { MMKV } from "react-native-mmkv";
import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const storage = new MMKV();

export const STORAGE_KEYS = {
  CATEGORIES: "@categories",
  TRANSACTIONS: "@transactions",
  SETTINGS: "@settings",
  BUDGETS: "@budgets",
  USER: "@user",
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
