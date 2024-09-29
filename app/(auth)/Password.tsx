import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

const PasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [eyeIcon, setEyeIcon] = useState("eye-off");
  const { username, firstName, lastName } = useLocalSearchParams();

  const validatePassword = (pass: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return regex.test(pass);
  };

  const handleContinue = () => {
    if (validatePassword(password)) {
      router.push({
        pathname: "/(auth)/ProfilePhoto",
        params: { username, password, firstName, lastName },
      });
    } else {
      Alert.alert(
        "Invalid Password",
        "Password must be 8-20 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
    }
  };

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

      <Text className="text-2xl font-bold mb-4">Create a password</Text>
      <Text className="text-gray-500 mb-8">
        This should be 8-20 characters long with at least one uppercase letter,
        one lowercase letter, one digit, and one special character.
      </Text>

      <View className="border border-gray-300 rounded-lg flex-row items-center p-3 mb-8">
        <TextInput
          secureTextEntry={eyeIcon === "eye-off"}
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
            name={eyeIcon === "eye-off" ? "visibility" : "visibility-off"}
            size={24}
            color="black"
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
