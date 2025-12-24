CinemaView — Movie & TV Discovery App

CinemaView is a modern movie and TV show discovery web app built with React, TypeScript, and the Watchmode API.
It allows users to explore trending content, search titles with autocomplete, view detailed movie pages, and manage personal lists like favorites, bookmarks, and watch history.

This project focuses on real-world frontend patterns: API caching, debounced search, global state management, persistent storage, and clean UI composition.

🚀 Features

🔍 Smart Search with Autocomplete

Debounced API requests

Minimum character threshold

Click-outside handling

Loading & empty states

📈 Trending Movies & TV Shows

Cached API results (30-day TTL)

Parallel data fetching

Optimized re-renders using context

🎞️ Detailed Movie Pages

Full metadata (rating, runtime, genres, plot)

Trailer & IMDb links

Cached + fallback fetching logic

❤️ Favorites & Watchlist

Persisted with localStorage

Toggle logic with deduplication

🕘 Viewing History

Automatically tracks visited titles

Prevents duplicates

🔐 Protected Routes

Simple authentication simulation

User dashboard access control

🎨 Responsive UI

Tailwind CSS

Carousel-based browsing

Mobile-first layout

🧠 Tech Stack

Frontend: React + TypeScript

Routing: React Router v6

State Management: React Context API

Styling: Tailwind CSS

API: Watchmode API

HTTP Client: Axios

Persistence: LocalStorage

Build Tool: Vite

🏗️ Architecture Highlights

API response caching to reduce network calls

Separation of UI, data logic, and state

Reusable components (Carousel, MovieCard, Search)

Graceful loading & error handling

Scroll restoration on route change

⚙️ Setup & Run Locally
git clone https://github.com/your-username/cinemaview.git
cd cinemaview
npm install
npm run dev


Create a .env file:

VITE_WATCHMODE_API_KEY=your_api_key_here

📌 Future Improvements

Real authentication (JWT / OAuth)

Backend integration

Pagination & infinite scroll

Server-side caching

Accessibility improvements

Unit & integration tests

📄 License

This project is for educational and portfolio purposes.