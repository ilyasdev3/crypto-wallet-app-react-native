import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CryptoCoinCard = ({ item }: any) => {
  const navigation: any = useNavigation();

  const handlePress = () => {
    // Send the coin name as a route parameter in lowercase
    navigation.navigate("CoinDetails", { coin: item.name.toLowerCase() });
  };

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <View className="flex-row items-center justify-between bg-[#F5F5F5] p-4 m-2 rounded-lg">
        <View className="flex-row items-center">
          <View
            className={`${item.color} w-10 h-10 flex items-center justify-center rounded-full`}
          >
            <Text className="text-2xl">{item.icon}</Text>
          </View>
          <View className="ml-4">
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-sm text-gray-500">Symbol: {item.symbol}</Text>
          </View>
        </View>
        <View className="flex items-end">
          <Text className="text-lg font-semibold">{item.amount}</Text>
          <Text className="text-sm text-gray-500">{item.usdValue}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CryptoCoinCard;
