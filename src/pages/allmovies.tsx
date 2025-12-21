
import MovieCard from "@/components/moviecard"

import { Link } from "react-router-dom"
import { useMcontext } from "@/context/trendingcontext"

export default function AllMovies(){
  const { movieCache } = useMcontext()

  const trendingMovies=Object.values(movieCache).filter(m => m.type === 'movie');

return(
    <>
<h1 className="text-3xl text-white  text-center pt-40 mb-20 ">ALL TERENDING MOVIES</h1>
 <div className="grid p-2 lg:px-70 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center lg:grid-cols-4 gap-6">
 {trendingMovies.map(item => (
  <Link to={`/title/${item.id}`}  key={item.id}>  <MovieCard item={item} /></Link>
  ))}
 
</div>

    </>
)

    
}