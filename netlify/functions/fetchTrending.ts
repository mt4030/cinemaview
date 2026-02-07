
declare const process: {
  env: {
    WATCHMODE_API_KEY?: string;
  };
};


// netlify/functions/trending.ts

export default async () => {  // keep signature, but mark as unused if needed
  try {
    const apiKey = process.env.WATCHMODE_API_KEY;

    if (!apiKey) {
      console.error("Missing WATCHMODE_API_KEY environment variable");
      return new Response(JSON.stringify([]), { status: 500 });
    }

    const url = new URL("https://api.watchmode.com/v1/list-titles");
    url.searchParams.append("apiKey", apiKey);  // now safe: string guaranteed
    url.searchParams.append("types", "movie,tv_series");
    url.searchParams.append("sort_by", "popularity_desc");
    url.searchParams.append("limit", "10");

    console.log("Fetching from:", url.toString());

    const res = await fetch(url);

    console.log("Watchmode status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Watchmode error:", res.status, errorText);
      return new Response(JSON.stringify([]), { status: 500 });
    }

    const data = await res.json();
    console.log("Watchmode raw response:", JSON.stringify(data, null, 2));

    const titles = data.titles || []; // safeguard against missing/misnamed key
    const ids = titles
      .map((t: any) => t.id)
      .filter((id:any): id is number => typeof id === 'number');

    console.log("Extracted IDs:", ids);

    return new Response(JSON.stringify(ids), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Function crashed:", err.message, err.stack);
    return new Response(JSON.stringify([]), { status: 500 });
  }
};