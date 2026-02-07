import axios from "axios";
declare const process: {
  env: {
    WATCHMODE_API_KEY?: string;
  };
};

// netlify/functions/search.ts   (or whatever name you gave it)

// Remove this line completely:
// import type { Context } from "@netlify/functions";

export default async (req: Request, context: any) => {   // ← change to :any
  const url = new URL(req.url);
  const query = url.searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return new Response(JSON.stringify([]), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const res = await axios.get("https://api.watchmode.com/v1/autocomplete-search/", {
      params: {
        apiKey: process.env.WATCHMODE_API_KEY,
        search_value: query,
        search_type: 1, // 1 = titles (movies + shows)
      },
      timeout: 8000,
    });

    return new Response(JSON.stringify(res.data.results || []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Search error:", err?.response?.status, err?.message);
    const status = err?.response?.status || 500;
    return new Response(
      JSON.stringify({ error: "Search failed", code: status }),
      { status }
    );
  }
};