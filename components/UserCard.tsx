import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const UserCard = ({
  userImage,
  username,
  userHandle,
  isFollowing,
  onFollowToggle,
}: any) => {
  return (
    <View className="p-4 bg-white shadow-md my-2 rounded-lg flex-row items-center">
      {/* User Info */}
      <Image source={{ uri: userImage }} className="w-12 h-12 rounded-full" />
      <View className="ml-3 flex-1">
        <Text className="font-bold text-md">{username}</Text>
        <Text className="text-gray-500">@{userHandle}</Text>
      </View>

      {/* Follow / Unfollow Button */}
      <TouchableOpacity
        onPress={onFollowToggle}
        className={`py-2 px-4 rounded-lg ${
          isFollowing ? "bg-gray-300" : "bg-[#23C562]"
        }`}
      >
        <Text
          className={`text-sm font-bold ${
            isFollowing ? "text-gray-700" : "text-white"
          }`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserCard;
