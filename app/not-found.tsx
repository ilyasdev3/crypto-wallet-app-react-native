import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const NotFoundScreen = () => {
  console.log("NotFoundScreen rendered");

  const router = useRouter();

  return (
    <View>
      <Text>NotFoundScreen</Text>
    </View>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({});
