
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

function App() {
const router=createBrowserRouter([
  {path:'/',
    element:<Layout/>,
    errorElement:<Error/>,
    children:[
      {index:true,element:<Home/>},
      {path:'movies',element:<AllMovies/>},
      {path:'tv',element:<AllTV/>},
      {path:'title/:id',element:<MovieDetail/>},
      {path:'login',element:<Login/>},
      {path:'signup',element:<Signup/>},
       {
        element: <ProtectedRoute />,
        children: [
          { path: "user", element: <User /> }]}

    ]
    
  }
])

  return (
    <MovieContextProvider>
      <RouterProvider router={router}/>
    </MovieContextProvider>
  )
}

export default App
