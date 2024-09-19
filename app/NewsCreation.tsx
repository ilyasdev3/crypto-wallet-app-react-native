import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "@/lib/graphql/post/post.mutations";

const NewsCreationPage = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [descLength, setDescLength] = useState(0);

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    onCompleted: (data) => {
      console.log("Post created successfully:", data);
      router.replace("/");
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  // Function to pick an image
  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setImage(result.assets[0].base64);
      setImageUrl(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!title || !subtitle || !imageUrl) {
      setMessage("Please fill out all fields.");
      return;
    }
    if (descLength >= 100) {
      setMessage("Description cannot exceed 100 characters.");
      return;
    }

    createPost({
      variables: {
        post: {
          title,
          content: subtitle,
          image: image,
        },
      },
    });
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
          className="absolute left-2 z-10"
        >
          <View className="flex-row items-center justify-center bg-slate-200 rounded-full p-1">
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </View>
        </TouchableOpacity>

        {/* Image Upload Section */}
        <View className="mb-6 items-center">
          {imageUrl ? (
            <>
              {/* Cancel button */}
              <TouchableOpacity
                onPress={() => {
                  setImageUrl("");
                  setImage(null);
                }}
                className="absolute top-2 right-2 z-10"
              >
                <View className="flex-row items-center justify-center bg-slate-200 rounded-full p-1">
                  <MaterialIcons name="close" size={24} color="black" />
                </View>
              </TouchableOpacity>

              {/* Image display */}
              <Image
                source={{ uri: imageUrl }}
                className="w-full h-60 rounded-lg"
                resizeMode="cover"
              />
            </>
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

        {/* Show Loader if creating post */}

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-green-500 p-4 rounded-lg items-center mb-4"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-bold">Create News</Text>
          )}
        </TouchableOpacity>

        {/* Display message if any */}
        {message ? (
          <Text className="text-red-500 text-center mb-4">{message}</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsCreationPage;
