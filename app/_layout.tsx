import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import AuthGuard from "@/components/AuthGuard";

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
      <AuthGuard>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Optionally configure static options outside the route.*/}
          {/* <Stack.Screen name="wallet" options={{}} /> */}
          <Stack.Screen name="(tabs)" options={{}} />
          <Stack.Screen name="CoinDetails" options={{}} />
          <Stack.Screen name="NewsFeed" options={{}} />
          <Stack.Screen name="ProfilePhoto" options={{}} />
          <Stack.Screen name="walletInfo" options={{}} />
          <Stack.Screen name="Username" options={{}} />
          <Stack.Screen name="Password" options={{}} />
          <Stack.Screen name="Register" options={{}} />
          <Stack.Screen name="EditProfile" options={{}} />
          <Stack.Screen name="Login" options={{}} />
          <Stack.Screen name="NewsCreation" options={{}} />
        </Stack>
      </AuthGuard>
    </ApolloProvider>
  );
};

export default RootLayout;
