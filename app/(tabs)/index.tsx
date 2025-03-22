import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AddTransactionModal from "../../components/AddTransactionModal";
import { useTransactions } from "../../context/TransactionContext";
import { router } from "expo-router";

export default function HomeScreen() {
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const {
    transactions,
    categories,
    getTotalBalance,
    getTotalIncome,
    getTotalExpenses,
  } = useTransactions();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Balance Card */}
        <LinearGradient
          colors={["#3B82F6", "#1D4ED8"]}
          style={styles.balanceCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>
            ${getTotalBalance().toFixed(2)}
          </Text>
          <View style={styles.balanceStats}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons
                name="arrow-down-circle"
                size={24}
                color="#4ADE80"
              />
              <Text style={styles.statLabel}>Income</Text>
              <Text style={styles.statAmount}>
                ${getTotalIncome().toFixed(2)}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialCommunityIcons
                name="arrow-up-circle"
                size={24}
                color="#FB7185"
              />
              <Text style={styles.statLabel}>Expenses</Text>
              <Text style={styles.statAmount}>
                ${getTotalExpenses().toFixed(2)}
              </Text>
            </View>
          </View>
        </LinearGradient>

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
              <Pressable>
                <Text style={styles.seeAll}>See all</Text>
              </Pressable>
            </View>
          )}

          {transactions.length === 0 ? (
            <View className="justify-center items-center pt-20">
              <MaterialCommunityIcons
                name="receipt"
                size={48}
                color="#94A3B8"
              />
              <Text style={styles.emptyStateText}>No transactions yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Add your first transaction to get started
              </Text>
            </View>
          ) : (
            transactions.slice(0, 5).map((transaction) => {
              const category = categories.find(
                (cat) => cat.id === transaction.category
              );

              return (
                <Pressable key={transaction.id} style={styles.transaction}>
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
  balanceCard: {
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
  },
  balanceLabel: {
    color: "#E2E8F0",
    fontSize: 14,
  },
  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "600",
    marginTop: 8,
  },
  balanceStats: {
    flexDirection: "row",
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  statLabel: {
    color: "#E2E8F0",
    fontSize: 12,
    marginTop: 8,
  },
  statAmount: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
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
    color: "#0F172A",
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
    color: "#0F172A",
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
    textAlign: "center",
  },
});
