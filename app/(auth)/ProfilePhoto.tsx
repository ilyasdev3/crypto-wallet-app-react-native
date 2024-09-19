import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router, useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../lib/graphql/user/user.mutations";
import { setToken } from "@/utils/auth";
const ProfilePhotoScreen = () => {
  const [profileImage, setProfileImage] = useState<any>(null);
  const [message, setMessage] = useState("");

  const params = useLocalSearchParams();
  const { username, password } = params;

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: async (data) => {
      console.log("User created successfully:", data.createUser.token);
      setMessage("User created successfully");
      await setToken(data.createUser.token);

      // Redirect to main app after a short delay
      setTimeout(() => router.replace("/(tabs)"), 1500);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      setMessage(error.message);
    },
  });

  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setProfileImage(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Allow camera access to take a profile photo."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setProfileImage(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!profileImage) {
      setMessage("Please select an image first.");
      return;
    }

    try {
      const response = await createUser({
        variables: {
          user: {
            username,
            password,
            profileImage: profileImage.base64,
          },
        },
      });

      console.log("Upload successful:", response.data);
      await setToken(response.data.createUser.token);
      router.replace("/(tabs)/home");

      setMessage("User created successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("Failed to create user. Please try again.");
    }
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center items-center">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-10 left-6 z-10"
      >
        <View className="flex-row items-center justify-center bg-slate-200 rounded-full p-1">
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <Text className="text-2xl font-bold mb-4">Add a profile photo</Text>
      <Text className="text-gray-500 mb-8">
        Add a profile photo so your friends know it's you!
      </Text>

      <Image
        source={
          profileImage
            ? { uri: `data:image/jpeg;base64,${profileImage.base64}` }
            : {
                uri: "https://img.icons8.com/color/96/000000/user-male-circle.png",
              }
        }
        className="w-28 h-28 rounded-full mb-6"
      />

      <TouchableOpacity
        onPress={pickImageFromLibrary}
        className="bg-gray-200 py-4 px-8 rounded-full mb-4"
      >
        <Text className="text-center text-lg font-bold text-gray-700">
          Choose from Library
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={takePhoto}
        className="bg-gray-200 py-4 px-8 rounded-full mb-8"
      >
        <Text className="text-center text-lg font-bold text-gray-700">
          Take Photo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`bg-[#23C562] p-4 rounded-lg items-center ${
          loading || !profileImage ? "opacity-50" : ""
        }`}
        onPress={handleUpload}
        disabled={loading || !profileImage}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-lg font-bold">Continue</Text>
        )}
      </TouchableOpacity>

      {message && (
        <Text
          className={`mt-4 text-center text-lg font-bold ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </Text>
      )}
    </View>
  );
};

export default ProfilePhotoScreen;
