import React from "react";
import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="walletInfo" options={{ headerShown: false }} />
        <Stack.Screen name="CoinDetails" options={{ headerShown: false }} />
        <Stack.Screen name="NewsFeed" options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" options={{ headerShown: false }} />
        <Stack.Screen name="NewsCreation" options={{ headerShown: false }} />
      </Stack>
    </ApolloProvider>
  );
};

export default RootLayout;
