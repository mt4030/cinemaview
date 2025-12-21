
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
  trending: number[];
  favorite: Movie[];
  bookmark: Movie[];
  movieCache: MovieCache;
  history: Movie[]; // added type

  loading: boolean;
  error: string | null;
  FakeAuthentication:() =>void;
  FakeLogOut:() =>void;
  fakeAuth:boolean;
  ToggleFavorite: (item: Movie) => void;
  ToggleBookmark: (item: Movie) => void;
  addMovieToCache: (movie: Movie) => void;
  setHistory: React.Dispatch<React.SetStateAction<Movie[]>>; // added type

  setMovieCache: React.Dispatch<React.SetStateAction<MovieCache>>;
}
