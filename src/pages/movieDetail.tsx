import { useParams } from "react-router-dom";
import { useMcontext } from "../context/trendingcontext";
import { Play } from "lucide-react";
import BookmarkAct from "@/components/bookmark";
import HeartShape from "@/components/Favorite";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Movie } from "@/util/type";

const WATCHMODE_API_KEY = "6mNVDieWCHeGbQzE1O0RWYJxgIrfkyCkzxCyb9m7";
const BASE_URL = "https://api.watchmode.com/v1";

export default function MovieDetail() {
  const { movieCache, addMovieToCache, setHistory } = useMcontext();
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  const typedMovieCache: Record<string, Movie> = movieCache;

  const updateHistory = (m: Movie) => {
    const rawStored = localStorage.getItem("history");
    const storedHistory: Movie[] = rawStored ? JSON.parse(rawStored) : [];

    // Avoid duplicates
    const exists = storedHistory.some(item => item.id === m.id);
    const updatedHistory = exists ? storedHistory : [...storedHistory, m];

    setHistory(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };

  const FetchSearched = async () => {
    if (!id) return;

    let movieToUse: Movie | null = null;

    // 1️⃣ Check localStorage "history"
    const rawStored = localStorage.getItem("history");
    const storedHistory: Movie[] = rawStored ? JSON.parse(rawStored) : [];
    const movieInHistory = storedHistory.find(m => String(m.id) === id);
    if (movieInHistory) movieToUse = movieInHistory;

    // 2️⃣ Check context cache
    if (!movieToUse && typedMovieCache[id]) movieToUse = typedMovieCache[id];

    // 3️⃣ Fetch from API
if (!movieToUse) {
  try {
    const res = await axios.get(`${BASE_URL}/title/${id}/details`, {
      params: { apiKey: WATCHMODE_API_KEY },
    });
    movieToUse = res.data;

    if (movieToUse) {
      addMovieToCache(movieToUse);
    }
  } catch (e) {
    console.error("Failed to fetch movie:", e);
    return;
  }
}


    if (movieToUse) {
      setMovie(movieToUse);
      updateHistory(movieToUse); 
    }
  };

  useEffect(() => {
    FetchSearched();

  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <section className="bg-gray-900 min-h-screen text-white">
      {/* HERO */}
      <div className="relative">
        <div
          className="h-[60vh] bg-cover bg-center"
          style={{
            backgroundImage: `url(${movie.backdrop || movie.posterLarge})`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/70 to-transparent" />
      </div>

  
      <div className="relative z-10 max-w-6xl mx-auto px-4 -mt-44">
        <div className="flex flex-col md:flex-row gap-10">
          <img
            src={movie.posterLarge}
            alt={movie.title}
            className="w-72 rounded-xl shadow-2xl"
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.runtime_minutes} min</span>
              <span>•</span>
              <span className="text-yellow-400 font-semibold">
                ⭐ {movie.user_rating}
              </span>
              <span>•</span>
              <span className="border px-2 py-0.5 rounded text-xs">{movie.us_rating}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {(movie.genre_names ?? []).map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 text-sm bg-gray-800 rounded-full hover:bg-gray-600"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-gray-200 leading-relaxed max-w-3xl mb-8">{movie.plot_overview}</p>

            <div className="flex flex-wrap gap-4">
              {movie.trailer && (
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-300 transition"
                >
                  <Play size={18} /> Watch Trailer
                </a>
              )}
              {movie.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-500 px-6 py-2 rounded hover:bg-gray-800 transition"
                >
                  IMDb
                </a>
              )}
              <HeartShape item={movie} />
              <BookmarkAct item={movie} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
