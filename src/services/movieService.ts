import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieHttpResponse {
  results: Movie[];
  total_pages: number;
}

const instance = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieHttpResponse> => {
  const response = await instance.get<MovieHttpResponse>("/3/search/movie", {
    params: {
      query: query,
      page: page,
      language: "en-US",
      include_adult: false,
    },
  });
  return response.data;
};
