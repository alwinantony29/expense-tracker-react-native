import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useBudgets } from "@/context/BudgetContext";
import { useTransactions } from "@/context/TransactionContext";
import AddBudgetModal from "@/components/AddBudgetModal";
import { toast } from "sonner-native";
import { Budget } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "@/components/ui/text";

export default function BudgetScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { budgets, addBudget, deleteBudget, getTotalBudget } = useBudgets();
  const { categories, getCategorySpending } = useTransactions();

  const handleAddBudget = (budget: Budget) => {
    addBudget(budget);
  };

  const handleDeleteBudget = (id: string) => {
    deleteBudget(id);
    toast.success("Budget deleted successfully");
  };

  const totalSpent = budgets.reduce((total, budget) => {
    return total + getCategorySpending(budget.category);
  }, 0);

  const remainingBudget = getTotalBudget() - totalSpent;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Budget</Text>
          <Pressable
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Monthly Overview */}
        <LinearGradient
          colors={["#3B82F6", "#1D4ED8"]}
          style={{
            margin: 20,
            padding: 24,
            borderRadius: 24,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View>
            <Text style={styles.overviewTitle}>Monthly Overview</Text>
            <View style={styles.overviewStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Total Budget</Text>
                <Text style={styles.statAmount}>
                  ${getTotalBudget().toFixed(2)}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Spent</Text>
                <Text style={styles.statAmount}>${totalSpent.toFixed(2)}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Remaining</Text>
                <Text style={styles.statAmount}>
                  ${remainingBudget.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Budget Categories */}
        <View style={styles.categoriesSection}>
          {budgets.map((budget) => {
            const category = categories.find(
              (cat) => cat.id === budget.category
            );
            if (!category) return null;

            const spent = getCategorySpending(budget.category);
            const percentage = (spent / budget.limit) * 100;
            const isOverBudget = spent > budget.limit;

            return (
              <Pressable
                key={budget.id}
                style={styles.budgetItem}
                onLongPress={() => handleDeleteBudget(budget.id)}
              >
                <View style={styles.budgetHeader}>
                  <View style={styles.categoryLeft}>
                    <View
                      style={[
                        styles.categoryIcon,
                        { backgroundColor: category.color },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={category.icon as any}
                        size={20}
                        color="#FFFFFF"
                      />
                    </View>
                    <View>
                      <Text style={styles.categoryName}>{category.name}</Text>
                      <Text style={styles.budgetLimit}>
                        ${spent.toFixed(2)} of ${budget.limit}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.percentage,
                      { color: isOverBudget ? "#EF4444" : "#10B981" },
                    ]}
                  >
                    {percentage.toFixed(0)}%
                  </Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: isOverBudget
                          ? "#EF4444"
                          : category.color,
                      },
                    ]}
                  />
                </View>
              </Pressable>
            );
          })}

          {budgets.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="wallet-outline"
                size={48}
                color="#94A3B8"
              />
              <Text style={styles.emptyStateText}>No budgets yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Tap the + button to add a budget
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <AddBudgetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddBudget={handleAddBudget}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0F172A",
  },
  addButton: {
    backgroundColor: "#3B82F6",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  overviewStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  categoriesSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  budgetItem: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0F172A",
  },
  budgetLimit: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  percentage: {
    fontSize: 14,
    fontWeight: "600",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 8,
  },
});
