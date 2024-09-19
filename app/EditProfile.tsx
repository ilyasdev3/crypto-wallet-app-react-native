import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { RouteParams, router, useNavigation } from "expo-router";
import { RouteProp, useRoute } from "@react-navigation/native";
import { GET_CURRENT_USER } from "@/lib/graphql/user/user.queries";
import { UPDATE_USER } from "@/lib/graphql/user/user.mutations";
import { useMutation, useQuery } from "@apollo/client";
import { fixImageUrl } from "@/utils/fixImageUrl.utils";

const EditProfilePage = () => {
  const navigation: any = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [message, setMessage] = useState("");

  const {
    loading,
    error,
    data: currentUser,
    refetch,
  } = useQuery(GET_CURRENT_USER);
  console.log("currentUser", currentUser);

  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      console.log("User updated successfully:", data);
      setMessage("User updated successfully");
      refetch();
      setTimeout(() => {
        navigation.navigate("Profile", {
          userId: currentUser?.me?.id,
        });
      }, 1500);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
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
      setImage(result.assets[0].uri);
    }
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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Error loading data</Text>
        <TouchableOpacity
          onPress={() => {
            console.log("reloading");
            refetch();
            ``;
          }}
        >
          <Text>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSave = async () => {
    if (firstName === "" || lastName === "" || email === "" || bio === "") {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    const updatedUser: any = {};

    if (firstName) updatedUser.firstName = firstName;
    if (lastName) updatedUser.lastName = lastName;
    if (email) updatedUser.email = email;
    if (bio) updatedUser.bio = bio;
    if (profileImage) updatedUser.profileImage = profileImage.base64;

    try {
      await updateUser({
        variables: {
          user: updatedUser,
        },
      });

      // Alert.alert("Success", `Profile updated successfully.`);
    } catch (error) {
      console.error("Update failed:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
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
          onPress={pickImageFromLibrary}
          className="items-center justify-center"
        >
          <Image
            source={{
              uri: profileImage || fixImageUrl(currentUser?.me?.profileImage),
            }} // Fix URL and prioritize profileImage
            className="w-24 h-24 rounded-full"
            resizeMode="cover"
          />
          <Text className="text-blue-600 mt-2">Change Profile Picture</Text>
        </TouchableOpacity>

        {/* Name Input */}
        <View className="mt-6">
          <Text className="text-gray-500 mb-2">FirstName</Text>
          <TextInput
            value={firstName || currentUser?.me?.firstName}
            onChangeText={setFirstName}
            placeholder="Enter first name"
            className="px-4 py-2 border border-gray-300 rounded"
          />
        </View>
        <View className="mt-6">
          <Text className="text-gray-500 mb-2">Last Name</Text>
          <TextInput
            value={lastName || currentUser?.me?.lastName}
            onChangeText={setLastName}
            placeholder="Enter last name"
            className="px-4 py-2 border border-gray-300 rounded"
          />
        </View>

        {/* Email Input */}
        <View className="mt-6">
          <Text className="text-gray-500 mb-2">Email</Text>
          <TextInput
            value={email || currentUser?.me?.email}
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
            value={bio || currentUser?.me?.bio}
            onChangeText={setBio}
            placeholder="Tell us something about yourself"
            multiline
            className="px-4 py-2 border border-gray-300 rounded h-24"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          className={`mt-6 py-3 rounded ${
            updateLoading ? "bg-gray-400" : "bg-[#23C562]"
          }`}
          disabled={updateLoading} // Disable the button while updating
        >
          {updateLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text className="text-white text-center text-lg font-bold">
              Save Changes
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfilePage;
