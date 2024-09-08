import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const PostCard = ({
  avatar,
  username,
  handle,
  postText,
  postImage,
  likes,
  comments,
  shares,
}: any) => {
  return (
    <View className="p-4 bg-white shadow-md my-2 rounded-lg">
      {/* User Info (Avatar on the Left) */}
      <View className="flex-row items-center mb-2">
        <Image source={{ uri: avatar }} className="w-10 h-10 rounded-full" />
        <View className="ml-2">
          <Text className="font-bold text-black">{username}</Text>
          <Text className="text-gray-500">@{handle}</Text>
        </View>
      </View>

      {/* Post Content */}
      <View className="flex-1 flex-col items-center pl-12 pr-3">
        <Text className="mb-2 text-gray-800">{postText}</Text>

        {postImage && (
          <Image
            source={{ uri: postImage }}
            className="w-full h-40 rounded-lg"
          />
        )}

        {/* Interaction Bar (Likes, Comments, Shares) */}
        <View className="flex-row justify-between mt-2 w-full">
          <View className="flex-row items-center">
            <Ionicons name="heart-outline" size={24} color="black" />
            <Text className="ml-1 text-gray-800">{likes}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="chatbubble-outline" size={24} color="black" />
            <Text className="ml-1 text-gray-800">{comments}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="share-outline" size={24} color="black" />
            <Text className="ml-1 text-gray-800">{shares}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({});
