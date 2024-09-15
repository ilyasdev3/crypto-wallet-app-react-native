import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { RouteParams, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { fixImageUrl } from "@/utils/fixImageUrl.utils";
import PostLikeButton from "@/components/PostLikeButton";
import { GET_POST } from "@/lib/graphql/post/post.queries";
import { CREATE_COMMENT } from "@/lib/graphql/comment/comment.mutations";
import { GET_COMMENTS } from "@/lib/graphql/comment/comment.queries";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const SinglePostPage = () => {
  const route: any = useRoute<RouteProp<RouteParams<any>>>();
  const { postId } = route.params;

  const [comment, setComment] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_POST, {
    variables: { getPost: postId },
    fetchPolicy: "no-cache",
  });

  const {
    loading: commentsLoading,
    error: commentsError,
    data: commentsData,
    refetch: refetchComments,
  } = useQuery(GET_COMMENTS, {
    variables: { getCommentsId: postId },
  });

  const [createComment, { loading: commentLoading }] = useMutation(
    CREATE_COMMENT,
    {
      onCompleted: (data) => {
        console.log("Comment created successfully:", data);
        refetchComments();
        refetch();
        setComment("");
      },
      onError: (error) => {
        console.error("Error creating comment:", error);
      },
    }
  );

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
        <Text>Error loading the post</Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const post = data?.getPost;

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between ml-3">
        <TouchableOpacity
          className=" bg-gray-300 p-1 rounded-full"
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1 bg-gray-100 p-4">
        {/* Post Header */}
        <View className="flex-row items-center mb-4">
          <Image
            source={{ uri: fixImageUrl(post?.userId?.profileImage) }}
            className="w-12 h-12 rounded-full mr-3"
          />
          <View>
            <Text className="text-lg font-bold">
              {post?.userId?.firstName} {post?.userId?.lastName}
            </Text>
            <Text className="text-gray-500">@{post?.userId?.username}</Text>
          </View>
        </View>

        {/* Post Content */}
        <View className="mb-4">
          <Text className="text-xl font-bold mb-2">{post?.title}</Text>
          <Text className="text-gray-700">{post?.content}</Text>
        </View>

        {/* Post Image */}
        {post?.image && (
          <Image
            source={{ uri: fixImageUrl(post?.image) }}
            className="w-full h-64 rounded-lg mb-4"
          />
        )}

        {/* Post Stats */}
        <View className="flex-row justify-between items-center my-4">
          <View className="flex-row items-center">
            <PostLikeButton likes={post?.likes} postId={post?.id} />
          </View>
          <View className="flex-row items-center">
            <MaterialIcons name="comment" size={24} color="black" />
            <Text className="ml-2">{post?.stats?.totalComments || 0}</Text>
          </View>
          <View className="flex-row items-center">
            <MaterialIcons name="share" size={24} color="black" />
            <Text className="ml-2">{post?.stats?.totalShares || 0}</Text>
          </View>
        </View>

        {/* Create Comment Section */}
        <View className="flex-row items-center mt-4">
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Add a comment"
            className="flex-1 bg-gray-100 p-3 rounded-lg"
          />
          <TouchableOpacity
            className="bg-green-500 p-2 rounded-lg"
            disabled={commentLoading}
            onPress={() => {
              console.log("comment", comment);
              createComment({
                variables: {
                  comment: {
                    content: comment,
                    postId: post?.id,
                  },
                },
              }).catch((error) => {
                console.error("Error creating comment:", error);
              });
            }}
          >
            <Text className="text-white text-center">Post</Text>
          </TouchableOpacity>
        </View>
        {/* Comments Section */}

        <View className="mt-4">
          <Text className="text-lg font-bold mb-4">Comments</Text>
          {commentsData?.getComments?.length > 0 ? (
            commentsData?.getComments.map((comment: any, index: number) => {
              return (
                <View key={index} className="flex-row items-start mb-4">
                  {/* User's Profile Image */}
                  <Image
                    source={{ uri: fixImageUrl(comment?.user?.profileImage) }}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <View className="flex-1">
                    {/* User's Name */}
                    <Text className="font-bold">
                      {comment?.user?.firstName} {comment?.user?.lastName}
                    </Text>
                    {/* Comment Content */}
                    <Text className="text-gray-700">{comment?.content}</Text>
                  </View>
                </View>
              );
            })
          ) : (
            <Text className="text-gray-500">No comments yet</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SinglePostPage;
