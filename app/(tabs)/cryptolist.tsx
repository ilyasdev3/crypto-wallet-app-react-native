import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { styled } from "nativewind";
import CryptoCoinCard from "@/components/reuseable/CryptoCoinCard";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "@/components/reuseable/Avatar";
import { FontAwesome5 } from "@expo/vector-icons"; // or another icon library
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "@/lib/graphql/user/user.queries";
import { fixImageUrl } from "@/utils/fixImageUrl.utils";

// Sample Data for Crypto Coins
const cryptoCoins = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    color: "bg-yellow-500",
    icon: "₿",
    amount: "0.5 BTC",
    usdValue: "$14,000",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    color: "bg-blue-500",
    icon: "E",
    amount: "1.2 ETH",
    usdValue: "$2,800",
  },
  {
    id: "3",
    name: "Ripple",
    symbol: "XRP",
    color: "bg-purple-500",
    icon: "Ⓧ",
    amount: "300 XRP",
    usdValue: "$450",
  },
  {
    id: "4",
    name: "Litecoin",
    symbol: "LTC",
    color: "bg-green-500",
    icon: "Ł",
    amount: "0.5 LTC",
    usdValue: "$14,000",
  },
  {
    id: "5",
    name: "Bitcoin Cash",
    symbol: "BCH",
    color: "bg-red-500",
    icon: "₿",
    amount: "0.5 BCH",
    usdValue: "$14,000",
  },
  {
    id: "6",
    name: "Ethereum Classic",
    symbol: "ETC",
    color: "bg-blue-500",
    icon: "Ξ",
    amount: "1.2 ETC",
    usdValue: "$2,800",
  },
  {
    id: "7",
    name: "Dogecoin",
    symbol: "DOGE",
    color: "bg-green-500",
    icon: "Ł",
    amount: "0.5 DOGE",
    usdValue: "$14,000",
  },
  {
    id: "8",
    name: "Bitcoin Gold",
    symbol: "BTG",
    color: "bg-yellow-500",
    icon: "₿",
    amount: "0.5 BTG",
    usdValue: "$14,000",
  },
  {
    id: "9",
    name: "Dash",
    symbol: "DASH",
    color: "bg-blue-500",
    icon: "Ξ",
    amount: "1.2 DASH",
    usdValue: "$2,800",
  },
  {
    id: "10",
    name: "Monero",
    symbol: "XMR",
    color: "bg-purple-500",
    icon: "Ⓧ",
    amount: "300 XMR",
    usdValue: "$450",
  },
  {
    id: "11",
    name: "Zcash",
    symbol: "ZEC",
    color: "bg-green-500",
    icon: "Ł",
    amount: "0.5 ZEC",
    usdValue: "$14,000",
  },
  {
    id: "12",
    name: "Bitcoin SV",
    symbol: "BSV",
    color: "bg-yellow-500",
    icon: "₿",
    amount: "0.5 BSV",
    usdValue: "$14,000",
  },
  {
    id: "13",
    name: "Bitcoin Private",
    symbol: "BTCP",
    color: "bg-blue-500",
    icon: "Ξ",
    amount: "1.2 BTCP",
    usdValue: "$2,800",
  },
  {
    id: "14",
    name: "Bitcoin Atom",
    symbol: "BCA",
    color: "bg-purple-500",
    icon: "Ⓧ",
    amount: "300 BCA",
    usdValue: "$450",
  },
];

const CryptoListScreen = () => {
  const {
    loading,
    error,
    data: currentUser,
    refetch,
  } = useQuery(GET_CURRENT_USER);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const filteredCoins = cryptoCoins.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      setSearchQuery(""); // Clear search query when closing search
    }
  };

  return (
    <SafeAreaView className="bg-[#FFFFFF] flex-1">
      {/* Header Section */}
      <View className="flex-row justify-between items-center p-4">
        <Avatar
          imageSource={{
            uri: fixImageUrl(currentUser?.me?.profileImage),
          }}
        />
        <Text className="text-xl font-bold">Crypto List</Text>
        <TouchableOpacity onPress={handleSearchToggle}>
          <FontAwesome5 name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Box */}
      {isSearching && (
        <View className="p-4">
          <TextInput
            placeholder="Search for a coin"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="border border-gray-300 rounded-lg p-2"
          />
        </View>
      )}

      <View className="flex-1 bg-white">
        <FlatList
          data={filteredCoins}
          renderItem={({ item }) => <CryptoCoinCard item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default CryptoListScreen;
