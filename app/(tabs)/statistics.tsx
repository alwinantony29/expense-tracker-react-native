import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTransactions } from "../../context/TransactionContext";
import { Text } from "@/components/ui/text";

export default function StatisticsScreen() {
  // const [period, setPeriod] = useState("month");
  const { transactions, categories, getTotalExpenses } = useTransactions();

  // Filter expense transactions
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.amount < 0
  );

  // Calculate total expenses
  const totalExpenses = getTotalExpenses();

  // Calculate spending by category
  const categorySpending = categories
    .filter((category) => category.type === "expense")
    .map((category) => {
      const spent = Math.abs(
        expenseTransactions
          .filter((transaction) => transaction.category === category.id)
          .reduce((total, transaction) => total + transaction.amount, 0)
      );

      return {
        id: category.id,
        name: category.name,
        amount: spent,
        percentage: totalExpenses > 0 ? (spent / totalExpenses) * 100 : 0,
        color: category.color,
      };
    })
    .filter((category) => category.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle} className="pt-4">
            Statistics
          </Text>
          <Pressable style={styles.filterButton}>
            <Text style={styles.filterText}>This Month</Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="#64748B"
            />
          </Pressable>
        </View>

        <LinearGradient
          colors={["#3B82F6", "#1D4ED8"]}
          style={styles.totalCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.totalLabel}>Total Spending</Text>
          <Text style={styles.totalAmount} className="pt-10">
            ${totalExpenses.toFixed(2)}
          </Text>
        </LinearGradient>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Spending by Category</Text>

          {categorySpending.length > 0 ? (
            categorySpending.map((category) => (
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
                  <Text style={styles.categoryAmount}>
                    ${category.amount.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${category.percentage}%`,
                        backgroundColor: category.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.percentageText}>
                  {category.percentage.toFixed(0)}%
                </Text>
              </Pressable>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="chart-pie"
                size={48}
                color="#94A3B8"
              />
              <Text style={styles.emptyStateText}>No expense data yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Add some transactions to see statistics
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
