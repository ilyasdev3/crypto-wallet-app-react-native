import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../lib/graphql/user/user.queries";
import { getToken } from "../utils/auth";
import { router } from "expo-router";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (!token) {
        router.replace("/Username");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !data?.getCurrentUser) {
    router.replace("/Username");
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
