import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ButtonsSection = ({ onPress }: any) => {
  return (
    <View className="flex-row mt-6 w-full px-4 gap-x-8">
      <TouchableOpacity className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
        <Text className="text-green-600">Buy</Text>
      </TouchableOpacity>

      <TouchableOpacity className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
        <Text className="text-blue-600">Send</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
        <Text className="text-yellow-600">Swap</Text>
      </TouchableOpacity>

      <TouchableOpacity className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
        <Text className="text-red-600">More</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default ButtonsSection;
