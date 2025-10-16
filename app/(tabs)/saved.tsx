import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { images } from "@/assets/images";

const saved = () => {
  return (
    <View className="flex-1 bg-primary p-4">
      <ScrollView>
        {/* Banner */}
        <Image
          source={images.cinemaster}
          className="w-full h-32 mt-5 mb-5 mx-auto"
          resizeMode="contain"
        />

        <Text className="text-2xl font-bold text-center text-white mb-4">
          ❤️ My Favourites
        </Text>

        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400 text-lg mt-80">
            ❤️ No favourite movies yet!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default saved;
