import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schema from "./db";
import Transaction from "./Transaction";

// Create the adapter
const adapter = new SQLiteAdapter({
  schema,
  jsi: true, // enables faster native operations
  onSetUpError: (error) => {
    console.error("Database setup error:", error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Transaction],
});

// Get the collections
export const transactionsCollection = database.collections.get("transactions");
