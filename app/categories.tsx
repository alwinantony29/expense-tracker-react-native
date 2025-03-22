import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTransactions } from "../context/TransactionContext";
import AddCategoryModal from "@/components/AddCategoryModal";

const Categories = () => {
  const [activeTab, setActiveTab] = useState<"expense" | "income">("expense");
  const [modalVisible, setModalVisible] = useState(false);
  const { categories } = useTransactions();

  const expenseCategories = categories.filter((cat) => cat.type === "expense");
  const incomeCategories = categories.filter((cat) => cat.type === "income");

  return (
    <SafeAreaView style={styles.container} className="flex-1">
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === "expense" && styles.activeTab]}
          onPress={() => setActiveTab("expense")}
        >
          <MaterialCommunityIcons
            name="arrow-down"
            size={20}
            color={activeTab === "expense" ? "#FFFFFF" : "#64748B"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "expense" && styles.activeTabText,
            ]}
          >
            Expense
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tab,
            activeTab === "income" && styles.activeTab,
            activeTab === "income" && { backgroundColor: "#10B981" },
          ]}
          onPress={() => setActiveTab("income")}
        >
          <MaterialCommunityIcons
            name="arrow-up"
            size={20}
            color={activeTab === "income" ? "#FFFFFF" : "#64748B"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "income" && styles.activeTabText,
            ]}
          >
            Income
          </Text>
        </Pressable>
      </View>

      {/* Categories Grid */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.categoriesGrid}>
          {(activeTab === "expense" ? expenseCategories : incomeCategories).map(
            (category) => (
              <View key={category.id} style={styles.categoryCard}>
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: category.color },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={category.icon as any}
                    size={24}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
            )
          )}

          <Pressable
            style={styles.categoryIcon}
            onPress={() => setModalVisible(true)}
            className="bg-yellow-400 "
          >
            <MaterialCommunityIcons
              // style={styles.categoryIcon}
              name="plus"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      </ScrollView>

      <AddCategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8FAFC",
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
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: "#3B82F6",
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
  },
  categoryCard: {
    width: "33%",
    alignItems: "center",
    padding: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },
});

export default Categories;
