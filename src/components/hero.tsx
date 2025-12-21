
import CarouselComponent from "./carrosel"
import { Link } from "react-router-dom"
import FetchDataSearch from "./FetchDataSearch"
import { useMcontext } from "@/context/trendingcontext"
import Loading from "./loading"

export default function Hero() {
  const { movieCache,loading, error,favorite,history } = useMcontext()


const trendingTV = Object.values(movieCache).filter(m => m.type === 'tv_series');
  const trendingMovies=Object.values(movieCache).filter(m => m.type === 'movie');

  if (loading) return<Loading/>
  if (error) return <p>{error}</p>
if (!Object.keys(movieCache).length) return <Loading />;
  return (
    <>
    <section className="relative hero-img h-125 bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Text */}
      <div className="relative z-10 mx-auto pt-30 sm:pt-50 px-4 sm:px-6 lg:px-8 text-center text-white ">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Find Your Favorite Movies and Shows
        </h1>
        <p className="text-lg mb-8">
          Search for trending movies, top rated, or in theaters right now.
        </p>
        <FetchDataSearch />
      </div>

    
    </section>
      {/* Carousels */}
<section className="bg-[#0F1624] min-h-screen  py-12">
  <div className="space-y-12">
    {/* Top movie */}
    <div>
      <Link
        to="movies"
        className="flex items-center text-3xl md:text-4xl font-bold mb-6  text-white hover:underline"
      >
        <span className="text-yellow-400 mr-2 lg:ml-50 ml-10 ">|</span>
        Trending Movies
        <span className="text-yellow-400 ml-2  ">{'>'}</span>
      </Link>
      <CarouselComponent items={trendingMovies} />
    </div>

    {/* Top tv */}
    <div>
      <Link
        to="tv"
        className="flex items-center text-3xl md:text-4xl mb-6  font-bold text-white hover:underline"
      >
        <span className="text-yellow-400 mr-2 lg:ml-50 ml-10 ">|</span>
        Trending  TV Shows
        <span className="text-yellow-400 ml-2">{'>'}</span>
      </Link>
      <CarouselComponent items={trendingTV} />
    </div>
{favorite.length>0&&<div>
      <Link
        to="tv"
        className="flex items-center text-3xl md:text-4xl mb-6  font-bold text-white hover:underline"
      >
        <span className="text-yellow-400 mr-2 lg:ml-50 ml-10 ">|</span>
        Your Favorites
        <span className="text-yellow-400 ml-2">{'>'}</span>
      </Link>
      <CarouselComponent items={favorite} />
    </div>}


{history.length>0&&<div>
      <Link
        to="tv"
        className="flex items-center text-3xl md:text-4xl mb-6  font-bold text-white hover:underline"
      >
        <span className="text-yellow-400 mr-2 lg:ml-50 ml-10 ">|</span>
        History
        <span className="text-yellow-400 ml-2">{'>'}</span>
      </Link>
      <CarouselComponent items={history} />
    </div>}

  </div>


  
</section>



    </>
    
  )
}
