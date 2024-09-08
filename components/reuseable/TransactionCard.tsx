import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TransactionCard = ({ item }: any) => {
  return (
    <View className="flex-row items-center justify-between bg-[#F5F5F5] p-4 m-2 rounded-lg">
      <View className="flex-row items-center">
        <View
          className={`${item.color} w-10 h-10 flex items-center justify-center rounded-full`}
        >
          <Text>{item.icon}</Text>
        </View>
        <View className="ml-4">
          <Text className="text-lg font-semibold">{item.type}</Text>
          <Text className="text-sm text-gray-500">From {item.from}</Text>
        </View>
      </View>
      <View className="flex items-end">
        <Text className="text-lg font-semibold">{item.amount}</Text>
        <Text className="text-sm text-gray-500">{item.usdValue}</Text>
      </View>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({});
