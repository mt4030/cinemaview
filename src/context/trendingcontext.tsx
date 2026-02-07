// trendingContext.tsx  (or src/context/MovieContext.tsx — name it however you prefer)
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Movie, MovieContextType } from "../util/type";
import { usePersistedState } from "@/util/persistedState";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchTrending, fetchDetails } from "@/util/http";

interface ProviderProps {
  children: ReactNode;
}

const MovieContext = createContext<MovieContextType | null>(null);

const MovieContextProvider = ({ children }: ProviderProps) => {
  const [favorite, setFavorite] = usePersistedState<Movie[]>("favorite", []);
  const [bookmark, setBookmark] = usePersistedState<Movie[]>("bookmark", []);
  const [history, setHistory] = usePersistedState<Movie[]>("history", []);
  const [fakeAuth, setFakeAuth] = usePersistedState<boolean>("Auth", false);

  // Fetch trending IDs safely
  const {
    data: trendingIdsRaw,
    isLoading: idsLoading,
    isError: idsError,
  } = useQuery<number[]>({
    queryKey: ["trending"],
    queryFn: fetchTrending,
    staleTime: 1000 * 60 * 60 * 12, // 12 hours
  });

  // Ensure trendingIds is always an array
  const trendingIds = Array.isArray(trendingIdsRaw) ? trendingIdsRaw : [];

  // Fetch all trending movie details — only when we have IDs
  const movieQueries = useQueries({
    queries: trendingIds.map((id: number) => ({
      queryKey: ["movies", id],
      queryFn: () => fetchDetails(id),
      staleTime: 1000 * 60 * 60 * 12,
      enabled: !!id && trendingIds.length > 0 && !idsLoading,
    })),
  });

  const movies = movieQueries
    .map((q) => q.data)
    .filter((v): v is Movie => Boolean(v));

  const ToggleBookmark = (item: Movie) =>
    setBookmark((prev) =>
      prev.some((m) => m.id === item.id)
        ? prev.filter((m) => m.id !== item.id)
        : [...prev, item]
    );

  const ToggleFavorite = (item: Movie) =>
    setFavorite((prev) =>
      prev.some((m) => m.id === item.id)
        ? prev.filter((m) => m.id !== item.id)
        : [...prev, item]
    );

  const FakeAuthentication = () => setFakeAuth(true);
  const FakeLogOut = () => setFakeAuth(false);

  const value: MovieContextType = {
    movies,
    favorite,
    bookmark,
    loading: idsLoading,
    error: idsError,
    ToggleFavorite,
    ToggleBookmark,
    history,
    setHistory,
    FakeAuthentication,
    fakeAuth,
    FakeLogOut,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export default MovieContextProvider;

export const useMcontext = (): MovieContextType => {
  const ctx = useContext(MovieContext);
  if (!ctx) throw new Error("useMcontext must be used inside MovieContextProvider");
  return ctx;
};