import { Category, Transaction } from "@/types";
import { storage, STORAGE_KEYS } from "../models/db";
import React, { createContext, useContext, ReactNode } from "react";
import { useMMKVObject } from "react-native-mmkv";

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  getTransaction: (id: string | string[]) => Transaction | undefined;
  deleteTransaction: (id: string) => void;
  getTotalBalance: () => number;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;

  categories: Category[];
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  getCategorySpending: (categoryId: string) => number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions = [], setTransactions] = useMMKVObject<Transaction[]>(
    STORAGE_KEYS.TRANSACTIONS,
    storage
  );

  const [categories = [], setCategories] = useMMKVObject<Category[]>(
    STORAGE_KEYS.CATEGORIES,
    storage
  );
  console.log("🚀 ~ transactions.length:", transactions.length);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    setTransactions([
      { ...transaction, id: new Date().toString() },
      ...transactions,
    ]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const getTransaction = (id: string | string[]) => {
    return transactions.find((t) => t.id === id);
  };

  const getTotalBalance = () => {
    return transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  };

  const getTotalIncome = () => {
    return transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const getTotalExpenses = () => {
    return Math.abs(
      transactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((total, transaction) => total + transaction.amount, 0)
    );
  };

  const addCategory = (category: Category) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
  };
  const deleteCategory = (id: string) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);
  };

  const getCategorySpending = (categoryId: string) => {
    return Math.abs(
      transactions
        .filter((transaction) => transaction.category === categoryId)
        .reduce((total, transaction) => total + transaction.amount, 0)
    );
  };

  return (
    <TransactionContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
        transactions,
        addTransaction,
        deleteTransaction,
        getTotalBalance,
        getTotalIncome,
        getTotalExpenses,
        getCategorySpending,
        getTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
};
