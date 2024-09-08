import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "@/components/reuseable/Avatar";
import TransactionCard from "./reuseable/TransactionCard";

const tabs = ["Completed", "Pending", "Transfers"];

const transactions: any = {
  Completed: [
    {
      id: 1,
      type: "Buy",
      amount: "10 BTC",
      usdValue: "$560.950 USD",
      from: "0x4200c90",
      icon: "🔽", // Use the appropriate image or icon here
      color: "bg-green-500",
    },
    {
      id: 2,
      type: "Send",
      amount: "2.155 ETH",
      usdValue: "$1050.40 USD",
      from: "0x4200c90",
      icon: "✈️", // Use the appropriate image or icon here
      color: "bg-blue-500",
    },
    {
      id: 3,
      type: "Send",
      amount: "320 XRP",
      usdValue: "$250.40 USD",
      from: "0x4200c90",
      icon: "✈️", // Use the appropriate image or icon here
      color: "bg-blue-500",
    },
    {
      id: 4,
      type: "Swap",
      amount: "2.155 ETH",
      usdValue: "$1050.40 USD",
      from: "0x4200c90",
      icon: "🔽", // Use the appropriate image or icon here
      color: "bg-yellow-500",
    },
    {
      id: 5,
      type: "Send",
      amount: "320 XRP",
      usdValue: "$250.40 USD",
      from: "0x4200c90",
      icon: "✈️", // Use the appropriate image or icon here
      color: "bg-blue-500",
    },
    {
      id: 6,
      type: "Swap",
      amount: "2.155 ETH",
      usdValue: "$1050.40 USD",
      from: "0x4200c90",
      icon: "🔽", // Use the appropriate image or icon here
      color: "bg-yellow-500",
    },
    {
      id: 7,
      type: "Send",
      amount: "320 XRP",
      usdValue: "$250.40 USD",
      from: "0x4200c90",
      icon: "✈️", // Use the appropriate image or icon here
      color: "bg-blue-500",
    },
    {
      id: 8,
      type: "Swap",
      amount: "2.155 ETH",
      usdValue: "$1050.40 USD",
      from: "0x4200c90",
      icon: "🔽", // Use the appropriate image or icon here
      color: "bg-yellow-500",
    },
  ],
  Pending: [
    {
      id: 5,
      type: "Buy",
      amount: "5 BTC",
      usdValue: "$300.475 USD",
      from: "0x4200c90",
      icon: "🔽", // Use the appropriate image or icon here
      color: "bg-green-500",
    },
    {
      id: 6,
      type: "Send",
      amount: "1.075 ETH",
      usdValue: "$525.20 USD",
      from: "0x4200c90",
      icon: "✈️", // Use the appropriate image or icon here
      color: "bg-blue-500",
    },
  ],
  Transfers: [
    {
      id: 7,
      type: "Receive",
      amount: "3 BTC",
      usdValue: "$180.285 USD",
      from: "0x4200c90",
      icon: "🔽", // Use the appropriate image or icon here
      color: "bg-red-500",
    },
    {
      id: 8,
      type: "Send",
      amount: "1.55 ETH",
      usdValue: "$775.30 USD",
      from: "0x4200c90",
      icon: "✈️", // Use the appropriate image or icon here
      color: "bg-blue-500",
    },
  ],
};

const TabCard = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <SafeAreaView className="bg-[#FFFFFF] flex-1">
      {/* Tabs Section */}
      <View className="flex-row justify-around bg-[#F5F5F5] p-4 rounded-t-lg">
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab ? "bg-gray-800" : "bg-gray-200"
            }`}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              className={`text-sm ${
                activeTab === tab ? "text-white" : "text-gray-600"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transactions List */}
      <FlatList
        data={transactions[activeTab]}
        renderItem={({ item }) => <TransactionCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

export default TabCard;
