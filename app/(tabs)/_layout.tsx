// import React from "react";
// import { View, TouchableOpacity } from "react-native";
// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// type IconName = React.ComponentProps<typeof Ionicons>["name"];

// const CustomTabBar = ({ state, descriptors, navigation }: any) => {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         backgroundColor: "white",
//         borderRadius: 30,
//         marginHorizontal: 20,
//         marginBottom: 20,
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         justifyContent: "space-between",
//         alignItems: "center",
//         position: "absolute",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//       }}
//     >
//       {state.routes.map((route: any, index: any) => {
//         const { options } = descriptors[route.key];
//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: "tabPress",
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate({ name: route.name, merge: true });
//           }
//         };

//         const getIconName = (): IconName => {
//           switch (route.name) {
//             case "index":
//               return isFocused ? "home" : "home-outline";
//             case "wallet":
//               return isFocused ? "wallet" : "wallet-outline";
//             case "chat":
//               return isFocused ? "chatbubbles" : "chatbubbles-outline";
//             case "profile":
//               return isFocused ? "person" : "person-outline";
//             default:
//               return "help-outline";
//           }
//         };

//         const iconName = getIconName();

//         return (
//           <TouchableOpacity
//             key={index}
//             onPress={onPress}
//             style={{
//               alignItems: "center",
//               justifyContent: "center",
//               opacity: isFocused ? 1 : 0.5,
//             }}
//           >
//             <Ionicons
//               name={iconName}
//               size={24}
//               color={isFocused ? "#000" : "#888"}
//             />
//           </TouchableOpacity>
//         );
//       })}
//       <TouchableOpacity
//         style={{
//           width: 40,
//           height: 40,
//           borderRadius: 20,
//           backgroundColor: "#4CAF50",
//           justifyContent: "center",
//           alignItems: "center",
//           marginLeft: 10,
//         }}
//       >
//         <Ionicons name="add" size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const TabLayout = () => {
//   return (
//     <Tabs
//       tabBar={(props) => <CustomTabBar {...props} />}
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Tabs.Screen name="index" options={{ title: "Home" }} />
//       <Tabs.Screen name="wallet" options={{ title: "Wallet" }} />
//       <Tabs.Screen name="chat" options={{ title: "Chat" }} />
//       <Tabs.Screen name="profile" options={{ title: "Profile" }} />
//     </Tabs>
//   );
// };

// export default TabLayout;

import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AuthGuard from "@/components/AuthGuard";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 30,
        marginHorizontal: 20,
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          console.log(route.name);

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const getIconName = (): IconName => {
          switch (route.name) {
            case "home":
              return isFocused ? "home" : "home-outline";
            case "wallet":
              return isFocused ? "wallet" : "wallet-outline";
            case "cryptolist":
              return isFocused ? "logo-bitcoin" : "logo-bitcoin";
            case "Profile":
              return isFocused ? "person" : "person-outline";
            default:
              return "help-outline";
          }
        };

        const iconName = getIconName();

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{
              alignItems: "center",
              justifyContent: "center",
              opacity: isFocused ? 1 : 0.5,
            }}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? "#000" : "#888"}
            />
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        onPress={() => navigation.navigate("NewsCreation")}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "#4CAF50",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 10,
        }}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const TabLayout = () => {
  return (
    <AuthGuard>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="wallet" options={{ title: "Wallet" }} />
        <Tabs.Screen name="cryptolist" options={{ title: "Crypto List" }} />
        <Tabs.Screen name="Profile" options={{ title: "Profile" }} />
      </Tabs>
    </AuthGuard>
  );
};

export default TabLayout;
