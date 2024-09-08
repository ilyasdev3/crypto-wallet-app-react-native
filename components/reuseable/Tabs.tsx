import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }: any) => {
  return (
    <View className="flex-row justify-around bg-[#F5F5F5] p-4 rounded-t-lg">
      {tabs.map((tab: any, index: any) => (
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
  );
};

export default Tabs;
