import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fatchmovieDetails } from "@/services/api";

interface MovieInfoProps {
  label: string;
  value: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5 ">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-300 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fatchmovieDetails(id as string));

  return (
    <View className="bg-primary flex-1 px-3 py-6">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
            className="w-full h-[500px]"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-2xl font-bold">{movie?.title}</Text>

          <View className="flex-row items-center mt-2 gap-x-5">
            <Text className="text-light-200 text-sm">
              {movie?.release_date}
            </Text>
            <Text className="text-light-200 text-sm">
              {movie?.runtime
                ? `${Math.floor(movie.runtime / 60)}h${movie.runtime % 60}m`
                : "N/A"}
            </Text>
          </View>

          <View className="flex-row items-center mt-2 bg-dark-100 px-2 py-1 rounded-md gap-x-1">
            <Text className="text-yellow-400 mr-1">⭐</Text>
            <Text className="text-white font-bold text-sm mr-2">
              {Math.round(movie?.vote_average) / 2}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} Votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />

          <view className="flex flex-row justify-between w-1/2">
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
          />
          
          <MovieInfo
            label="Language"
            value={movie?.original_language || "N/A"}
          />
          
          </view>


          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget / 1_000_000} Million`}
            />

            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue / 1_000_000)} Million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" - ") ||
              "N/A"
            }
          />

          <MovieInfo label="Status" value={movie?.status} />
        </View>
      </ScrollView>

    
    </View>
  );
};

export default MovieDetails;



 {
      "adult": false,
      "backdrop_path": "/m1fgGSLK0WvRpzM1AmZu38m0Tx8.jpg",
      "genre_ids": [
        28
      ],
      "id": 842945,
      "original_language": "en",
      "original_title": "Supercell",
      "overview": "Good-hearted teenager William always lived in hope of following in his late father’s footsteps and becoming a storm chaser. His father’s legacy has now been turned into a storm-chasing tourist business, managed by the greedy and reckless Zane Rogers, who is now using William as the main attraction to lead a group of unsuspecting adventurers deep into the eye of the most dangerous supercell ever seen.",
      "popularity": 962.106,
      "poster_path": "/gbGHezV6yrhua0KfAgwrknSOiIY.jpg",
      "release_date": "2023-03-17",
      "title": "Supercell",
      "video": false,
      "vote_average": 6.4,
      "vote_count": 122
    },