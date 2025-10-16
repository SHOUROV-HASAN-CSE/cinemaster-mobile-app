import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { images } from "@/assets/images";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { fatchMovies } from "@/services/api";
import TrendingThisWeek from "@/components/TrendingThisWeek";

export default function Index() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch movies function
  const fetchMovies = async (pageNumber = 1, append = false) => {
    try {
      if (append) setLoadingMore(true);
      else setLoading(true);

      const data = await fatchMovies({ query: "", page: pageNumber });

      if (data?.length > 0) {
        setMovies((prev) => {
          if (append) {
            // 👇 append new movies only
            const unique = [
              ...new Map([...prev, ...data].map((m) => [m.id, m])).values(),
            ];
            return unique;
          } else {
            return data;
          }
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to load movies");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // ✅ Load first page on mount
  useEffect(() => {
    fetchMovies(1);
  }, []);

  // ✅ Load more (append)
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchMovies(nextPage, true); // append = true
  };

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Banner */}
        <Image
          source={images.cinemaster}
          className="w-full h-32 mt-5 mb-5 mx-auto"
          resizeMode="contain"
        />

        {/* Search Bar */}
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search for a movie"
        />

        {/* TrendingThisWeek  */}

        <ScrollView className="flex-1 bg-primary">
          <TrendingThisWeek />
        </ScrollView>

        {/* Title */}
        <Text className="text-xl font-bold text-white mt-6 mb-3">
          🎬 Latest popular Movies
        </Text>

        {/* Initial Loading */}
        {loading && movies.length === 0 && (
          <ActivityIndicator
            size="large"
            color="#f97216"
            className="mt-10 self-center"
          />
        )}

        {/* Error */}
        {error && (
          <Text className="text-red-500 mt-5 text-center">Error: {error}</Text>
        )}

        {/* Movie List */}
        {movies.length > 0 ? (
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 15,
            }}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          !loading && (
            <Text className="text-gray-300 text-center mt-10">
              No movies found.
            </Text>
          )
        )}

        {/* See More Button */}
        {movies.length > 0 && !loadingMore && (
          <TouchableOpacity
            className="bg-[#f97216] py-3 rounded-full mt-4 mb-10"
            onPress={handleLoadMore}
          >
            <Text className="text-white text-center font-semibold text-lg">
              See More
            </Text>
          </TouchableOpacity>
        )}

        {/* Small loader under list (when fetching next page) */}
        {loadingMore && (
          <ActivityIndicator
            size="small"
            color="#f97216"
            className="my-5 self-center"
          />
        )}
      </ScrollView>
    </View>
  );
}
