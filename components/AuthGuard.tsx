// import React, { useEffect, useState } from "react";
// import { View, ActivityIndicator, Text } from "react-native";
// import { useRouter, useSegments } from "expo-router";
// import { getToken } from "../utils/auth";

// const AuthGuard = ({ children }: { children: React.ReactNode }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();
//   const segments = useSegments();

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await getToken();
//       setIsAuthenticated(!!token);
//       setIsLoading(false);
//     };

//     checkAuth();
//   }, []);

//   useEffect(() => {
//     if (!isLoading) {
//       const inAuthGroup = segments[0] === "(auth)";
//       if (isAuthenticated && inAuthGroup) {
//         router.replace("/(tabs)");
//       } else if (
//         !isAuthenticated &&
//         !inAuthGroup &&
//         segments[0] !== undefined
//       ) {
//         router.replace("/(auth)/Username");
//       }
//     }
//   }, [isLoading, isAuthenticated, segments]);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//         <Text>Loading... Please wait.</Text>
//       </View>
//     );
//   }

//   return <>{children}</>;
// };

// export default AuthGuard;
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { getToken } from "../utils/auth";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/(auth)/Username");
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading... Please wait.</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
