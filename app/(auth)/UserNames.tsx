import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";

const NameScreen = () => {
  console.log("NameScreen rendered");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const handleCheckUsername = () => {
    if (firstName === "" && lastName === "") {
      setMessage("Please enter your name");
      return;
    } else if (firstName === "") {
      setMessage("Please enter your first name");
      return;
    } else if (lastName === "") {
      setMessage("Please enter your last name");
      return;
    }

    // Add login logic here
    console.log("Username: ", firstName, lastName);

    //  push to username screen
    router.push(`/(auth)/Username?firstName=${firstName}&lastName=${lastName}`);
  };

  const getStatusColor = () => {
    if (message === "Username available") return "text-green-500";
    return "text-red-500";
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-2xl font-bold mb-4">Enter Your Name</Text>
      <Text className="text-gray-500 mb-8">
        This will be used for your username
      </Text>

      <View className="border border-gray-300 rounded-lg flex-row items-center p-3 mb-2">
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            setMessage("");
          }}
          className="flex-1"
          autoCapitalize="words"
        />
      </View>

      <View className="border border-gray-300 rounded-lg flex-row items-center p-3 mb-2">
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
            setMessage("");
          }}
          className="flex-1"
          autoCapitalize="words"
        />
      </View>

      {message && <Text className={`mb-4 ${getStatusColor()}`}>{message}</Text>}

      <TouchableOpacity
        className="bg-[#23C562] p-4 rounded-lg items-center"
        onPress={handleCheckUsername}
      >
        <Text className="text-white text-lg font-bold">Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="p-4 mt-4"
        onPress={() => router.push("/(auth)/Login")}
      >
        <Text className="text-center text-blue-500 text-lg">
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NameScreen;
