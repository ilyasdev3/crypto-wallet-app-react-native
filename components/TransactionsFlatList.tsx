import { View, Text, FlatList } from "react-native";
import React from "react";
import TransactionCard from "./reuseable/TransactionCard";

const TransactionsFlatList = ({ transactions, activeTab }: any) => {
  return (
    <FlatList
      data={transactions[activeTab]}
      renderItem={({ item }) => <TransactionCard item={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default TransactionsFlatList;
