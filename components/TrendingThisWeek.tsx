import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { fetchTrendingThisWeek } from "../services/api";
import { useRouter } from "expo-router"; // ✅ useRouter import

const TrendingThisWeek = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ router hook

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const data = await fetchTrendingThisWeek();
        setMovies(data || []);
      } catch (err) {
        console.error("Failed to load trending movies:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTrending();
  }, []);

  if (loading) {
    return (
      <View className="flex-row justify-center mt-10">
        <ActivityIndicator size="large" color="#eb5e0f" />
      </View>
    );
  }

  return (
    <View className="mt-6">
      <Text className="text-xl font-bold text-white mb-3 ml-4">
        🎬 Trending This Week
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        contentContainerStyle={{ paddingHorizontal: 5, paddingBottom: 5 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="w-36"
            activeOpacity={0.8}
            onPress={() => router.push(`/movies/${item.id}`)} // ✅ navigate to movie details
          >
            <View className="rounded-2xl overflow-hidden shadow-md">
              <Image
                source={{
                  uri: item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "https://viaplaceholder.com/600x400/1qa1a1a/ffffff.png",
                }}
                className="w-full h-52"
                resizeMode="cover"
              />
            </View>

            <Text
              numberOfLines={1}
              className="text-sm font-semibold text-white mt-2"
            >
              {item.title}
            </Text>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center mt-1">
                <Text className="text-yellow-400">⭐</Text>
                <Text className="text-white ml-1 text-xs">
                  {(item.vote_average / 2).toFixed(1)}
                </Text>
              </View>
              <Text className="text-white text-sm text-light-300 mt-1">
                {item.release_date?.split("-")[0]}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TrendingThisWeek;
