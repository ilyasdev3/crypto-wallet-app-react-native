import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // Ensure you have @expo/vector-icons installed

const UsernameScreen = () => {
  const navigation: any = useNavigation();
  const [username, setUsername] = useState("");

  const handleContinue = () => {
    // Add logic to handle username submission
    if (username) {
      navigation.navigate("PasswordScreen");
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

      <Text className="text-2xl font-bold mb-4">Choose a username</Text>
      <Text className="text-gray-500 mb-8">
        This will be your public handle
      </Text>

      <View className="border border-gray-300 rounded-lg flex-row items-center p-3 mb-8">
        <TextInput
          placeholder="Your name"
          value={username}
          onChangeText={setUsername}
          className="flex-1"
        />
        <Image
          source={{
            uri: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png",
          }}
          className="w-6 h-6 ml-2"
        />
      </View>

      <TouchableOpacity
        className="bg-[#23C562] p-4 rounded-lg items-center"
        onPress={() => navigation.navigate("Password")}
      >
        <Text className="text-white text-lg font-bold">Continue</Text>
      </TouchableOpacity>
      {/* already have an account? */}
      <TouchableOpacity
        className="p-4 "
        onPress={() => navigation.navigate("Login")}
      >
        <Text className="text-center text-blue-500 text-lg">
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UsernameScreen;
