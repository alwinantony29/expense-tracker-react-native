import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTransactions } from "@/context/TransactionContext";
import { categories } from "@/const";

export default function StatisticsScreen() {
  const { transactions, getTotalExpenses } = useTransactions();

  const totalExpense = getTotalExpenses();

  const spendingByCategories = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      if (curr.amount > 0) return acc;
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);
  }, [transactions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Statistics</Text>
          <Pressable style={styles.filterButton}>
            <Text style={styles.filterText}>This Month</Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="#64748B"
            />
          </Pressable>
        </View>

        {/* Total Spending Card */}
        <LinearGradient
          colors={["#3B82F6", "#1D4ED8"]}
          style={styles.totalCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.totalLabel}>Total Spending</Text>
          <Text style={styles.totalAmount}>$ {totalExpense}</Text>
          <View style={styles.percentageChange}>
            <MaterialCommunityIcons name="arrow-up" size={20} color="#4ADE80" />
            <Text style={styles.changeText}>12.5% from last month</Text>
          </View>
        </LinearGradient>

        {/* Category Breakdown */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Spending by Category</Text>

          {Object.entries(spendingByCategories).map(([id, amount]) => {
            const category = categories.find((cat) => cat.id === id);
            if (!category) return <View key={id}></View>;

            const percentage = Math.round(category.budget / (amount * -1));
            return (
              <Pressable key={category.id} style={styles.categoryItem}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryLeft}>
                    <View
                      style={[
                        styles.categoryDot,
                        { backgroundColor: category.color },
                      ]}
                    />
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                  <Text style={styles.categoryAmount}>$ {amount * -1}</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${percentage}%`,
                        backgroundColor: category.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.percentageText}>{}%</Text>
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
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    color: "#64748B",
    marginRight: 4,
  },
  totalCard: {
    margin: 20,
    padding: 24,
    borderRadius: 24,
  },
  totalLabel: {
    color: "#E2E8F0",
    fontSize: 14,
  },
  totalAmount: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "600",
    marginTop: 8,
  },
  percentageChange: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  changeText: {
    color: "#E2E8F0",
    fontSize: 14,
    marginLeft: 4,
  },
  categoriesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 16,
  },
  categoryItem: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    color: "#0F172A",
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0F172A",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    marginBottom: 4,
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 12,
    color: "#64748B",
  },
});
