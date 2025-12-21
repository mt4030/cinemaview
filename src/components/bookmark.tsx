import { Bookmark } from "lucide-react"
import { useMcontext } from "@/context/trendingcontext"
import type { Movie } from "@/util/type";

interface BookmarkProps {
  item: Movie;
}
const BookmarkAct=({item}:BookmarkProps)=>{
  const { ToggleBookmark ,bookmark } = useMcontext()
  const isBookmarked = bookmark.some(b => b.id === item.id)

return(
    <button
  onClick={() => ToggleBookmark(item)}
  className={`flex items-center gap-2 border px-4 py-2 rounded transition
    ${isBookmarked 
      ? "bg-gray-800 border-yellow-500 text-yellow-400" 
      : "border-gray-500 hover:bg-gray-800"
    }
  `}
>

                <Bookmark size={18} /> Bookmark
              </button>
)
}
export default BookmarkAct