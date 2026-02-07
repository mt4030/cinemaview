import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSearch } from "@/util/http";

export default function FetchDataSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const { data = [], isPending, isError } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => fetchSearch(debouncedQuery),
    enabled: debouncedQuery.length >= 3,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div ref={wrapperRef} className="w-full max-w-lg mx-auto">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies or TV shows"
        className="w-full p-4 rounded-lg border"
      />

      {isPending && <p className="mt-2">Loading...</p>}
      {isError && <p className="mt-2">Something went wrong</p>}

      {data.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 mt-4">
          {data.map((item: any) => (
            <Link key={item.id} to={`/title/${item.id}`}>
              <li className="bg-gray-200 p-2 rounded">
                <img
                  src={item.image_url || "https://via.placeholder.com/185x278"}
                  className="rounded mb-2"
                />
                <p className="font-bold">{item.name}</p>
                <p className="text-sm">{item.year}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
