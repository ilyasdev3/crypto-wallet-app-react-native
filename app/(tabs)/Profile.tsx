import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, router, RouteParams } from "expo-router";
import ProfilePostCard from "@/components/ProfilePostCard";
import UserCard from "@/components/UserCard";
import { removeToken } from "@/utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_CURRENT_USER,
  GET_USER_BY_ID,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
} from "@/lib/graphql/user/user.queries";
import { FOLLOW_USER_UNFOLLOW_USER } from "@/lib/graphql/user/user.mutations";
import { GET_USER_POSTS } from "@/lib/graphql/post/post.queries";
import { fixImageUrl } from "@/utils/fixImageUrl.utils";
import { getFullName } from "@/utils/getFullName";
import { RouteProp, useRoute } from "@react-navigation/native";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("Posts");
  const navigation: any = useNavigation();

  const route: any = useRoute<RouteProp<RouteParams<any>>>();
  const { userId } = route.params;

  console.log("userId", userId);

  const data = [
    {
      userImage: "https://randomuser.me/api/portraits/men/60.jpg",
      username: "Ann Korkowski",
      userHandle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/61.jpg",
      username: "Ann Korkowski",
      userHandle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1458819714733-e5ab3d536722?q=80&w=1997&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/62.jpg",
      username: "Ann Korkowski",
      userHandle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/63.jpg",
      username: "Ann Korkowski",
      userHandle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/64.jpg",
      username: "Ann Korkowski",
      userHandle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1511649475669-e288648b2339?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/65.jpg",
      username: "Ann Korkowski",
      userHandle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/66.jpg",
      username: "Ann Korkowski",
      userHandle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1536662788222-6927ce05daea?q=80&w=3193&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/67.jpg",
      username: "Ann Korkowski",
      userHandle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://plus.unsplash.com/premium_photo-1673605603709-8599cbbd1a74?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/68.jpg",
      username: "Ann Korkowski",
      userHandle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1542086260-ddb62f405c8b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/69.jpg",
      username: "Ann Korkowski",
      userHandle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1533910534207-90f31029a78e?q=80&w=3101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
  ];

  const users = [
    {
      userImage: "https://randomuser.me/api/portraits/men/60.jpg",
      username: "Ilyas Khan",
      userHandle: "ilyask",
      isFollowing: true,
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/61.jpg",
      username: "Ann Korkowski",
      userHandle: "anniekork",
      isFollowing: false,
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/62.jpg",
      username: "John Doe",
      userHandle: "johndoe",
      isFollowing: true,
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/63.jpg",
      username: "Ann Korkowski",
      userHandle: "anniekork",
      isFollowing: false,
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/64.jpg",
      username: "John Doe",
      userHandle: "johndoe",
      isFollowing: true,
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/65.jpg",
      username: "Ann Korkowski",
      userHandle: "anniekork",
      isFollowing: false,
    },
  ];
  const handleLogout = async () => {
    try {
      await removeToken();
      console.log("User logged out");
      router.replace("/(auth)/Username");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const {
    loading,
    error,
    data: currentUser,
    refetch,
  } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "no-cache",
  });

  const {
    loading: userLoading,
    error: userError,
    data: userData,
    refetch: refetchUser,
  } = useQuery(GET_USER_BY_ID, {
    variables: {
      getUserId: userId,
    },
    fetchPolicy: "no-cache",
  });

  const {
    loading: userPostsLoader,
    error: userPostsError,
    data: userPostsData,
    refetch: refetchUserPosts,
  } = useQuery(GET_USER_POSTS, {
    variables: {
      getUserPostsId: userId,
    },
  });

  const {
    loading: userFollowersLoader,
    error: userFollowersError,
    data: userFollowersData,
    refetch: refetchUserFollowers,
  } = useQuery(GET_USER_FOLLOWERS, {
    variables: {
      getUserFollowersId: userId,
    },
  });
  const {
    loading: userFollowingLoader,
    error: userFollowingError,
    data: userFollowingData,
    refetch: refetchUserFollowing,
  } = useQuery(GET_USER_FOLLOWING, {
    variables: {
      getUserFollowingId: userId,
    },
  });

  const [followUser, { loading: followLoading }] = useMutation(
    FOLLOW_USER_UNFOLLOW_USER,

    {
      onCompleted: (data) => {
        console.log("User followed successfully:", data);
        refetch();
        refetchUser({
          getUserId: userId,
        });
        refetchUserPosts({
          getUserPostsId: userId,
        });
        refetchUserFollowers({
          getUserFollowersId: userId,
        });
        refetchUserFollowing({
          getUserFollowingId: userId,
        });
      },
      onError: (error) => {
        console.error("Error following user:", error);
      },
    }
  );

  // console.log("userFollowersData", userFollowersData);

  console.log(
    "userFollowersData?.getUserFollowers",
    userFollowersData?.getUserFollowers
  );

  console.log(
    "checking followings",
    userData?.getUser?.followers.includes(currentUser?.me?.id)
  );

  // console.log("user posts data", userPostsData?.getUserPosts[0]?.userId);
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

  // Inside your return function
  return (
    <View className="flex-1 bg-gray-100 ">
      {/* Header */}
      {/* Profile Info */}
      <View className="p-4 bg-white items-center shadow-md pt-10">
        <Image
          source={{
            uri:
              fixImageUrl(userData?.getUser?.profileImage) ||
              "https://randomuser.me/api/portraits/men/62.jpg",
          }}
          className="w-24 h-24 rounded-full"
        />
        <Text className="mt-2 text-xl font-bold text-black">
          {getFullName(
            userData?.getUser?.firstName,
            userData?.getUser?.lastName
          )}
        </Text>
        <Text className="text-gray-500">@{userData?.getUser?.username}</Text>
        <Text className="mt-2 text-center text-gray-700">
          {userData?.getUser?.bio}
        </Text>

        {/* Followers and Following Stats */}
        <View className="flex-row justify-around w-full mt-4">
          <View className="items-center">
            <Text className="text-lg font-bold">
              {userPostsData?.getUserPosts.length > 0
                ? userPostsData?.getUserPosts.length
                : 0}
            </Text>
            <Text className="text-gray-500">Posts</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold">
              {userData?.getUser?.followers.length > 0
                ? userData?.getUser?.followers.length
                : 0}
            </Text>
            <Text className="text-gray-500">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold">
              {userData?.getUser?.following.length > 0
                ? userData?.getUser?.following.length
                : 0}
            </Text>
            <Text className="text-gray-500">Following</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center gap-5  mt-1">
          {currentUser?.me?.id !== userData?.getUser?.id ? (
            <TouchableOpacity
              className="mt-4 bg-blue-500 py-2 px-8 rounded-lg"
              onPress={() => {
                followUser({
                  variables: {
                    userId: userData?.getUser?.id,
                  },
                });
              }}
            >
              <Text className="text-white text-lg font-bold">
                {userData?.getUser?.followers.includes(currentUser?.me?.id)
                  ? "Unfollow"
                  : "Follow"}
              </Text>
            </TouchableOpacity>
          ) : (
            // Edit and logout buttons for other users
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                className="mt-4 bg-[#23C562] py-3 px-8 rounded-lg"
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
              >
                <Text className="text-white text-lg font-bold">
                  Edit Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="mt-4 bg-red-500 py-3 px-8 rounded-lg"
                onPress={handleLogout}
              >
                <Text className="text-white text-lg font-bold">Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Tabs (Posts, Followers, Following) */}
      <View className="flex-row justify-around bg-white mt-4 shadow-sm">
        <TouchableOpacity
          onPress={() => setSelectedTab("Posts")}
          className={`py-2 ${
            selectedTab === "Posts" ? "border-b-2 border-black" : ""
          }`}
        >
          <Text className="text-base font-bold">Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("Followers")}
          className={`py-2 ${
            selectedTab === "Followers" ? "border-b-2 border-black" : ""
          }`}
        >
          <Text className="text-base font-bold">Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("Following")}
          className={`py-2 ${
            selectedTab === "Following" ? "border-b-2 border-black" : ""
          }`}
        >
          <Text className="text-base font-bold">Following</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-gray-100 p-4">
        {selectedTab === "Posts" && userPostsData?.getUserPosts && (
          <ScrollView className="flex-1 bg-gray-100 p-4">
            {userPostsData?.getUserPosts ? (
              userPostsData?.getUserPosts.map((post: any, index: any) => (
                <ProfilePostCard
                  key={index}
                  id={post?.id}
                  userImage={post?.userId?.profileImage}
                  username={
                    post?.userId?.firstName + post?.userId?.lastName
                      ? post?.userId?.firstName + " " + post?.userId?.lastName
                      : " No Name"
                  }
                  userHandle={post?.userId?.username}
                  ownerId={post?.userId?.id}
                  handle={post?.userId?.username || ""}
                  postText={post?.title}
                  postImage={post?.image}
                  likes={post?.likes}
                  stats={post?.stats}
                  currentUserId={currentUser?.me?.id}
                />
              ))
            ) : (
              <View className="flex-1 justify-center items-center bg-white">
                <Text>No posts yet</Text>
              </View>
            )}
          </ScrollView>
        )}
        {selectedTab === "Followers" && (
          <ScrollView className="flex-1 bg-gray-100 p-4">
            {userData?.getUser?.followers.length > 0 ? (
              userFollowersData?.getUserFollowers?.map(
                (user: any, index: any) => (
                  <UserCard
                    key={index}
                    userId={user?.id}
                    userImage={user?.userImage}
                    username={
                      user?.firstName + user?.lastName
                        ? user?.firstName + " " + user?.lastName
                        : "No Name"
                    }
                    userHandle={user?.username}
                    isFollowing={user?.isFollowing}
                    onFollowToggle={() => {
                      console.log(`Toggled follow for ${user?.username}`);
                    }}
                  />
                )
              )
            ) : (
              <View className="flex-1 justify-center items-center bg-white">
                <Text>No followers yet</Text>
              </View>
            )}
          </ScrollView>
        )}
        {selectedTab === "Following" && (
          <ScrollView className="flex-1 bg-gray-100 p-4">
            {userData?.getUser?.following.length > 0 ? (
              userFollowingData?.getUserFollowing?.map(
                (user: any, index: any) => (
                  <UserCard
                    key={index}
                    userId={user?.id}
                    userImage={user?.userImage}
                    username={
                      user?.firstName || user?.lastName
                        ? " " + user?.lastName
                        : "No Name"
                    }
                    userHandle={user?.username}
                    isFollowing={user?.isFollowing}
                    onFollowToggle={() => {
                      console.log(`Toggled follow for ${user?.username}`);
                    }}
                  />
                )
              )
            ) : (
              <View className="flex-1 justify-center items-center bg-white">
                <Text>No following yet</Text>
              </View>
            )}
          </ScrollView>
        )}
      </ScrollView>
    </View>
  );
};

export default ProfilePage;
