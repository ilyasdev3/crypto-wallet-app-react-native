import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "@/components/reuseable/Avatar";
import WalletCard from "@/components/WalletCard";
import TabCard from "@/components/TabCard";
import { FontAwesome5 } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { GET_WALLET } from "../../lib/graphql/wallet/wallet.queries";
import QRCode from "react-native-qrcode-svg"; // For QR code generation

const Page = () => {
  const { loading, error, data: walletData, refetch } = useQuery(GET_WALLET);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const data = walletData?.getWallet;

  console.log("data", data);
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Error loading data</Text>
        <TouchableOpacity
          onPress={() => {
            console.log("reloading");
            refetch();
            ``;
          }}
        >
          <Text>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // const renderDropdown = () => {
  //   return (
  //     <View className="absolute top-14 left-0 bg-white shadow-md rounded-lg p-4 z-10 ">
  //       {/* show buttons for profile and logout */}
  //       <View className="flex-col justify-between gap-4">
  //         <TouchableOpacity>
  //           <Text className="text-lg font-bold">Profile</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity>
  //           <Text className="text-lg font-bold">Logout</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // };

  // const toggleDropdown = () => {
  //   setDropdownVisible(!dropdownVisible);
  // };

  const walletAddress = data?.address || "N/A"; // Assuming the wallet address is available in the data

  return (
    <SafeAreaView className="">
      <ScrollView className="h-screen w-screen bg-[#FFFFFF] p-4 flex flex-col gap-y-8">
        {/* Header Section */}

        {/* Wallet Section */}

        <View className="flex-1">
          <Text className="text-3xl font-bold mb-4">My Wallet</Text>

          {/* Wallet Card */}
          <WalletCard data={data} />

          {/* Wallet Address Section */}
          <View className="bg-[#EAF7EE] p-4 rounded-lg mt-4">
            <Text className="text-lg font-bold">Wallet Address</Text>
            <Text className="text-xs text-gray-500 my-2">{walletAddress}</Text>
            <TouchableOpacity
              onPress={() => {
                // Logic to copy wallet address
                console.log("Address copied:", walletAddress);
              }}
              className="bg-green-500 p-2 rounded-md"
            >
              <Text className="text-white text-center">Copy Address</Text>
            </TouchableOpacity>
          </View>

          {/* QR Code for Wallet Address */}
          <View className="mt-4 items-center">
            <QRCode value={walletAddress} size={150} />
            <Text className="mt-2 text-sm text-gray-500">
              Scan to share wallet address
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({});
