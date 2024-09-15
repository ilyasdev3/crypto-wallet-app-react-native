import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GET_CURRENT_USER } from "@/lib/graphql/user/user.queries";
import { useQuery } from "@apollo/client";
import { DO_LIKE } from "@/lib/graphql/post/post.mutations";
import { useMutation } from "@apollo/client";

const PostLikeButton = ({ likes, postId }: any) => {
  const {
    loading: userLoading,
    error: userError,
    data: currentUser,
    refetch: refetchUser,
  } = useQuery(GET_CURRENT_USER);

  const [toggleLike] = useMutation(DO_LIKE, {
    onCompleted: (data) => {
      console.log("Like created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating like:", error);
    },
    refetchQueries: ["GetAllPosts"],
  });

  const currentUserId = currentUser?.me?.id;

  const [localLikes, setLocalLikes] = useState(likes);

  useEffect(() => {
    setLocalLikes(likes);
  }, [likes]);

  const liked = useMemo(
    () => localLikes.includes(currentUserId),
    [localLikes, currentUserId]
  );

  const handleLike = async () => {
    await toggleLike({
      variables: { postId },
    });

    setLocalLikes(
      liked
        ? localLikes.filter((id: any) => id !== currentUserId)
        : [...localLikes, currentUserId]
    );
  };

  return (
    <TouchableOpacity onPress={handleLike} className="flex-row items-center">
      <Ionicons
        name={liked ? "heart" : "heart-outline"}
        size={24}
        color={liked ? "red" : "black"}
      />
      <Text className="ml-1 text-gray-800">{localLikes.length}</Text>
    </TouchableOpacity>
  );
};

export default PostLikeButton;
