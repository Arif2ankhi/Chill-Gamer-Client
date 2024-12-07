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
import GameCard from './components/GameCard/GameCard.jsx';
import GameDetails from './components/GameDetails/GameDetails.jsx';
import AuthProvider from './components/AuthProvider/AuthProvider.jsx';
import ReviewDetail from './components/ReviewDetail/ReviewDetail.jsx';
import UpdateReview from './components/UpdateReview/UpdateReview.jsx';



const router= createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/game')
      },
      {
        
          path: "/games/:_id",
          element: <GameDetails></GameDetails>,
          // loader: ({ params }) => fetch(`http://localhost:5000/game/${params._id}`),
          loader: () => fetch('http://localhost:5000/game')
         
      },
      
      {
        path:"/allReviews",
        element: <AllReviews></AllReviews>

      },
      {
        path: "/review/:id",
        element:<ReviewDetail></ReviewDetail>,
        loader: () => fetch('http://localhost:5000/reviews')
        // loader: ({ params }) => fetch(`http://localhost:5000/reviews/${params._id}`),
        

      },
      {
        path:"/addReview",
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
      },
      {
        path: "/gameCard",
        element:<GameCard></GameCard>
      },
      {
        path: "/updateReview/:id",
        element:<UpdateReview></UpdateReview>
        
      }
      

    ]
  },

])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />

    </AuthProvider>
   
  </StrictMode>,
)
