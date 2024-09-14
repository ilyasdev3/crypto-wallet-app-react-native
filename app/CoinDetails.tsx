import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { router, useNavigation } from "expo-router";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import debounce from "lodash.debounce";

const fetchCoinData = async (currency: string, days: number) => {
  try {
    const [coinResponse, chartResponse] = await Promise.all([
      axios.get(`https://api.coingecko.com/api/v3/coins/${currency}`),
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${currency}/market_chart?vs_currency=usd&days=${days}`
      ),
    ]);

    const { data: coin } = coinResponse;
    const { prices } = chartResponse.data;

    const labels = prices.map((price: [number, number]) =>
      new Date(price[0]).toLocaleDateString()
    );
    const dataset = prices.map((price: [number, number]) => price[1]);

    return {
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image.large,

      price: coin.market_data.current_price.usd,
      volume: coin.market_data.total_volume.usd,
      changePercentage: coin.market_data.price_change_percentage_24h,
      chartData: {
        labels,
        datasets: [{ data: dataset }],
      },
    };
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return null;
  }
};

type RouteParams = {
  coin: any;
};

const CoinDetailsScreen = () => {
  const route: any = useRoute<RouteProp<RouteParams>>();
  const coin = route.params.coin;
  console.log("coin", coin);

  const [selectedPeriod, setSelectedPeriod] = useState("1D");
  const [selectedTab, setSelectedTab] = useState("Top");
  const [coinData, setCoinData] = useState<{
    name: string;
    symbol: string;
    image: string;
    price: number;
    volume: number;
    changePercentage: number;
    chartData: {
      labels: string[];
      datasets: { data: number[] }[];
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get("window").width;

  const navigation = useNavigation();

  // Use memoization for the fetch function to avoid unnecessary re-fetches
  const fetchCoinDataDebounced = useMemo(
    () =>
      debounce(async (period: string) => {
        setLoading(true);
        const data = await fetchCoinData(
          coin ? coin : "bitcoin",
          period === "1D" ? 1 : period === "7D" ? 7 : 30
        );
        setCoinData(data);
        setLoading(false);
      }, 500),
    []
  );

  useEffect(() => {
    fetchCoinDataDebounced(selectedPeriod);
  }, [selectedPeriod]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!coinData) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text>Error loading data</Text>
        <TouchableOpacity
          className="bg-red-500 p-4 rounded-lg items-center mt-4"
          onPress={() => {
            console.log("reloading");
            router.replace("/CoinDetails");
          }}
        >
          <Text>Reload</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 p-4 rounded-lg items-center mt-4"
          onPress={() => {
            console.log("reloading");
            router.replace("/(tabs)/home");
          }}
        >
          <Text>Go to home screen</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        {/* Header Section */}
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <View className="flex-row items-center">
            <Image source={{ uri: coinData.image }} className="w-8 h-8 mr-2" />
            <Text className="text-lg font-bold">{coinData.name}</Text>
          </View>
          <TouchableOpacity>
            <FontAwesome5 name="ellipsis-v" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Price and Change */}
        <View className="flex-row items-center mb-4">
          <Text className="text-2xl font-bold mr-2">
            ${coinData.price.toLocaleString()}
          </Text>
          <View
            className={`px-2 py-1 rounded-full ${
              coinData.changePercentage < 0 ? "bg-red-500" : "bg-green-500"
            }`}
          >
            <Text className="text-white font-bold">
              {coinData.changePercentage.toFixed(2)}%
            </Text>
          </View>
        </View>

        {/* Period Selector */}
        <View className="flex-row justify-between mb-4">
          {["1D", "7D", "1M", "3M", "6M", "1Y", "5Y"].map((period) => (
            <TouchableOpacity
              key={period}
              className={`px-3 py-2 rounded-full ${
                selectedPeriod === period ? "bg-green-500" : "bg-gray-200"
              }`}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                className={`${
                  selectedPeriod === period ? "text-white" : "text-black"
                }`}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart */}
        <View className="mt-4 mb-6">
          <LineChart
            data={coinData.chartData}
            width={screenWidth - 32} // Full width minus padding
            height={220}
            yAxisLabel="$"
            withVerticalLines={false}
            withHorizontalLines={false}
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={true}
            chartConfig={{
              backgroundColor: "#FFFFFF",
              backgroundGradientFrom: "#FFFFFF",
              backgroundGradientTo: "#FFFFFF",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(20, 140, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForBackgroundLines: {
                stroke: "#EEEEEE",
                strokeDasharray: "0",
                strokeWidth: 1,
              },
              propsForLabels: {
                fontSize: 10,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <View className="flex-row justify-between mt-2">
            {coinData.chartData.labels
              .filter((_, index) => index % 2 === 0)
              .map((label, index) => (
                <Text key={index} className="text-xs text-gray-500">
                  {label}
                </Text>
              ))}
          </View>
        </View>

        {/* Tabs */}
        {/* <View className="flex-row justify-between mt-4">
          {["Top", "Invest", "Socials", "Market"].map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`px-4 py-2 rounded-full ${
                selectedTab === tab ? "bg-black" : "bg-gray-200"
              }`}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                className={`${
                  selectedTab === tab ? "text-white" : "text-black"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}

        {/* Live Data */}
        {selectedTab === "Top" && (
          <View className="mt-4">
            <Text className="text-lg font-bold mb-2">
              {coinData.name} Price Live Data
            </Text>
            <Text className="text-sm text-gray-600">
              The live Bitcoin price today is ${coinData.price.toLocaleString()}
              USD with a 24-hour trading volume of $
              {coinData.volume.toLocaleString()}
              USD. We update our BTC to USD price in real-time.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CoinDetailsScreen;
