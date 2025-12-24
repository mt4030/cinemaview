import {
  createContext,
  useContext,
} from "react";
import type {  ReactNode, } from "react"
import type { Movie, MovieContextType } from "../util/type";
import { usePersistedState } from "@/util/persistedState";
import { useQueries, useQuery } from "@tanstack/react-query";
interface ProviderProps {children: ReactNode;}
import { fetchTrending,fetchDetails } from "@/util/http";

const MovieContext = createContext<MovieContextType | null>(null);



const MovieContextProvider = ({ children }: ProviderProps) => {

  const [favorite, setFavorite] = usePersistedState<Movie[]>("favorite", []);
  const [bookmark, setBookmark] = usePersistedState<Movie[]>("bookmark", []);
  const [history, setHistory] = usePersistedState<Movie[]>("history", []);
  const [fakeAuth,setFakeAuth]=usePersistedState<boolean>("Auth", false)

///trending id 
 const {
    data: trendingIds,
    isLoading: idsLoading,
    isError: idsError,
  } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrending,
     staleTime: 1000 * 60 * 60 * 12,
  });
//mapp for all ids to make query and fetch all id
const movieQueries =useQueries({
  queries:
  trendingIds?.map((id)=>({
    queryKey:['movies',id],
    queryFn:()=>fetchDetails(id),
     staleTime: 1000 * 60 * 60 * 12,
     
  }))|| [],
})

  const movies = movieQueries
  .map((q) => q.data)
  .filter((v): v is Movie => Boolean(v)); // type guard





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
   movies,
    favorite,
    bookmark,
    loading:idsLoading,
    error:idsError,
    ToggleFavorite,
    ToggleBookmark,
    history,
     setHistory,
     FakeAuthentication,
     fakeAuth,
     FakeLogOut
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
