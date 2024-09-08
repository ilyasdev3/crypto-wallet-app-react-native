import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Optionally configure static options outside the route.*/}
      {/* <Stack.Screen name="wallet" options={{}} /> */}
      <Stack.Screen name="(tabs)" options={{}} />
      <Stack.Screen name="CointDetails" options={{}} />
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
  );
};

export default RootLayout;
