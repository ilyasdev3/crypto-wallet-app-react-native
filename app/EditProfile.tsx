import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const EditProfilePage = () => {
  const [name, setName] = useState("Ann Korkowski");
  const [email, setEmail] = useState("anniekork@example.com");
  const [bio, setBio] = useState("UX Designer | Traveler | Coffee Lover ☕");
  const [profileImage, setProfileImage] = useState(
    "https://randomuser.me/api/portraits/men/60.jpg"
  );

  const navigation = useNavigation();

  const handleSave = () => {
    Alert.alert("Info", "Profile information saved.");
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access media library is required!"
      );
      return;
    }

    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="p-4 bg-white flex-row justify-between items-center shadow-sm pt-10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Edit Profile</Text>
        <View className="w-6" />
      </View>

      <View className="p-6 bg-white shadow-md mt-2 rounded-lg">
        {/* Profile Picture Section */}
        <TouchableOpacity
          onPress={pickImage}
          className="items-center justify-center"
        >
          <Image
            source={{ uri: profileImage }}
            className="w-24 h-24 rounded-full"
            resizeMode="cover"
          />
          <Text className="text-blue-600 mt-2">Change Profile Picture</Text>
        </TouchableOpacity>

        {/* Name Input */}
        <View className="mt-6">
          <Text className="text-gray-500 mb-2">Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter full name"
            className="px-4 py-2 border border-gray-300 rounded"
          />
        </View>

        {/* Email Input */}
        <View className="mt-6">
          <Text className="text-gray-500 mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email address"
            keyboardType="email-address"
            className="px-4 py-2 border border-gray-300 rounded"
          />
        </View>

        {/* Bio Input */}
        <View className="mt-6">
          <Text className="text-gray-500 mb-2">Bio</Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us something about yourself"
            multiline
            className="px-4 py-2 border border-gray-300 rounded h-24"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          className="bg-[#23C562] mt-6 py-3 rounded"
        >
          <Text className="text-white text-center text-lg font-bold">
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfilePage;
