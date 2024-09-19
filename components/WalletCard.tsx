import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const WalletCard = ({ data }: any) => {
  return (
    <View className="">
      {/* Title */}

      {/* Balance Card */}
      <LinearGradient
        colors={["#38ef7d", "#11998e"]}
        className="w-full h-[160px] rounded-xl p-4"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-col ">
            <Text className="text-white text-lg">Current Balance</Text>
            <Text className="text-white text-3xl font-bold mt-2">
              ${data.balance}
            </Text>
            <Text className="text-white mt-1">+{data.balance * 0.1325}%</Text>
          </View>

          <TouchableOpacity
            className="flex-row items-center gap-2 shadow-md"
            onPress={() => {
              console.log("wallet info");
              // navigate to wallet info screen
              router.push("/walletInfo");
            }}
          >
            {/* wallet info */}
            <FontAwesome5 name="info-circle" size={24} color="black" />
            <Text className="ml-2">History</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Action Buttons */}
    </View>
  );
};

export default WalletCard;
