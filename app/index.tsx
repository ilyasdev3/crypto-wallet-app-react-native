import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "expo-router";

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn: any = await LoginCheck();
        setIsLoggedIn(loggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const LoginCheck = async () => {
      return new Promise((resolve) => setTimeout(() => resolve(false), 2000));
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        navigation.navigate("(tabs)");
      }
    }
  }, [isLoading, isLoggedIn, navigation]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!isLoggedIn && !isLoading)
    return (
      <View className="flex-1 bg-gray-100 relative">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-full h-full absolute"
          style={{ resizeMode: "cover" }}
        />
        <TouchableOpacity
          className="bg-[#23C562] p-4 rounded-full absolute bottom-10 left-10 right-10 items-center"
          onPress={() => navigation.navigate("Username")}
        >
          <Text className="text-white text-lg font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    );
};

export default HomeScreen;
