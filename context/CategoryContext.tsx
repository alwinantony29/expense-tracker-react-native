import { storage, STORAGE_KEYS } from "@/models/db";
import { createContext, ReactNode, useContext } from "react";
import { useMMKVObject } from "react-native-mmkv";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: "income" | "expense";
}

interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  // getCategorySpending: (categoryId: string) => number;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories = [], setCategories] = useMMKVObject<Category[]>(
    STORAGE_KEYS.TRANSACTIONS,
    storage
  );

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
  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
};
