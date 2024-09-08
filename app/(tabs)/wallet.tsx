import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "@/components/reuseable/Avatar";
import WalletCard from "@/components/WalletCard";
import TabCard from "@/components/TabCard";
import { FontAwesome5 } from "@expo/vector-icons";

const Page = () => {
  return (
    <SafeAreaView className="">
      <View className="h-screen w-screen  bg-[#FFFFFF] p-4 flex  flex-col gap-y-8">
        {/* Header Section */}
        <View className="flex-row items-center justify-between">
          <Avatar
            imageSource={{
              uri: "https://randomuser.me/api/portraits/men/62.jpg",
            }}
          />
          <FontAwesome5 name="search" size={24} color="black" />
        </View>

        {/* Wallet Section */}
        <View className="flex-1">
          <Text className="text-3xl font-bold mb-4">My Wallet</Text>

          <WalletCard />
          <TabCard />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({});
