import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTransactions } from "../../context/TransactionContext";
import { useRouter } from "expo-router";

type FilterType = "all" | "income" | "expense";

export default function TransactionsScreen() {
  const router = useRouter();
  const { transactions, categories } = useTransactions();
  const [filterType, setFilterType] = useState<FilterType>("all");

  return (
    <SafeAreaView style={styles.container}>
      {/* Filter Buttons */}
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            style={[
              styles.filterButton,
              filterType === "all" && styles.filterButtonActive,
            ]}
            onPress={() => setFilterType("all")}
          >
            <Text style={styles.filterText}>All</Text>
          </Pressable>
          <Pressable
            style={[
              styles.filterButton,
              filterType === "income" && styles.filterButtonActive,
            ]}
            onPress={() => setFilterType("income")}
          >
            <Text style={styles.filterText}>Income</Text>
          </Pressable>
          <Pressable
            style={[
              styles.filterButton,
              filterType === "expense" && styles.filterButtonActive,
            ]}
            onPress={() => setFilterType("expense")}
          >
            <Text style={styles.filterText}>Expenses</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Transactions List */}
      <ScrollView style={styles.transactionsList}>
        {transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="receipt" size={48} color="#94A3B8" />
            <Text style={styles.emptyStateText}>No transactions found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your filters
            </Text>
          </View>
        ) : (
          transactions.map((transaction) => {
            const category = categories.find(
              (cat) => cat.id === transaction.category
            );
            return (
              <Pressable
                onPress={() => router.push(`/transactions/${transaction.id}`)}
                key={transaction.id}
                style={styles.transaction}
              >
                <View style={styles.transactionLeft}>
                  <View
                    style={[
                      styles.categoryIcon,
                      {
                        backgroundColor: category?.color || "#94A3B8",
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={(category?.icon || "cash") as any}
                      size={20}
                      color="#FFFFFF"
                    />
                  </View>
                  <View>
                    <Text style={styles.transactionTitle}>
                      {transaction.title}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {transaction.date}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: transaction.amount > 0 ? "#16A34A" : "#DC2626" },
                  ]}
                >
                  {transaction.amount > 0 ? "+" : ""}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </Text>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#3B82F6",
  },
  filterText: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "500",
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: "#3B82F6",
  },
  transactionsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0F172A",
  },
  transactionDate: {
    fontSize: 14,
    color: "#64748B",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 8,
  },
});
