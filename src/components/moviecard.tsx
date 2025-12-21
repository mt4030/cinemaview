import type { Movie } from "@/util/type";
interface MovieCard {
  item: Movie;
}

export default function MovieCard({ item }:MovieCard) {
  return (
    <div className="w-45 h-95 bg-gray-800 flex flex-col text-amber-50 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
      {item.poster && (
        <img
          className="w-45 h-[70%] object-cover"
          src={item.poster}
          alt={item.title}
          loading="lazy"
        />
      )}

      <div className="p-2 flex flex-col justify-between h-[30%]">
        <h3 className="text-white text-base md:text-lg font-semibold truncate">
          {item.title}
        </h3>
        <p className="text-yellow-400 font-bold text-sm">
          ⭐ {item.user_rating ?? "N/A"}
        </p>
        <p className="text-gray-300 text-xs md:text-sm truncate">
          {item.year} • {item.type === "tv_series" ? "TV Series" : "Movie"}
        </p>
      </div>
    </div>
  )
}


