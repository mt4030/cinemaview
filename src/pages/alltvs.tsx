
import MovieCard from "@/components/moviecard"
import { Link } from "react-router-dom"
import { useMcontext } from "@/context/trendingcontext"
export default function AllTV(){

  const { movieCache} = useMcontext()


const trendingTV = Object.values(movieCache).filter(m => m.type === 'tv_series');
return(
    <>
   <h1 className="text-3xl text-white  text-center pt-40 mb-20 ">ALL TERENDING TV SERIES</h1>
 <div className="grid p-2 lg:px-70 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center lg:grid-cols-4 gap-6">
  {trendingTV.map(item => (
     <Link to={`/title/${item.id}`} key={item.id}> <MovieCard  item={item} /></Link>
  ))}
</div>

    </>
)

    
}