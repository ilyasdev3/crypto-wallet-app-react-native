import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Ensure you have @expo/vector-icons installed
import { useNavigation } from "expo-router";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../lib/graphql/user/user.mutations"; // Adjust the path to where your mutation is located
import { router, useRouter, useLocalSearchParams } from "expo-router";

const PasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [eyeIcon, setEyeIcon] = useState("eye-off");

  const params = useLocalSearchParams();
  const username = params.username;

  const navigation: any = useNavigation();

  const handleContinue = () => {
    if (!password) {
      setMessage("Please enter a password");
      setIsValid(false);
    }
    if (password.length < 8 || password.length > 20) {
      setMessage("Password must be between 8 and 20 characters");
      setIsValid(false);
    }
    // Password complexity validation
    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      setMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
      setIsValid(false);
    }
    if (password.length >= 8) {
      setMessage("Password is valid");
      setIsValid(true);
      router.push(`/ProfilePhoto?username=${username}&password=${password}`);
    }
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
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
          secureTextEntry={eyeIcon === "eye" ? true : false}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className="flex-1"
        />
        <TouchableOpacity
          onPress={() => setEyeIcon(eyeIcon === "eye-off" ? "eye" : "eye-off")}
          className="ml-2 p-1 rounded-full"
        >
          <MaterialIcons
            name={eyeIcon === "eye" ? "lock" : "lock-open"}
            size={24}
            color="black"
            // style={{
            //   transform: [{ rotate: eyeIcon === "eye" ? "0deg" : "-90deg" }],
            // }}
          />
        </TouchableOpacity>
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
