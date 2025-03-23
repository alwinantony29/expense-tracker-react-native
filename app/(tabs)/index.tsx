import { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import AddTransactionModal from "@/components/transactions/AddTransactionModal";
import { useTransactions } from "@/context/TransactionContext";
import { router } from "expo-router";
import { Text } from "@/components/ui/text";
import EmptyTransactions from "@/components/transactions/EmptyTransactions";
import TotalOverview from "@/components/transactions/TotalOverview";

export default function HomeScreen() {
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const { transactions, categories } = useTransactions();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        {/* Balance Card */}
        <TotalOverview />
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Pressable
            style={styles.actionButton}
            onPress={() => setTransactionModalVisible(true)}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#E0F2FE" }]}>
              <Ionicons name="add" size={24} color="#0284C7" />
            </View>
            <Text style={styles.actionText}>Add</Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: "#F0FDF4" }]}>
              <MaterialCommunityIcons
                name="transfer"
                size={24}
                color="#16A34A"
              />
            </View>
            <Text style={styles.actionText}>Transfer</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={() => router.navigate("/categories")}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#FEF3C7" }]}>
              <MaterialCommunityIcons name="tag" size={24} color="#D97706" />
            </View>
            <Text style={styles.actionText}>Categories</Text>
          </Pressable>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection} className="">
          {transactions.length > 0 && (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <Pressable onPress={() => router.push("/transactions")}>
                <Text style={styles.seeAll}>See all</Text>
              </Pressable>
            </View>
          )}

          {transactions.length === 0 ? (
            <EmptyTransactions />
          ) : (
            transactions.slice(0, 5).map((transaction) => {
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
                          backgroundColor: category
                            ? category.color
                            : transaction.amount > 0
                            ? "#10B981"
                            : "#EF4444",
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={
                          category
                            ? category.icon
                            : transaction.amount > 0
                            ? "bank-transfer-in"
                            : ("cart" as any)
                        }
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
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount?.toFixed(2)}
                  </Text>
                </Pressable>
              );
            })
          )}
        </View>
      </ScrollView>
      <AddTransactionModal
        visible={transactionModalVisible}
        onClose={() => setTransactionModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 14,
    color: "#64748B",
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0F172A",
  },
  profileButton: {
    padding: 4,
  },

  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: "center",
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: "#64748B",
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  seeAll: {
    color: "#3B82F6",
    fontSize: 14,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryIcon: {
    width: 38,
    height: 38,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "500",
  },
  transactionsSection: {
    paddingHorizontal: 20,
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
    gap: 10,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  transactionDate: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "600",
  },
});
