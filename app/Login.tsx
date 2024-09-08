import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation: any = useNavigation();

  const handleLogin = () => {
    // Add login logic here
    console.log("Username: ", username, "Password: ", password);
    // Redirect to home page or newsfeed after login
    navigation.navigate("(tabs)");
  };

  return (
    <View className="flex-1 justify-center bg-white p-4">
      <Text className="text-3xl font-bold text-gray-800 text-center mb-6">
        Login
      </Text>

      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          Username
        </Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          className="bg-gray-100 p-3 rounded-lg text-lg border border-gray-300"
        />
      </View>

      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          Password
        </Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          className="bg-gray-100 p-3 rounded-lg text-lg border border-gray-300"
        />
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-green-500 p-4 rounded-lg items-center mb-4"
      >
        <Text className="text-white text-lg font-bold">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Username")}>
        <Text className="text-center text-blue-500 text-lg">
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
