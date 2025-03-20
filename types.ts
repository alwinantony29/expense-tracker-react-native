import { CURRENCIES } from "./const";

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};

export type Currency = (typeof CURRENCIES)[number];
