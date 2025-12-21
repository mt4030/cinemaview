import { Heart } from "lucide-react"
import { useMcontext } from "@/context/trendingcontext"
import type { Movie } from "@/util/type";

interface Favorite {
  item: Movie;
}

export default function Favorite({item}:Favorite){
  const { ToggleFavorite , favorite} = useMcontext()
const isFavorite=favorite.some(s=>s.id===item.id)
return(
  <button onClick={()=>ToggleFavorite(item)} className={`flex items-center gap-2 border  px-4 py-2 rounded transition ${isFavorite?'bg-gray-800 border-red-500 text-red-400':'border-gray-500 hover:bg-gray-800'}`}>
                <Heart size={18} /> Favorite
              </button>
)
    
}