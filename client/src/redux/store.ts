import { configureStore } from '@reduxjs/toolkit'
import { moviesApi } from './services/movies'
import { sessionsApi } from './services/sessions'
import { authApi } from './services/auth'
import auth from './features/auth/authSlice'

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [sessionsApi.reducerPath]: sessionsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      moviesApi.middleware,
      sessionsApi.middleware,
      authApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
