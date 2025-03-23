import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTransactions } from "../../context/TransactionContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { AlertDialog } from "@/components/ui/alert-dialog";
import React from "react";

export default function TransactionDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { categories, deleteTransaction, getTransaction } = useTransactions();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const transaction = getTransaction(id);
  const category = categories.find((c) => c.id === transaction?.category);

  const [editForm, setEditForm] = useState({
    title: transaction?.title || "",
    amount: transaction?.amount.toString() || "0",
    date: transaction?.date || "",
    // notes: transaction?.notes || "",
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
    if (transaction) {
      //   updateTransaction(transaction.id, {
      //     ...transaction,
      //     title: editForm.title,
      //     amount: parseFloat(editForm.amount),
      //     date: editForm.date,
      //     // notes: editForm.notes,
      //   });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    deleteTransaction(transaction.id);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1">
        {/* Transaction Details */}
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
              <Text className="text-2xl font-semibold text-slate-900">
                {transaction.amount > 0 ? "+" : "-"}$
                {Math.abs(transaction.amount).toFixed(2)}
              </Text>
              <Text className="text-slate-600">{category?.name}</Text>
            </View>
          </View>

          {!isEditing ? (
            <>
              <View className="flex flex-col gap-5">
                <View>
                  <Text className="text-sm font-medium text-slate-500">
                    Title
                  </Text>
                  <Text className="text-2xl text-slate-900">
                    {transaction.title}
                  </Text>
                </View>
                <View>
                  <Text className="text-sm font-medium text-slate-500">
                    Date
                  </Text>
                  <Text className="text-2xl text-slate-900">
                    {transaction.date}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-around items-center  px-4 py-10 w-full">
                <Button
                  variant="secondary"
                  onPress={() => setShowDeleteConfirm(true)}
                  className="px-5 py-3 rounded-[10px] w-[40%] flex flex-row gap-3 border border-solid"
                >
                  <MaterialCommunityIcons
                    name="trash-can"
                    size={20}
                    color="black"
                  />
                  <Text className="text-black">Delete</Text>
                </Button>
                <Button
                  variant="default"
                  onPress={() => setIsEditing(true)}
                  className="bg-black px-5 py-3 rounded-[10px] w-[40%] flex flex-row gap-3"
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color="#FFFFFF"
                  />
                  <Text className="text-white">Edit</Text>
                </Button>
              </View>
            </>
          ) : (
            <View className="space-y-4">
              <Input
                // label="Title"
                value={editForm.title}
                onChangeText={(text) =>
                  setEditForm((prev) => ({ ...prev, title: text }))
                }
              />
              <Input
                // label="Amount"
                value={editForm.amount}
                keyboardType="numeric"
                onChangeText={(text) =>
                  setEditForm((prev) => ({ ...prev, amount: text }))
                }
              />
              <Input
                // label="Date"
                value={editForm.date}
                onChangeText={(text) =>
                  setEditForm((prev) => ({ ...prev, date: text }))
                }
              />
              <View className="flex-row justify-around items-center  px-4 py-10 w-full">
                <Button
                  variant="secondary"
                  onPress={() => setIsEditing(false)}
                  className="flex-1"
                >
                  <Text>Cancel</Text>
                </Button>
                <Button onPress={handleSave} className="flex-1">
                  <Text>Save Changes</Text>
                </Button>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Delete Confirmation Sheet */}
      {/* <AlertDialog
        open={showDeleteConfirm}
        // onClose={() => setShowDeleteConfirm(false)}
        // snapPoints={["25%"]}
      >
        <View className="p-4 space-y-4">
          <Text className="text-lg font-semibold text-slate-900">
            Delete Transaction
          </Text>
          <Text className="text-slate-600">
            Are you sure you want to delete this transaction? This action cannot
            be undone.
          </Text>
          <View className="flex-row gap-2">
            <Button
              variant="secondary"
              onPress={() => setShowDeleteConfirm(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onPress={handleDelete}
              className="flex-1"
            >
              Delete
            </Button>
          </View>
        </View>
      </AlertDialog> */}
    </SafeAreaView>
  );
}
