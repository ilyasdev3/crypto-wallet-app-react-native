import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const WalletCard = () => {
  return (
    <View className="">
      {/* Title */}

      {/* Balance Card */}
      <LinearGradient
        colors={["#38ef7d", "#11998e"]}
        className="w-full h-[160px] rounded-xl p-4"
      >
        <Text className="text-white text-lg">Current Balance</Text>
        <Text className="text-white text-3xl font-bold mt-2">$450,933</Text>
        <Text className="text-white mt-1">+13.25%</Text>
      </LinearGradient>

      {/* Action Buttons */}
    </View>
  );
};

export default WalletCard;
