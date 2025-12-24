
export interface Movie {
  id: number;
  title: string;
  name?: string;
  year?: number;
  type?: "movie" | "tv_series";
  poster?: string;
  posterLarge?: string;
  backdrop?: string;
  image_url?: string;
  runtime_minutes?: number;
  user_rating?: number;
  us_rating?: string;
  genre_names?: string[];
  plot_overview?: string;
  trailer?: string;
  imdb_id?: string;

}



export type MovieCache = Record<number, Movie>;



export interface MovieContextType {
  movies: Movie[]; // trending movies details, not just IDs
  favorite: Movie[];
  bookmark: Movie[];
  history: Movie[];
  loading: boolean; // derived from useQuery (idsLoading)
  error: boolean | unknown; // can be boolean or the error returned by useQuery
  fakeAuth: boolean;
  FakeAuthentication: () => void;
  FakeLogOut: () => void;
  ToggleFavorite: (item: Movie) => void;
  ToggleBookmark: (item: Movie) => void;
  setHistory: React.Dispatch<React.SetStateAction<Movie[]>>;
}
