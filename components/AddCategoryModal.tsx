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
import { Category } from "@/types";
import { useTransactions } from "@/context/TransactionContext";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/constants";

interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  type?: "income" | "expense";
}

export default function AddCategoryModal({
  visible,
  onClose,
  type,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [categoryType, setCategoryType] = useState<"income" | "expense">(
    type ?? "expense"
  );
  const { addCategory } = useTransactions();

  const resetForm = () => {
    setName("");
    setSelectedIcon(null);
    setSelectedColor(null);
    setCategoryType("expense");
  };

  const handleAddCategory = () => {
    if (!name.trim()) {
      // toast.error("Please enter a category name");
      return;
    }

    if (!selectedIcon) {
      // toast.error("Please select an icon");
      return;
    }

    if (!selectedColor) {
      // toast.error("Please select a color");
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: name.trim(),
      icon: selectedIcon,
      color: selectedColor,
      type: categoryType,
    };

    addCategory(newCategory);
    // toast.success("Category added successfully");
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
            <Text style={styles.headerTitle}>Add Category</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            {/* Category Type Selector */}
            <View style={styles.typeSelector}>
              <Pressable
                style={[
                  styles.typeButton,
                  categoryType === "expense" && styles.selectedTypeButton,
                ]}
                onPress={() => setCategoryType("expense")}
              >
                <MaterialCommunityIcons
                  name="arrow-down"
                  size={20}
                  color={categoryType === "expense" ? "#FFFFFF" : "#64748B"}
                />
                <Text
                  style={[
                    styles.typeText,
                    categoryType === "expense" && styles.selectedTypeText,
                  ]}
                >
                  Expense
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.typeButton,
                  categoryType === "income" && styles.selectedTypeButton,
                  categoryType === "income" && { backgroundColor: "#10B981" },
                ]}
                onPress={() => setCategoryType("income")}
              >
                <MaterialCommunityIcons
                  name="arrow-up"
                  size={20}
                  color={categoryType === "income" ? "#FFFFFF" : "#64748B"}
                />
                <Text
                  style={[
                    styles.typeText,
                    categoryType === "income" && styles.selectedTypeText,
                  ]}
                >
                  Income
                </Text>
              </Pressable>
            </View>

            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter category name"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Icon Selector */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Icon</Text>
              <View style={styles.optionsContainer}>
                {CATEGORY_ICONS.map((icon) => (
                  <Pressable
                    key={icon.id}
                    style={[
                      styles.iconItem,
                      selectedIcon === icon.id && styles.selectedItem,
                    ]}
                    onPress={() => setSelectedIcon(icon.id)}
                  >
                    <MaterialCommunityIcons
                      name={icon.name as any}
                      size={24}
                      color={selectedIcon === icon.id ? "#FFFFFF" : "#64748B"}
                    />
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Color Selector */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Color</Text>
              <View style={styles.optionsContainer}>
                {CATEGORY_COLORS.map((color) => (
                  <Pressable
                    key={color}
                    style={[
                      styles.colorItem,
                      { backgroundColor: color },
                      selectedColor === color && styles.selectedColorItem,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  />
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddCategory}
            >
              <Text style={styles.addButtonText}>Add Category</Text>
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
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  iconItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    margin: 8,
  },
  selectedItem: {
    backgroundColor: "#3B82F6",
  },
  colorItem: {
    width: 28,
    height: 28,
    borderRadius: 24,
    margin: 8,
  },
  selectedColorItem: {
    borderWidth: 3,
    borderColor: "#0F172A",
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
