import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import useFetch from "@/services/useFetch";
import { fatchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fatchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary px-5">
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 15,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        scrollEnabled={false}
        ListHeaderComponent={
          <>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies"
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
                // onPress={() => router.push("/search")}
              />
            </View>

            <Text className="text-xl font-bold text-white mt-5 mb-3">
              Search Movies
            </Text>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3 self-center"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error?.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length === 0 && (
                <Text className="text-white text-center my-3">
                  No movies found
                </Text>
              )}
          </>
        }
      />
    </View>
  );
};

export default search;
