import { Input } from "@/components/ui/input";
import { useTransactions } from "../../context/TransactionContext";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { View, TextInput } from "react-native";

const TransactionScreen = () => {
  const { id } = useLocalSearchParams();

  const { getTransaction } = useTransactions();

  const transaction = useMemo(() => {
    if (id && typeof id == "string") {
      return getTransaction(id);
    }
    return undefined;
  }, [getTransaction, id]);
  return (
    <View className="bg-white h-full">
      <Input
        value={transaction?.title}
        // onChangeText={(text) =>
        //   setTransaction({ ...transaction, description: text })
        // }
        placeholder="Description"
      />
      <TextInput
        value={transaction?.amount + ""}
        // onChangeText={(text) =>
        //   setTransaction({ ...transaction, amount: text })
        // }
        placeholder="Amount"
        keyboardType="numeric"
      />
    </View>
  );
};

export default TransactionScreen;
