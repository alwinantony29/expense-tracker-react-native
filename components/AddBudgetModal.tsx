import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTransactions } from "../context/TransactionContext";
import { Budget } from "@/types";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";

interface AddBudgetModalProps {
  visible: boolean;
  onClose: () => void;
  onAddBudget: (budget: Budget) => void;
}

export default function AddBudgetModalAddBudgetModal({
  visible,
  onClose,
  onAddBudget,
}: AddBudgetModalProps) {
  const toast = useToast();
  const { categories } = useTransactions();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [limit, setLimit] = useState("");
  const [period, setPeriod] = useState<"monthly" | "weekly">("monthly");

  // Filter only expense categories
  const expenseCategories = categories.filter(
    (category) => category.type === "expense"
  );

  const resetForm = () => {
    setSelectedCategory(null);
    setLimit("");
    setPeriod("monthly");
  };

  const handleAddBudget = () => {
    if (!selectedCategory) {
      toast.show("Please select a category");
      return;
    }

    if (!limit || isNaN(parseFloat(limit))) {
      toast.show("Please enter a valid limit");
      return;
    }

    const newBudget: Budget = {
      id: Date.now().toString(),
      category: selectedCategory,
      limit: parseFloat(limit),
      period: period,
    };

    onAddBudget(newBudget);
    toast.show("Budget added successfully");
    resetForm();
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <GestureHandlerRootView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Add Budget</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.form}>
              {/* Period Selector */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Budget Period</Text>
                <View style={styles.periodSelector}>
                  <Pressable
                    style={[
                      styles.periodButton,
                      period === "monthly" && styles.selectedPeriodButton,
                    ]}
                    onPress={() => setPeriod("monthly")}
                  >
                    <Text
                      style={[
                        styles.periodText,
                        period === "monthly" && styles.selectedPeriodText,
                      ]}
                    >
                      Monthly
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.periodButton,
                      period === "weekly" && styles.selectedPeriodButton,
                    ]}
                    onPress={() => setPeriod("weekly")}
                  >
                    <Text
                      style={[
                        styles.periodText,
                        period === "weekly" && styles.selectedPeriodText,
                      ]}
                    >
                      Weekly
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* Limit Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Budget Limit</Text>
                <View style={styles.amountInputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.amountInput}
                    placeholder="0.00"
                    keyboardType="numeric"
                    value={limit}
                    onChangeText={setLimit}
                  />
                </View>
              </View>

              {/* Category Selector */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Category</Text>
                <View style={styles.categoriesContainer}>
                  {expenseCategories.map((category) => (
                    <Pressable
                      key={category.id}
                      style={[
                        styles.categoryItem,
                        selectedCategory === category.id &&
                          styles.selectedCategory,
                      ]}
                      onPress={() => setSelectedCategory(category.id)}
                    >
                      <View
                        style={[
                          styles.categoryIcon,
                          { backgroundColor: category.color },
                          selectedCategory === category.id &&
                            styles.selectedCategoryIcon,
                        ]}
                      >
                        <MaterialCommunityIcons
                          name={category.icon as any}
                          size={20}
                          color="#FFFFFF"
                        />
                      </View>
                      <Text
                        style={[
                          styles.categoryName,
                          selectedCategory === category.id &&
                            styles.selectedCategoryText,
                        ]}
                      >
                        {category.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddBudget}
              >
                <Text style={styles.addButtonText}>Add Budget</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    height: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
  },
  closeButton: {
    padding: 4,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
    marginBottom: 8,
  },
  periodSelector: {
    flexDirection: "row",
    marginBottom: 16,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    marginRight: 8,
    borderRadius: 8,
  },
  selectedPeriodButton: {
    backgroundColor: "#3B82F6",
  },
  periodText: {
    color: "#64748B",
    fontWeight: "500",
  },
  selectedPeriodText: {
    color: "#FFFFFF",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 20,
    color: "#64748B",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 20,
    fontWeight: "600",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryItem: {
    width: "33%",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
  selectedCategory: {
    backgroundColor: "#F1F5F9",
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  selectedCategoryIcon: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  categoryName: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },
  selectedCategoryText: {
    color: "#0F172A",
    fontWeight: "500",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  addButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
