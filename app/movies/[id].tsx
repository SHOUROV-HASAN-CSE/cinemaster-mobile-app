import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fatchmovieDetails, fatchMovieVideos } from "@/services/api";
import YoutubePlayer from "react-native-youtube-iframe";

const { width } = Dimensions.get("window");

interface MovieInfoProps {
  label: string;
  value: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-4">
    <Text className="text-light-200 font-normal text-md">{label}</Text>
    <Text className="text-gray-300 font-semibold text-md mt-1">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [playing, setPlaying] = useState(false);

  // Fetch movie details
  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fatchmovieDetails(id as string));

  // Fetch movie videos (trailers)
  const { data: videos } = useFetch(() => fatchMovieVideos(id as string));

  // Get first YouTube trailer
  const trailer = videos?.[0];

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#f97216" />
      </View>
    );

  if (error)
    return (
      <View className="flex-1 justify-center items-center bg-primary px-5">
        <Text className="text-red-500">
          Error loading movie: {error.message}
        </Text>
      </View>
    );

  return (
    <ScrollView
      className="flex-1 bg-primary px-3 py-6"
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* Poster */}
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
        }}
        className="w-full h-[500px] rounded-lg"
        resizeMode="cover"
      />

      {/* Title & Overview */}

      <View className="flex-col items-start justify-center mt-5 px-5">
        <Text className="text-white text-2xl font-bold">{movie?.title}</Text>

        <View className="flex-row items-center justify-between mt-2 w-full px-3">
          <Text className="text-light-200 text-md">{movie?.release_date}</Text>
          <Text className="text-light-200 text-md">
            {movie?.runtime
              ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
              : "N/A"}
          </Text>
        </View>

        <View className="flex-row items-center mt-2 bg-dark-100 px-2 py-1 rounded-md gap-x-1">
          <Text className="text-yellow-400 mr-1">⭐</Text>
          <Text className="text-white font-bold text-sm mr-2">
            {Math.round(movie?.vote_average) / 2}/5
          </Text>
          <Text className="text-light-200 text-sm">
            ({movie?.vote_count} Votes)
          </Text>
        </View>

        <MovieInfo label="Overview" value={movie?.overview} />

        <View className="flex-row items-center justify-between mt-2 w-full ">
          <MovieInfo
            label="Movie Type"
            value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
          />

          <MovieInfo
            label="Language"
            value={movie?.original_language || "N/A"}
          />
        </View>

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
            movie?.production_companies?.map((c) => c.name).join(" - ") || "N/A"
          }
        />

        <MovieInfo label="Status" value={movie?.status} />
      </View>

      {/* Title & Overview */}

      {/* Trailer */}
      <View className="bg-[#d1560f] py-3 my-5 mx-5 rounded-full">
        <Text className="text-white text-center font-bold text-xl">
          ▶️ Watch Trailer
        </Text>
      </View>
      {trailer ? (
        <View className="mt-5 mb-80 px-2">
          <YoutubePlayer
            height={220}
            width={width - 32}
            play={playing}
            videoId={trailer.key}
            onChangeState={onStateChange}
          />
        </View>
      ) : (
        <Text className="text-light-200 text-center mt-4 px-2">
          No trailer available
        </Text>
      )}
      {/* Trailer */}
    </ScrollView>
  );
};

export default MovieDetails;
