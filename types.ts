import { CURRENCIES } from "./const";

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: "income" | "expense";
};

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};

export type Currency = (typeof CURRENCIES)[number];

export type Budget = {
  id: string;
  category: string;
  limit: number;
  period: "monthly" | "weekly";
};

export interface UserProfile {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface UserSettings {
  darkMode: boolean;
  notifications: boolean;
  currency: string;
}
