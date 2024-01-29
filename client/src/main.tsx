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
import Checkout from './pages/Checkout/Checkout.tsx'
import Confirmation from './pages/Confirmation/Confirmation.tsx'
import Admin from './pages/Admin/Admin.tsx'
import AdminRoutes from './routes/AdminRoutes.tsx'
import AuthRoutes from './routes/AuthRoutes.tsx'

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
        path: '/confirmation',
        element: <Confirmation />,
      },
      {
        element: <AuthRoutes />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },
      {
        element: <AdminRoutes />,
        children: [
          {
            path: '/admin',
            element: <Admin />,
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
