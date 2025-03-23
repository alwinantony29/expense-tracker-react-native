import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Text } from "../ui/text";

const EmptyTransactions = () => {
  return (
    <View>
      <View className="justify-center items-center pt-20">
        <MaterialCommunityIcons name="receipt" size={48} color="#94A3B8" />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginTop: 16,
          }}
        >
          No transactions yet
        </Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 8,
            textAlign: "center",
          }}
        >
          Add your first transaction to get started
        </Text>
      </View>
    </View>
  );
};

export default EmptyTransactions;
