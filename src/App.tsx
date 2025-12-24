import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './layout/layout'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Error from './pages/error'
import MovieContextProvider from './context/trendingcontext'
import AllMovies from './pages/allmovies'
import AllTV from './pages/alltvs'
import MovieDetail from './pages/movieDetail'
import User from './pages/user'
import ProtectedRoute from './pages/ProtectedRoute'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'  

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        { path: 'movies', element: <AllMovies /> },
        { path: 'tv', element: <AllTV /> },
        { path: 'title/:id', element: <MovieDetail /> },
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
        {
          element: <ProtectedRoute />,
          children: [{ path: "user", element: <User /> }]
        }
      ]
    }
  ])
///important for storing
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime:  1000 * 60 * 60 * 24 * 7,      
        gcTime: 1000 * 60 * 60 * 24 * 7,    
        refetchOnMount: false,
        retry: 1,
      },
    },
  });

  const persister = createAsyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : null,
    throttleTime: 1000, 
  });

  return (
    <PersistQueryClientProvider 
      client={queryClient} 
      persistOptions={{ persister }}
    >
      <MovieContextProvider>
        <RouterProvider router={router} />
      </MovieContextProvider>
    </PersistQueryClientProvider>
  )
}

export default App