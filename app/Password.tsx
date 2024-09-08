import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Ensure you have @expo/vector-icons installed
import { useNavigation } from "expo-router";

const PasswordScreen = () => {
  const [password, setPassword] = useState("");

  const navigation: any = useNavigation();

  const handleContinue = () => {
    // Add logic to handle password submission
    if (password.length >= 8) {
      navigation.navigate("ProfilePhoto");
    }
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-10 left-6 z-10"
      >
        <View className="flex-row items-center justify-center bg-slate-200 rounded-full p-1">
          <MaterialIcons
            className=""
            name="arrow-back"
            size={24}
            color="black"
          />
        </View>
      </TouchableOpacity>

      <Text className="text-2xl font-bold mb-4">Create a password</Text>
      <Text className="text-gray-500 mb-8">
        This should be 8 characters or more
      </Text>

      <View className="border border-gray-300 rounded-lg flex-row items-center p-3 mb-8">
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className="flex-1"
        />
        <MaterialIcons name="lock" size={24} color="black" />
      </View>

      <TouchableOpacity
        className="bg-[#23C562] p-4 rounded-lg items-center"
        onPress={handleContinue}
      >
        <Text className="text-white text-lg font-bold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordScreen;
