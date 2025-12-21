import { useNavigate } from "react-router-dom";
import CarouselComponent from "@/components/userCarosel"

import { useMcontext } from "@/context/trendingcontext";
export default function User() {
  const {FakeLogOut,favorite,bookmark,history}=useMcontext()
  const navigate = useNavigate();

  const user = {
    name: "Dear Cinephilia",

  };

  const handleOut=()=>{
   FakeLogOut()
   navigate('/')
  }


  return (
    <div className="min-h-screen bg-[#0F1624] px-6 py-50 text-white">
      <div className="mx-auto max-w-5xl ">
        {/* Header */}
        <div className="mb-10 flex items-center gap-5 px-6">
  {/* Avatar */}
  <div className="h-20 w-20 flex items-center justify-center rounded-full bg-white/10 border-2 border-yellow-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-12 w-12 text-yellow-400"
    >
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
        clipRule="evenodd"
      />
    </svg>
  </div>

  {/* User Info */}
  <div className="flex-1">
    <h1 className="text-2xl font-semibold leading-tight">
      {user.name}
    </h1>
    <p className="text-sm text-white/60">
      Your movies, your taste
    </p>
  </div>

  {/* Logout */}
  <button
    onClick={handleOut}
    className="rounded-xl border border-red-400/40 px-6 py-2 text-sm text-red-400 hover:bg-red-400/10 transition"
  >
    Logout
  </button>
</div>


        {/* Watchlist */}
 {bookmark.length>0&&<div>
      <div
       
        className="flex items-center text-3xl md:text-4xl mb-10 mt-20 font-bold text-white hover:underline"
      >
        <span className="text-yellow-400 mr-2 lg:ml-50 ml-10 ">|</span>
Watchlist
        <span className="text-yellow-400 ml-2">{'>'}</span>
      </div>
      <CarouselComponent items={bookmark} />
    </div>}


        {/* Favourites */}
     {favorite.length>0&&<div>
      <div
       
        className="flex items-center text-3xl md:text-4xl mb-10 mt-20 font-bold text-white hover:underline"
      >
        <span className="text-yellow-400 mr-2 lg:ml-50 ml-10 ">|</span>
        Favorites
        <span className="text-yellow-400 ml-2">{'>'}</span>
      </div>
      <CarouselComponent items={favorite} />
    </div>}


{/*history */}
 {history.length>0&&<div>
      <div
       
        className="flex items-center text-3xl md:text-4xl mb-10 mt-20 font-bold text-white hover:underline"
      >
        <span className="text-yellow-400 mr-2 lg:ml-50 ml-10 ">|</span>
        History
        <span className="text-yellow-400 ml-2">{'>'}</span>
      </div>
      <CarouselComponent items={history} />
    </div>}
      
  
      </div>
    </div>
  );
}



