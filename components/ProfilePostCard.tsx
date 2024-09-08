import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfilePostCard = ({
  userImage,
  username,
  userHandle,
  postText,
  postImage,
  likes,
  comments,
  shares,
}: any) => {
  return (
    <View className="p-4 bg-white shadow-md my-2 rounded-lg">
      {/* User Information */}
      <View className="flex-row items-center mb-4">
        <Image source={{ uri: userImage }} className="w-12 h-12 rounded-full" />
        <View className="ml-3">
          <Text className="font-bold text-lg">{username}</Text>
          <Text className="text-gray-500">@{userHandle}</Text>
        </View>
      </View>

      {/* Post Text */}
      <Text className="text-gray-700 mb-3">{postText}</Text>

      {/* Post Image */}
      {postImage && (
        <Image
          source={{ uri: postImage }}
          className="w-full h-48 rounded-lg mb-4"
        />
      )}

      {/* Post Actions */}
      <View className="flex-row justify-between items-center">
        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="heart-outline" size={18} color="black" />
          <Text className="ml-1 text-xs">{likes}k</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="chatbubble-outline" size={18} color="black" />
          <Text className="ml-1 text-xs">{comments}k </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="share-outline" size={18} color="black" />
          <Text className="ml-1 text-xs">{shares}k</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePostCard;
