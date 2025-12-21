import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
 
} from "react";
import type {  ReactNode, } from "react"
import type { Movie, MovieCache, MovieContextType } from "../util/type";
import { usePersistedState } from "@/util/persistedState";
const API_KEY = "6mNVDieWCHeGbQzE1O0RWYJxgIrfkyCkzxCyb9m7";
const BASE_URL = "https://api.watchmode.com/v1";

const MovieContext = createContext<MovieContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
}

const MovieContextProvider = ({ children }: ProviderProps) => {
  const [movieCache, setMovieCache] = useState<MovieCache>({});
  const [trending, setTrending] = useState<number[]>([]);
  const [favorite, setFavorite] = usePersistedState<Movie[]>("favorite", []);
  const [bookmark, setBookmark] = usePersistedState<Movie[]>("bookmark", []);
  const [history, setHistory] = usePersistedState<Movie[]>("history", []);
  const [fakeAuth,setFakeAuth]=usePersistedState<boolean>("Auth", false)
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDetails = async (id: number): Promise<Movie> => {
    const res = await axios.get(`${BASE_URL}/title/${id}/details`, {
      params: { apiKey: API_KEY },
    });
    return res.data;
  };

  const fetchTrending = async (): Promise<void> => {
    setLoading(true);

    try {
      const stored = localStorage.getItem("trending-content");
      const now = Date.now();

      if (stored) {
        const parsed = JSON.parse(stored) as {
          movieCache: MovieCache;
          trendingIds: number[];
          timestamp: number;
        };

        if (now - parsed.timestamp < 1000 * 60 * 60 * 24 * 30) {
          setTrending(parsed.trendingIds);
          setMovieCache(parsed.movieCache);
          return;
        }
      }

      const [moviesRes, tvRes] = await Promise.all([
        axios.get(`${BASE_URL}/list-titles`, {
          params: {
            apiKey: API_KEY,
            types: "movie",
            sort_by: "popularity_desc",
            limit: 15,
          },
        }),
        axios.get(`${BASE_URL}/list-titles`, {
          params: {
            apiKey: API_KEY,
            types: "tv_series",
            sort_by: "popularity_desc",
            limit: 15,
          },
        }),
      ]);

      const movieIds: number[] = moviesRes.data.titles.map(
        (m: { id: number }) => m.id
      );
      const tvIds: number[] = tvRes.data.titles.map(
        (t: { id: number }) => t.id
      );

      const allIds = [...movieIds, ...tvIds];
      setTrending(allIds);

      const details = await Promise.all(allIds.map(fetchDetails));

      const cache: MovieCache = {};
      details.forEach((item) => {
        cache[item.id] = item;
      });

      setMovieCache(cache);

      localStorage.setItem(
        "trending-content",
        JSON.stringify({
          movieCache: cache,
          trendingIds: allIds,
          timestamp: now,
        })
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch trending");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const addMovieToCache = (movie: Movie) => {
    setMovieCache((prev) =>
      prev[movie.id] ? prev : { ...prev, [movie.id]: movie }
    );
  };

  const ToggleBookmark = (item: Movie) => {
    setBookmark((prev) =>
      prev.some((m) => m.id === item.id)
        ? prev.filter((m) => m.id !== item.id)
        : [...prev, item]
    );
  };

  const ToggleFavorite = (item: Movie) => {
    setFavorite((prev) =>
      prev.some((m) => m.id === item.id)
        ? prev.filter((m) => m.id !== item.id)
        : [...prev, item]
    );
  };


  ////fake auth
  const FakeAuthentication=()=>{
    setFakeAuth(true)
  }
  const FakeLogOut=()=>{
    setFakeAuth(false)
  }
  const value: MovieContextType = {
    trending,
    favorite,
    bookmark,
    movieCache,
    loading,
    error,
    ToggleFavorite,
    ToggleBookmark,
    addMovieToCache,
    setMovieCache, history, setHistory,FakeAuthentication,fakeAuth,FakeLogOut
  };

  return (
    <MovieContext.Provider value={value}>
   {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;

export const useMcontext = (): MovieContextType => {
  const ctx = useContext(MovieContext);
  if (!ctx)
    throw new Error(
      "useMovieContext must be used inside MovieContextProvider"
    );
  return ctx;
};
