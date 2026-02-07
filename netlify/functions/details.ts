import axios from "axios";
declare const process: {
  env: {
    WATCHMODE_API_KEY?: string;
  };
};

export default async (event: any) => {
  const id = event.path.split("/").pop();

  if (!id || isNaN(Number(id))) {
    return { statusCode: 400, body: "Invalid ID" };
  }

  try {
    const res = await axios.get(`https://api.watchmode.com/v1/title/${id}/details`, {
      params: { apiKey: process.env.WATCHMODE_API_KEY },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (err: any) {
    return {
      statusCode: err.response?.status || 500,
      body: JSON.stringify({ error: "Failed to fetch details" }),
    };
  }
};