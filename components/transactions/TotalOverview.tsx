import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text } from "../ui/text";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTransactions } from "../../context/TransactionContext";

const TotalOverview = () => {
  const { getTotalBalance, getTotalIncome, getTotalExpenses } =
    useTransactions();
  return (
    <LinearGradient
      colors={["#3B82F6", "#1D4ED8"]}
      style={{
        margin: 20,
        padding: 24,
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={{ fontSize: 14 }} className="text-white">
        Total Balance
      </Text>

      <Text
        style={{
          fontSize: 32,
          fontWeight: "600",
        }}
        className="pt-10 text-white"
      >
        ${getTotalBalance().toFixed(2)}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 24,
          paddingTop: 24,
          borderTopWidth: 1,
          borderTopColor: "rgba(255,255,255,0.2)",
        }}
      >
        <View className="flex-1 items-center">
          <MaterialCommunityIcons
            name="arrow-down-circle"
            size={24}
            color="#4ADE80"
          />
          <Text style={{ color: "#E2E8F0", fontSize: 12, marginTop: 8 }}>
            Income
          </Text>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "600",
              marginTop: 4,
            }}
          >
            ${getTotalIncome().toFixed(2)}
          </Text>
        </View>
        <View style={{ width: 1, backgroundColor: "rgba(255,255,255,0.2)" }} />
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="arrow-up-circle"
            size={24}
            color="#FB7185"
          />
          <Text style={{ color: "#E2E8F0", fontSize: 12, marginTop: 8 }}>
            Expenses
          </Text>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "600",
              marginTop: 4,
            }}
          >
            ${getTotalExpenses().toFixed(2)}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default TotalOverview;
