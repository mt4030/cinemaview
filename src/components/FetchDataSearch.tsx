
import {useQuery} from '@tanstack/react-query'
import { useEffect,useState,useRef } from "react"
import { Link } from "react-router-dom";
import { fetchSearched } from '@/util/http';
export default function FetchDataSearch(){
    const [query, setQuery] = useState("");
const {data,isPending ,isError}=  useQuery({
  ///“I will call your queryFn with the queryKey that you provided.”
  queryKey:['search',query]
  ,
  queryFn:({queryKey})=>{
    const[,query]=queryKey
    return fetchSearched(query)
  },
  enabled: query.length >= 3

})


  const [showSuggestions, setShowSuggestions] = useState(false);
  const [noResults, setNoResults] = useState(false);
 const wrapperRef = useRef<HTMLDivElement>(null);




  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.length < 3) return;
  };

//////clear suggestion
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
      setNoResults(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

useEffect(() => {
  if (data && data.length > 0) {
    setShowSuggestions(true)
    setNoResults(false)
  } else if (data && data.length === 0) {
    setNoResults(true)
  }
}, [data])




return(
 <div ref={wrapperRef} className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="relative text-5xl mx-7">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          {/* Search icon */}
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          {/* Input */}
          <input
            type="search"
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full p-5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-sky-500 focus:border-sky-500 dark:bg-slate-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
            placeholder="Search for a movie, TV series"
            required
          />

          {/* No results helper */}
          {noResults && <h1 >No movie found with that name.</h1>}
 <button
            type="submit"
            className="text-white transition duration-400 ease-in-out absolute end-2.5 bottom-2.5 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-3 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
          >
            Search
          </button>
          {/* Submit button */}
         
        </div>
      </form>

      {/* Autocomplete suggestions */}
      {showSuggestions && data.length > 0 && (
        <ul className="mt-2 w-full max-h-72 overflow-y-auto grid grid-cols-2 gap-4 px-7">
          {data.map((item:any) => (
            <Link to={`title/${item.id}`}>
            <li
              key={item.id}
              className="bg-blue-100 hover:bg-blue-200 cursor-pointer p-2 rounded-lg shadow-md flex flex-col items-center"
            
            >
              <img
                src={item.image_url || "https://via.placeholder.com/185x278"}
                alt={item.name}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="text-gray-800 font-semibold text-center">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.year}</p>
            </li></Link>
          ))}
        </ul>
      )}

      {isError && <p className="px-7 mt-2">couldint find the title</p>}

      {!isPending && <p className="px-7 mt-2">Loading...</p>}
    </div>
)
    
}
