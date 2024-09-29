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
import { router, useLocalSearchParams } from "expo-router";
import { useMutation } from "@apollo/client";
import { CHECK_USERNAME } from "../../lib/graphql/user/user.mutations";

const UsernameScreen = () => {
  console.log("UsernameScreen rendered");

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const { firstName, lastName } = useLocalSearchParams();

  console.log("firstName", firstName);
  console.log("lastName", lastName);

  const [checkUsername, { loading }] = useMutation(CHECK_USERNAME, {
    onCompleted: (data) => {
      console.log("Mutation completed successfully:", data);
      setMessage(data.checkUsername);
      if (data.checkUsername === "Username available") {
        console.log("Username is available, redirecting to Password screen");
        return router.push(
          `/(auth)/Password?username=${username}&firstName=${firstName}&lastName=${lastName}`
        );
      } else {
        console.log(
          "Username is not available, redirecting to Username screen"
        );

        setMessage("Username is not available");
        return;
      }
    },
    onError: (error) => {
      setMessage(error.message);
    },
  });

  const handleCheckUsername = () => {
    if (username.length >= 5) {
      setMessage("Checking username availability...");
      checkUsername({ variables: { username } }).catch((error) => {
        console.error("Mutation error caught:", error);
        setMessage(error.message);
        Alert.alert("Error", "Failed to check username. Please try again.");
      });
    } else {
      setMessage("Username must be at least 5 characters long");
    }
  };

  const getStatusColor = () => {
    if (loading) return "text-yellow-500";
    if (message === "Username available") return "text-green-500";
    return "text-red-500";
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-2xl font-bold mb-4">Choose a username</Text>
      <Text className="text-gray-500 mb-8">
        This will be your public handle
      </Text>

      <View className="border border-gray-300 rounded-lg flex-row items-center p-3 mb-2">
        <TextInput
          placeholder="Your name"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setMessage("");
          }}
          className="flex-1"
          autoCapitalize="none"
        />
        <Image
          source={{
            uri: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png",
          }}
          className="w-6 h-6 ml-2"
        />
      </View>

      {message && <Text className={`mb-4 ${getStatusColor()}`}>{message}</Text>}

      <TouchableOpacity
        className={`bg-[#23C562] p-4 rounded-lg items-center ${
          loading || username.length < 5 ? "opacity-50" : ""
        }`}
        onPress={handleCheckUsername}
        disabled={loading || username.length < 5}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-lg font-bold">Continue</Text>
        )}
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

export default UsernameScreen;
