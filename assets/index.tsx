import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Tabs from "@/components/reuseable/Tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "@/components/reuseable/PostCard";

const TabNavgator = () => {
  const [selectedTab, setSelectedTab] = useState("Trending");

  const data = [
    {
      avatar: "https://randomuser.me/api/portraits/men/60.jpg",
      username: "Ann Korkowski",
      handle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/61.jpg",
      username: "Ann Korkowski",
      handle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1458819714733-e5ab3d536722?q=80&w=1997&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
      username: "Ann Korkowski",
      handle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/63.jpg",
      username: "Ann Korkowski",
      handle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/64.jpg",
      username: "Ann Korkowski",
      handle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1511649475669-e288648b2339?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      username: "Ann Korkowski",
      handle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/66.jpg",
      username: "Ann Korkowski",
      handle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1536662788222-6927ce05daea?q=80&w=3193&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      username: "Ann Korkowski",
      handle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://plus.unsplash.com/premium_photo-1673605603709-8599cbbd1a74?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
      username: "Ann Korkowski",
      handle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1542086260-ddb62f405c8b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/69.jpg",
      username: "Ann Korkowski",
      handle: "anniekork",
      postText:
        "Some processing of your personal data may not require your consent...",
      postImage:
        "https://images.unsplash.com/photo-1533910534207-90f31029a78e?q=80&w=3101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 23.5,
      comments: 3.3,
      shares: 104,
    },
  ];

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-gray-100">
        <Tabs
          tabs={["Trending", "Following", "Events"]}
          activeTab={selectedTab}
          setActiveTab={setSelectedTab}
        />

        {/* Tabs */}

        {/* Feed */}
        <ScrollView className="flex-1 bg-gray-100 p-4">
          {data.map((post: any, index: any) => (
            <PostCard
              key={index}
              avatar={post.avatar}
              username={post.username}
              handle={post.handle}
              postText={post.postText}
              postImage={post.postImage}
              likes={post.likes}
              comments={post.comments}
              shares={post.shares}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TabNavgator;
