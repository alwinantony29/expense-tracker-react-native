import { Transaction } from "@/types";
import { storage, STORAGE_KEYS } from "../models/db";
import React, { createContext, useContext, ReactNode } from "react";
import { useMMKVObject } from "react-native-mmkv";

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  getTotalBalance: () => number;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions = [], setTransactions] = useMMKVObject<Transaction[]>(
    STORAGE_KEYS.TRANSACTIONS,
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

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        getTotalBalance,
        getTotalIncome,
        getTotalExpenses,
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
