import { Image, View } from "react-native";
import React from "react";

const Avatar = ({ imageSource }: { imageSource: any }) => {
  return (
    <View className="w-[40px] h-[40px] flex items-center justify-center rounded-full overflow-hidden bg-gray-300 p-[8]">
      <Image
        source={imageSource}
        className="w-full h-full rounded-full"
        resizeMode="cover"
      />
    </View>
  );
};

export default Avatar;
