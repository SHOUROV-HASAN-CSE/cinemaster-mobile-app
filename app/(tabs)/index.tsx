import SearchBar from "@/components/SearchBar";
import {
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  Text,
  FlatList,
} from "react-native";
import { images } from "@/assets/images";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fatchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fatchMovies({ query: '' }));

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image
          source={images.cinemaster}
          className="w-full h-32 mt-10 mb-5 mx-auto"
          resizeMode="contain"
        />

        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            <>
              <Text className="text-xl font-bold text-white mt-5 mb-3">
                Latest Movies
              </Text>

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
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
