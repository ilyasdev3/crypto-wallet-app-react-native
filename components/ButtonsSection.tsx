import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo or have installed react-native-vector-icons

const ButtonsSection = ({ setModalVisible }: any) => {
  return (
    <View className="flex-row justify-around mt-6 w-full px-4">
      {/* Buy Button */}
      <TouchableOpacity className="w-20 h-20 rounded-lg bg-green-500 flex items-center justify-center shadow-lg">
        <Ionicons name="cart-outline" size={24} color="white" />
        <Text className="text-white mt-2 font-bold">Buy</Text>
      </TouchableOpacity>

      {/* Send Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="w-20 h-20 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg"
      >
        <Ionicons name="send-outline" size={24} color="white" />
        <Text className="text-white mt-2 font-bold">Send</Text>
      </TouchableOpacity>

      {/* Swap Button */}
      {/* <TouchableOpacity className="w-20 h-20 rounded-lg bg-yellow-500 flex items-center justify-center shadow-lg">
        <Ionicons name="swap-horizontal-outline" size={24} color="white" />
        <Text className="text-white mt-2 font-bold">Swap</Text>
      </TouchableOpacity> */}

      {/* More Button */}
      {/* <TouchableOpacity className="w-20 h-20 rounded-lg bg-red-500 flex items-center justify-center shadow-lg">
        <Ionicons name="ellipsis-horizontal" size={24} color="white" />
        <Text className="text-white mt-2 font-bold">More</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default ButtonsSection;
