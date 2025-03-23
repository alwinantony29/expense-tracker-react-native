import { View, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTransactions } from "../../context/TransactionContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Label } from "@/components/ui/label";
import DeleteTransactionDialog from "@/components/transactions/DeleteTransactionDialog";
import React from "react";

export default function TransactionDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { categories, deleteTransaction, getTransaction, updateTransaction } =
    useTransactions();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const transaction = getTransaction(id);
  const category = categories.find((c) => c.id === transaction?.category);

  const [editForm, setEditForm] = useState({
    title: transaction?.title || "",
    amount: transaction?.amount.toString() || "0",
    date: transaction?.date || "",
  });

  if (!transaction) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <Text className="text-lg font-semibold text-slate-900">
          Transaction not found
        </Text>
        <Button
          variant="secondary"
          onPress={() => router.back()}
          className="mt-4"
        >
          Go Back
        </Button>
      </View>
    );
  }

  const handleSave = () => {
    updateTransaction(transaction.id, {
      ...transaction,
      title: editForm.title,
      amount: parseFloat(editForm.amount),
      date: editForm.date,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTransaction(transaction.id);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="flex-row items-center gap-4 mb-6">
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: category?.color || "#94A3B8" }}
            >
              <MaterialCommunityIcons
                name={(category?.icon || "cash") as any}
                size={24}
                color="#FFFFFF"
              />
            </View>
            <View>
              <Text className="text-2xl font-semibold">
                {transaction.amount > 0 ? "+" : "-"}$
                {Math.abs(transaction.amount).toFixed(2)}
              </Text>
              <Text>{category?.name}</Text>
            </View>
          </View>

          {!isEditing ? (
            <>
              <View className="flex flex-col gap-5">
                <View>
                  <Text className="text-sm font-medium">Title</Text>
                  <Text className="text-2xl">{transaction.title}</Text>
                </View>
                <View>
                  <Text className="text-sm font-medium">Date</Text>
                  <Text className="text-2xl">{transaction.date}</Text>
                </View>
              </View>

              <View className="flex-row justify-around items-center  px-4 py-10 w-full">
                <Button
                  variant="default"
                  onPress={() => setShowDeleteConfirm(true)}
                  className="px-5 py-3 w-[40%] flex flex-row gap-3"
                >
                  <MaterialCommunityIcons name="trash-can" size={20} />
                  <Text>Delete</Text>
                </Button>
                <Button
                  variant="default"
                  onPress={() => setIsEditing(true)}
                  className="px-5 py-3 w-[40%] flex flex-row gap-3"
                >
                  <MaterialCommunityIcons name="pencil" size={20} />
                  <Text>Edit</Text>
                </Button>
              </View>
            </>
          ) : (
            <View className="flex flex-col gap-5">
              <Label>Title</Label>
              <Input
                value={editForm.title}
                onChangeText={(text) =>
                  setEditForm((prev) => ({ ...prev, title: text }))
                }
              />
              <Label>Amount</Label>
              <Input
                value={editForm.amount}
                keyboardType="numeric"
                onChangeText={(text) =>
                  setEditForm((prev) => ({ ...prev, amount: text }))
                }
              />
              <Label>Date</Label>
              <Input
                value={editForm.date}
                onChangeText={(text) =>
                  setEditForm((prev) => ({ ...prev, date: text }))
                }
              />
              <View className="flex-row justify-around items-center px-4 py-10 w-full">
                <Button
                  variant="outline"
                  onPress={() => setIsEditing(false)}
                  className="px-5 py-3 w-[40%] flex flex-row gap-3"
                >
                  <Text>Cancel</Text>
                </Button>
                <Button
                  onPress={handleSave}
                  className="px-5 py-3 w-[40%] flex flex-row gap-3"
                  variant={"default"}
                >
                  <Text>Save Changes</Text>
                </Button>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      {showDeleteConfirm && (
        <DeleteTransactionDialog
          handleDelete={handleDelete}
          id={transaction.id}
          onClose={() => setShowDeleteConfirm(false)}
        />
      )}
    </SafeAreaView>
  );
}
