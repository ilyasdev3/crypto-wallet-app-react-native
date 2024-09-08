import { View, Text, Image } from "react-native";
import React from "react";

const NewsItem = ({ title, subtitle, source, time, imageUrl }: any) => (
  <View className="flex-row p-4 border-b border-gray-200">
    <View className="flex-1 pr-4">
      <Text className="font-bold text-lg">{title}</Text>
      <Text className="text-gray-600 mt-1">{subtitle}</Text>
      <View className="flex-row mt-2">
        <Text className="text-blue-500">{source}</Text>
        <Text className="text-gray-400 ml-2">{time}</Text>
      </View>
    </View>
    <Image className=" rounded-lg h-full" source={{ uri: imageUrl }} />
  </View>
);

export default NewsItem;
