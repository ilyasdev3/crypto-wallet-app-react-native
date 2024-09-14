import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const NewsCreationPage = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);

  // Function to pick an image
  const pickImage = async () => {
    // Ask for permission to access the gallery
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set image URI
    }
  };

  const handleSubmit = () => {
    // Add logic to create the news post
    console.log({ title, subtitle, image });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white p-4">
        <Text className="text-xl font-bold text-gray-800 text-center mb-6">
          Create News Post
        </Text>

        {/* back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute  left-2 z-10"
        >
          <View className="flex-row items-center justify-center bg-slate-200 rounded-full p-1">
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </View>
        </TouchableOpacity>
        {/* Image Upload Section */}
        <View className="mb-6 items-center">
          {image ? (
            <Image
              source={{ uri: image }}
              className="w-full h-60 rounded-lg"
              resizeMode="cover"
            />
          ) : (
            <TouchableOpacity
              onPress={pickImage}
              className="w-full h-60 bg-gray-200 rounded-lg items-center justify-center"
            >
              <Text className="text-lg font-bold text-gray-600">
                Upload Image
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Title Input */}
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700 mb-2">
            Title
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter news title"
            className="bg-gray-100 p-3 rounded-lg text-lg border border-gray-300"
          />
        </View>

        {/* Description Input */}
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700 mb-2">
            Description
          </Text>
          <TextInput
            value={subtitle}
            onChangeText={setSubtitle}
            placeholder="Enter subtitle"
            className="bg-gray-100 p-3 rounded-lg text-lg border border-gray-300"
            multiline
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-green-500 p-4 rounded-lg items-center mb-4"
        >
          <Text className="text-white text-lg font-bold">Create News</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsCreationPage;
