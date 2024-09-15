import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useMutation } from "@apollo/client";
import { router } from "expo-router";
// import { GET_POST_COMMENTS } from "@/lib/graphql/comment/comment.queries";
// import { CREATE_COMMENT } from "@/lib/graphql/comment/comment.mutations";

interface Props {
  postId: string;
  isVisible: boolean;
  onClose: () => void;
  postTitle: string;
  postImage: string;
  postUser: string;
  postComments: number;
  postLikes: number;
  currentUserId: string;
}

const PostModel = ({
  postId,
  isVisible,
  onClose,
  postComments,
  postLikes,
  currentUserId,
  postTitle,
  postImage,
  postUser,
}: Props) => {
  const [newComment, setNewComment] = useState("");

  //   const { loading, error, data } = useQuery(GET_POST_COMMENTS, {
  //     variables: { postId },
  //   });

  //   const [createComment] = useMutation(CREATE_COMMENT, {
  //     onCompleted: () => {
  //       setNewComment(""); // Clear input field
  //       // Optionally refetch comments here
  //     },
  //     onError: (err) => {
  //       console.error("Error creating comment:", err);
  //     },
  //   });

  const handleAddComment = () => {
    // createComment({ variables: { postId, text: newComment } });
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View className="flex-1 bg-white p-4 rounded-lg">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={onClose} className="flex-row items-center">
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text className="ml-1 text-gray-800">Back</Text>
          </TouchableOpacity>
          <Text className="text-gray-800">Comments ({postComments})</Text>
        </View>

        <ScrollView className="flex-1">
          <Text className="text-gray-700 mb-2">{postTitle}</Text>
          <Text className="text-gray-600 mb-2">{postUser}</Text>
          <Text className="text-gray-600 mb-2">{postImage}</Text>

          {/* Comments */}
          {/* <Text className="text-gray-700 mb-2">Comments</Text>
        {comments.map((comment: any, index: any) => (
          <Text key={index} className="text-gray-600 mb-2">
            {comment.text}
          </Text>
        ))} */}

          {/* New Comment Input */}
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-700 mb-2">Add a comment</Text>
            <TouchableOpacity onPress={handleAddComment}>
              <Ionicons name="add-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Enter your comment"
            className="border border-gray-300 rounded-lg p-2 mb-4"
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default PostModel;
