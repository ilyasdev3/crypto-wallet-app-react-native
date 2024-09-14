import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../../lib/graphql/user/user.mutations";
import { router } from "expo-router";
import { setToken } from "@/utils/auth";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation: any = useNavigation();
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [loginUser, { loading }] = useMutation(USER_LOGIN, {
    onCompleted: (data) => {
      console.log("Mutation completed successfully:", data);
      setMessage(data.loginUser.message);
      console.log("Token:", data.loginUser.token);

      setIsValid(true);
      setToken(data.loginUser.token);
      // Redirect to home page or newsfeed after login
      router.replace("/(tabs)/home");
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      setMessage(error.message);
    },
  });

  const handleLogin = () => {
    setMessage("");
    if (!username || !password) {
      setMessage("Please enter a username and password");
      setIsValid(false);
    }
    // Add login logic here
    console.log("Username: ", username, "Password: ", password);

    if (username.length < 5 || password.length < 8) {
      setMessage("Username or password is too short");
      setIsValid(false);
    }
    if (username.length >= 5) {
      console.log("inside if");
      const user = { username, password };
      loginUser({ variables: { user } }).catch((error) => {
        console.error("Mutation error caught:", error);
        setMessage(error.message);
        // Alert.alert("Error", "Failed to check username. Please try again.");
      });
    } else {
      setMessage("Username must be at least 5 characters long");
    }

    // Redirect to home page or newsfeed after login
    // navigation.navigate("(tabs)");
  };

  const getStatusColor = () => {
    if (loading) return "text-yellow-500";
    if (message === "Login successful") return "text-green-500";
    return "text-red-500";
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

      {message && <Text className={`mb-4 ${getStatusColor()}`}>{message}</Text>}

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
