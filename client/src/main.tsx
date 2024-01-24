import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import '../styles/main.scss'
import Home from './pages/Home/Home.tsx'
import Movies from './pages/Movies/Movies.tsx'
import Upcoming from './pages/Upcoming/Upcoming.tsx'
import Profile from './pages/Profile/Profile.tsx'
import App from './App.tsx'
import { store } from './redux/store.ts'
import MovieDetails from './pages/MovieDetails/MovieDetails.tsx'
import Login from './pages/Login/Login.tsx'
import Authorization from './redux/features/auth/Authorization.tsx'
import ProtectedRoutes from './routes/ProtectedRoutes.tsx'
import Checkout from './pages/Checkout/Checkout.tsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/movies',
        element: <Movies />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetails />,
      },
      {
        path: '/upcoming',
        element: <Upcoming />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Authorization>
        <RouterProvider router={router} />
      </Authorization>
    </Provider>
  </React.StrictMode>,
)
