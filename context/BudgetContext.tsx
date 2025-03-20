import { storage, STORAGE_KEYS } from "../models/db";
import { createContext, useContext, ReactNode } from "react";
import { useMMKVObject } from "react-native-mmkv";

export interface Budget {
  id: string;
  category: string;
  limit: number;
  period: "monthly" | "weekly";
}

interface BudgetContextType {
  budgets: Budget[];
  addBudget: (budget: Budget) => void;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  getTotalBudget: () => number;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [budgets = [], setBudgets] = useMMKVObject<Budget[]>(
    STORAGE_KEYS.BUDGETS,
    storage
  );

  const addBudget = (budget: Budget) => {
    const updatedBudgets = [...budgets, budget];
    setBudgets(updatedBudgets);
  };

  const updateBudget = (id: string, updatedBudget: Partial<Budget>) => {
    const updatedBudgets = budgets.map((budget) =>
      budget.id === id ? { ...budget, ...updatedBudget } : budget
    );
    setBudgets(updatedBudgets);
  };

  const deleteBudget = (id: string) => {
    const updatedBudgets = budgets.filter((budget) => budget.id !== id);
    setBudgets(updatedBudgets);
  };

  const getTotalBudget = () => {
    return budgets.reduce((total, budget) => total + budget.limit, 0);
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
        getTotalBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudgets = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudgets must be used within a BudgetProvider");
  }
  return context;
};
