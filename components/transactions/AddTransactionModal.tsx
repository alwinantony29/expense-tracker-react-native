import { useState } from "react";
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
import { useTransactions } from "../../context/TransactionContext";

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddTransactionModal({
  visible,
  onClose,
}: AddTransactionModalProps) {
  const { addTransaction, categories } = useTransactions();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [transactionType, setTransactionType] = useState<"expense" | "income">(
    "expense"
  );

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setSelectedCategory(null);
    setTransactionType("expense");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleAddTransaction = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      // toast.error("Please enter a valid amount");
      return;
    }

    if (!selectedCategory) {
      // toast.error("Please select a category");
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      title: title.trim(),
      amount:
        transactionType === "expense"
          ? -parseFloat(amount)
          : parseFloat(amount),
      category: selectedCategory,
      date: date,
    };

    addTransaction(newTransaction);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add Transaction</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            {/* Transaction Type Selector */}
            <View style={styles.typeSelector}>
              <Pressable
                style={[
                  styles.typeButton,
                  transactionType === "expense" && styles.selectedTypeButton,
                ]}
                onPress={() => setTransactionType("expense")}
              >
                <MaterialCommunityIcons
                  name="arrow-down"
                  size={20}
                  color={transactionType === "expense" ? "#FFFFFF" : "#64748B"}
                />
                <Text
                  style={[
                    styles.typeText,
                    transactionType === "expense" && styles.selectedTypeText,
                  ]}
                >
                  Expense
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.typeButton,
                  transactionType === "income" && styles.selectedTypeButton,
                  transactionType === "income" && {
                    backgroundColor: "#10B981",
                  },
                ]}
                onPress={() => setTransactionType("income")}
              >
                <MaterialCommunityIcons
                  name="arrow-up"
                  size={20}
                  color={transactionType === "income" ? "#FFFFFF" : "#64748B"}
                />
                <Text
                  style={[
                    styles.typeText,
                    transactionType === "income" && styles.selectedTypeText,
                  ]}
                >
                  Income
                </Text>
              </Pressable>
            </View>

            {/* Amount Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Amount</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0.00"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>
            </View>

            {/* Title Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="What was this for?"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Category Selector */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoriesContainer}>
                {categories.map((category) => (
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

            {/* Date Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={date}
                onChangeText={setDate}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddTransaction}
            >
              <Text style={styles.addButtonText}>Add Transaction</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    height: "90%",
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
  typeSelector: {
    flexDirection: "row",
    marginBottom: 24,
  },
  typeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    marginRight: 12,
  },
  selectedTypeButton: {
    backgroundColor: "#EF4444",
  },
  typeText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  selectedTypeText: {
    color: "#FFFFFF",
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
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
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
