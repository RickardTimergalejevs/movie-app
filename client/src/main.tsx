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
        path: '/upcoming',
        element: <Upcoming />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
