////from data search
import axios from "axios"
const WATCHMODE_API_KEY = import.meta.env.VITE_WATCHMODE_API_KEY ;
const BASE_URL = "https://api.watchmode.com/v1";
import type { Movie} from "@/util/type";
/////search
export const fetchSearched=async(query:string)=>{

try{
const response = await axios.get(
          "https://api.watchmode.com/v1/autocomplete-search/",
          {
            params: {
              apiKey: WATCHMODE_API_KEY,
              search_value: query,
              search_type: 1, 
            },
          }
        );
return response.data.results ||[]

}catch(e){
console.log(e)

}

}

///fetching trending
 export const fetchTrending = async () => {
//fetch trending
      const [moviesRes, tvRes] = await Promise.all([
        axios.get(`${BASE_URL}/list-titles`, {
          params: {
            apiKey: WATCHMODE_API_KEY,
            types: "movie",
            sort_by: "popularity_desc",
            limit: 15,
          },
        }),
        axios.get(`${BASE_URL}/list-titles`, {
          params: {
            apiKey: WATCHMODE_API_KEY,
            types: "tv_series",
            sort_by: "popularity_desc",
            limit: 15,
          },
        }),
      ]);
//save just name and id to then pass to fetch detail
      const movieIds: number[] = moviesRes.data.titles.map(
        (m: { id: number }) => m.id);
      const tvIds: number[] = tvRes.data.titles.map(
        (t: { id: number }) => t.id);
///returns id
      return  [...movieIds, ...tvIds];
      
  };



////fetching detail
 export const fetchDetails = async (id: number): Promise<Movie> => {
    const res = await axios.get(`${BASE_URL}/title/${id}/details`, {
      params: { apiKey: WATCHMODE_API_KEY, },
    });
    return res.data;
  };