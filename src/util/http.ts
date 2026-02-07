import type { Movie } from "./type";

const API = {
  trending: "/.netlify/functions/trending",
  search: (q: string) => `/.netlify/functions/search?q=${encodeURIComponent(q)}`,
  details: (id: number | string) => `/.netlify/functions/details/${id}`,
};

export const fetchTrending = async (): Promise<number[]> => {
  try {
    const res = await fetch(API.trending, { cache: "force-cache" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
};

export const fetchSearch = async (query: string): Promise<any[]> => {
  if (query.length < 2) return [];
  try {
    const res = await fetch(API.search(query));
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
};

export const fetchDetails = async (id: number): Promise<Movie | null> => {
  try {
    const res = await fetch(API.details(id), {
  // ISR-like: revalidate every 6 hours
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};