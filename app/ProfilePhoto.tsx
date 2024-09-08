import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation from @react-navigation/native
import { MaterialIcons } from "@expo/vector-icons"; // Ensure you have @expo/vector-icons installed

const ProfilePhotoScreen = () => {
  const navigation: any = useNavigation(); // Initialize navigation
  const [profileImage, setProfileImage] = useState(null);

  const pickImageFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Allow media library access to select a profile photo."
      );
      return;
    }

    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
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

    let result: any = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    // Navigate to the next screen
    navigation.navigate("NextScreen"); // Replace 'NextScreen' with your actual next screen name
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center items-center">
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

      <Text className="text-2xl font-bold mb-4">Add a profile photo</Text>
      <Text className="text-gray-500 mb-8">
        Add a profile photo so your friends know it's you!
      </Text>

      <Image
        source={
          profileImage
            ? { uri: profileImage }
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

      {/* Next Button */}
      <TouchableOpacity
        className="bg-[#23C562] p-4 rounded-lg items-center"
        onPress={() => navigation.navigate("(tabs)")}
      >
        <Text className="text-white text-lg font-bold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePhotoScreen;
