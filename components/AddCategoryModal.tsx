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
import { toast } from "sonner-native";
import { Category } from "../context/TransactionContext";

interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onAddCategory: (category: Category) => void;
}

const iconOptions = [
  { id: "cart", name: "cart" },
  { id: "food", name: "food" },
  { id: "car", name: "car" },
  { id: "movie", name: "movie" },
  { id: "lightning-bolt", name: "lightning-bolt" },
  { id: "medical-bag", name: "medical-bag" },
  { id: "bank-transfer-in", name: "bank-transfer-in" },
  { id: "cash", name: "cash" },
  { id: "chart-line", name: "chart-line" },
  { id: "home", name: "home" },
  { id: "gift", name: "gift" },
  { id: "school", name: "school" },
];

const colorOptions = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#EF4444", // Red
  "#059669", // Emerald
  "#6366F1", // Indigo
  "#14B8A6", // Teal
  "#F97316", // Orange
  "#8B5CF6", // Violet
  "#06B6D4", // Cyan
];

export default function AddCategoryModal({
  visible,
  onClose,
  onAddCategory,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [categoryType, setCategoryType] = useState<"income" | "expense">(
    "expense"
  );

  const resetForm = () => {
    setName("");
    setSelectedIcon(null);
    setSelectedColor(null);
    setCategoryType("expense");
  };

  const handleAddCategory = () => {
    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    if (!selectedIcon) {
      toast.error("Please select an icon");
      return;
    }

    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: name.trim(),
      icon: selectedIcon,
      color: selectedColor,
      type: categoryType,
    };

    onAddCategory(newCategory);
    toast.success("Category added successfully");
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
                {iconOptions.map((icon) => (
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
                {colorOptions.map((color) => (
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
    width: 48,
    height: 48,
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
