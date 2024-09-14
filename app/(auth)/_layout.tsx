import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="Username" options={{ headerShown: false }} />
      <Stack.Screen name="Password" options={{ headerShown: false }} />
      <Stack.Screen name="ProfilePhoto" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
    </Stack>
  );
}
