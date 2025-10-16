// 🔥Sending API key section
export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  Headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};


// fetch movies API
export const fatchMovies = async ({ query, page = 1 }: { query?: string; page?: number }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.Headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data.results;
};



// 🔥Fetch movie details API

export const fatchmovieDetails = async (
  movieId: string
): Promise<movieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.Headers,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies", response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//🔥Fetch movies trailer Video API 
export const fatchMovieVideos = async (id: string) => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/movie/${id}/videos`,
    { headers: TMDB_CONFIG.Headers }
  );

  if (!response.ok) throw new Error("Failed to fetch movie videos");

  const data = await response.json();

  // Filter only official YouTube trailers
  const trailers = data.results.filter(
    (v: any) => v.site === "YouTube" && v.type === "Trailer" && v.official
  );

  return trailers;
};


// 🔥 Trending This Week API
export const fetchTrendingThisWeek = async () => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/trending/movie/week`,
      {
        method: "GET",
        headers: TMDB_CONFIG.Headers,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch trending movies");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};
