import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const budgets = [
  {
    id: "1",
    category: "Shopping",
    spent: 854.5,
    limit: 1000,
    color: "#3B82F6",
  },
  {
    id: "2",
    category: "Food & Dining",
    spent: 425.8,
    limit: 500,
    color: "#10B981",
  },
  {
    id: "3",
    category: "Transportation",
    spent: 325.2,
    limit: 300,
    color: "#F59E0B",
  },
  {
    id: "4",
    category: "Entertainment",
    spent: 154.3,
    limit: 200,
    color: "#8B5CF6",
  },
];

export default function BudgetScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Budget</Text>
          <Pressable style={styles.addButton}>
            <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Monthly Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Monthly Overview</Text>
          <View style={styles.overviewStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Budget</Text>
              <Text style={styles.statAmount}>$2,000</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Spent</Text>
              <Text style={styles.statAmount}>$1,759.80</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Remaining</Text>
              <Text style={styles.statAmount}>$240.20</Text>
            </View>
          </View>
        </View>

        {/* Budget Categories */}
        <View style={styles.categoriesSection}>
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.limit) * 100;
            const isOverBudget = budget.spent > budget.limit;

            return (
              <Pressable key={budget.id} style={styles.budgetItem}>
                <View style={styles.budgetHeader}>
                  <View style={styles.categoryLeft}>
                    <View
                      style={[
                        styles.categoryIcon,
                        { backgroundColor: budget.color },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name="shopping"
                        size={20}
                        color="#FFFFFF"
                      />
                    </View>
                    <View>
                      <Text style={styles.categoryName}>{budget.category}</Text>
                      <Text style={styles.budgetLimit}>
                        ${budget.spent.toFixed(2)} of ${budget.limit}
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
                          : budget.color,
                      },
                    ]}
                  />
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
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
  overviewCard: {
    margin: 20,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
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
    color: "#64748B",
    marginBottom: 4,
  },
  statAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  categoriesSection: {
    paddingHorizontal: 20,
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
});
