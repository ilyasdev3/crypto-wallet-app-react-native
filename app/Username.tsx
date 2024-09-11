import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { router, useRouter } from "expo-router";
import { useMutation } from "@apollo/client";
import { MaterialIcons } from "@expo/vector-icons"; // Ensure you have @expo/vector-icons installed
import { CHECK_USERNAME } from "../lib/graphql/user/user.mutations";

const UsernameScreen = () => {
  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [checkUsername, { loading }] = useMutation(CHECK_USERNAME, {
    onCompleted: (data) => {
      console.log("Mutation completed successfully:", data);
      setUsernameStatus(data.checkUsername);
      setIsValid(true);
      // Navigate to the next screen after a short delay
      setTimeout(() => router.push(`/Password?username=${username}`), 500);
    },
    onError: (error) => {
      // console.error("Mutation error:", error);
      setUsernameStatus(error.message);
      setIsValid(false);
    },
  });

  const handleCheckUsername = () => {
    setUsernameStatus("checking username availability...");
    if (username.length > 0) {
      checkUsername({ variables: { username } });
    }
  };

  const getStatusColor = () => {
    if (loading) return "text-yellow-500";
    if (isValid) return "text-green-500";
    return "text-red-500";
  };

  useEffect(() => {
    if (usernameStatus) {
      const timer = setTimeout(() => {
        setUsernameStatus("");
      }, 5000);
      return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts or usernameStatus changes
    }
  }, [usernameStatus]);

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-10 left-6 z-10"
      >
        <View className="flex-row items-center justify-center bg-slate-200 rounded-full p-1">
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </View>
      </TouchableOpacity>

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
            setUsernameStatus("");
            setIsValid(false);
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

      {usernameStatus && (
        <Text className={`mb-4 ${getStatusColor()}`}>{usernameStatus}</Text>
      )}

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
        onPress={() => router.push("/Login")}
      >
        <Text className="text-center text-blue-500 text-lg">
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UsernameScreen;
