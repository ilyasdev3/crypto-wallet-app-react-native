import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as Google from "expo-google-app-auth"; // For Google authentication

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to handle email-password registration
  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Add your registration logic here
    Alert.alert("Success", `Account created for ${name}`);
  };

  // Function to handle Google registration (or login)
  const handleGoogleSignUp = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "YOUR_ANDROID_CLIENT_ID",
        iosClientId: "YOUR_IOS_CLIENT_ID",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        Alert.alert("Success", `Signed up with Google: ${result.user.name}`);
      } else {
        Alert.alert("Cancelled", "Google sign-up was cancelled.");
      }
    } catch (error) {
      Alert.alert("Error", "Google sign-up failed. Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-center bg-gray-100 p-6">
      <View className="bg-white p-6 rounded-lg shadow-md">
        <Text className="text-2xl font-bold mb-6 text-center">Register</Text>

        {/* Name Input */}
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full Name"
          className="mb-4 px-4 py-3 border border-gray-300 rounded"
        />

        {/* Email Input */}
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          className="mb-4 px-4 py-3 border border-gray-300 rounded"
        />

        {/* Password Input */}
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          className="mb-4 px-4 py-3 border border-gray-300 rounded"
        />

        {/* Confirm Password Input */}
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
          className="mb-6 px-4 py-3 border border-gray-300 rounded"
        />

        {/* Register Button */}
        <TouchableOpacity
          onPress={handleRegister}
          className="bg-blue-600 py-3 rounded"
        >
          <Text className="text-white text-center text-lg font-bold">
            Register
          </Text>
        </TouchableOpacity>

        {/* OR Divider */}
        <View className="flex-row items-center justify-center my-4">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-2 text-gray-500">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Sign up with Google */}
        <TouchableOpacity
          onPress={handleGoogleSignUp}
          className="bg-red-500 flex-row py-3 rounded items-center justify-center"
        >
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/62.jpg" }} // Replace with actual Google icon path
            className="w-6 h-6 mr-2"
          />
          <Text className="text-white text-center text-lg font-bold">
            Sign up with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterPage;
