import { fixImageUrl } from "@/utils/fixImageUrl.utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PostLikeButton from "../PostLikeButton";

const PostCard = ({
  avatar,
  username,
  handle,
  postText,
  postImage,
  likes,
  id,
  currentUserId,
  stats,
  ownerId,
}: any) => {
  const navigation: any = useNavigation();

  return (
    <View className="p-4 bg-white shadow-md my-2 rounded-lg">
      <View className="flex-row items-center mb-2">
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile", { userId: ownerId })}
        >
          <Image
            source={{ uri: fixImageUrl(avatar) }}
            className="w-10 h-10 rounded-full"
          />
        </TouchableOpacity>

        <View className="ml-2">
          <Text className="font-bold text-black">{username}</Text>
          <Text className="text-gray-500">@{handle}</Text>
        </View>
      </View>

      <View className="flex-1 flex-col pl-3 mt-2 pr-3">
        <Text className="mb-2 text-gray-800">{postText}</Text>

        {postImage && (
          <Image
            source={{ uri: fixImageUrl(postImage) }}
            className="w-full h-40 rounded-lg"
          />
        )}

        <View className="flex-row justify-between mt-2 w-full">
          <View className="flex-row items-center">
            <PostLikeButton likes={likes} postId={id} />
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => {
                navigation.navigate("SinglePost", {
                  postId: id,
                });
              }}
            >
              <Ionicons name="chatbubble-outline" size={24} color="black" />
              <Text className="ml-1 text-gray-800">
                {stats?.totalComments || 0}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="share-outline" size={24} color="black" />
            <Text className="ml-1 text-gray-800">
              {stats?.totalShares || 0}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({});
