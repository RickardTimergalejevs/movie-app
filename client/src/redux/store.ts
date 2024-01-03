import { configureStore } from '@reduxjs/toolkit'
import { moviesApi } from './services/movies'
import { sessionsApi } from './services/sessions'

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [sessionsApi.reducerPath]: sessionsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware, sessionsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
