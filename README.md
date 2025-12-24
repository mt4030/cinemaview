CinemaView — Movie & TV Discovery App

CinemaView is a modern movie and TV show discovery web app built with React, TypeScript, and the Watchmode API. It lets users explore trending content, search titles with autocomplete, view detailed movie pages, and manage personal lists like favorites, bookmarks, and watch history.

This project emphasizes real-world frontend patterns: API caching, debounced search, global state management, persistent storage, and clean UI composition.

🚀 Features
🔍 Smart Search with Autocomplete

Debounced API requests to reduce network calls

Minimum 3-character threshold for searches

Click-outside handling for suggestion dropdown

Loading & empty states with user-friendly feedback

📈 Trending Movies & TV Shows

Parallel fetching of movies and TV series

Cached API results with TanStack Query v5

Persistent cache via PersistQueryClientProvider (localStorage)

Optimized re-renders using React Context API

🎞️ Detailed Movie Pages

Full metadata: rating, runtime, genres, plot overview

Trailer & IMDb links

Cached + fallback fetching logic for fast loading

❤️ Favorites & Watchlist

Persisted using localStorage

Toggle logic with deduplication

Accessible globally via context

🕘 Viewing History

Automatically tracks visited titles

Prevents duplicates

Stored persistently for quick revisit

🔐 Protected Routes

Simulated authentication

User dashboard access control

🎨 Responsive UI

Tailwind CSS for modern styling

Carousel-based browsing

Mobile-first layout

🧠 Tech Stack

Frontend: React + TypeScript

Routing: React Router v6

State Management: React Context API + TanStack Query v5

Styling: Tailwind CSS

HTTP Client: Axios

API: Watchmode API

Persistence: LocalStorage with TanStack Query cache

Build Tool: Vite

🏗️ Architecture Highlights

TanStack Query v5 for caching, server-state management, and parallel fetching

Persistent query cache using createAsyncStoragePersister

Separation of UI, data logic, and state

Reusable components (Carousel, MovieCard, Search)

Graceful loading and error handling

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

Backend integration for user data

Pagination & infinite scroll for large lists

Server-side caching for API calls

Accessibility improvements (ARIA, keyboard nav)

Unit & integration tests

📄 License

This project is for educational and portfolio purposes.