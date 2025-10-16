import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

interface Movie {
  id: number;
  poster_path: string | null;
  title: string;
  vote_average: number;
  release_date: string;
}

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/movies/${id}`);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="w-[32%]"
      onPress={handlePress}
    >
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "https://viaplaceholder.com/600x400/1qa1a1a/ffffff.png",
        }}
        className="w-full h-52 rounded-lg"
        resizeMode="cover"
      />

      <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
        {title}
      </Text>

      <View className="flex-row items-center  mt-1">
        <Text className="text-yellow-400 mr-1">⭐</Text>
        <Text className="text-white text-sm">
          {(vote_average / 2).toFixed(1)}
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-white text-sm text-light-300 mt-1">
          {release_date?.split("-")[0]}
        </Text>
        <Text className="text-xs font-medium text-light-300 uppercase">
          Movie
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
