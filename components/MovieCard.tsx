import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  console.log(poster_path);

  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity activeOpacity={0.8} className="w-[32%]">
        {/* Movie Poster */}
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "https://viaplaceholder.com/600x400/1qa1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2 text-center">
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
