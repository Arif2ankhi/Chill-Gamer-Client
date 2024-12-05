import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import MyReviews from './components/MyReviews/MyReviews.jsx';
import GameWatchList from './components/GameWatchList/GameWatchList';
import Register from './components/Register/Register.jsx';
import Layout from './components/Layout/Layout.jsx';
import Signin from './components/Signin/Signin.jsx';
import AllReviews from './components/AllReviews/AllReviews.jsx';
import AddReview from './components/AddReview/AddReview.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import AddGame from './components/AddGame/AddGame.jsx';



const router= createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path: "/",
        element: <Home></Home>
      },
      {
        Path:"/allReviews",
        element: <AllReviews></AllReviews>

      },
      {
        Path:"/addReview",
        element: <AddReview></AddReview>

      },
      {
        path:"/myReviews",
        element:<MyReviews></MyReviews>
      },
      {
        path: "/gameWatchList",
        element: <GameWatchList></GameWatchList>
      },
      {
        path: "/login",
        element: <Signin></Signin>
      },
      {
        path: "/register",
        element:<Register></Register>
      },
      {
        path: "/addGame",
        element:<AddGame></AddGame>
      }

    ]
  },

])



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
