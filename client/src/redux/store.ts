import { configureStore } from '@reduxjs/toolkit'
import { moviesApi } from './services/movies'
import { sessionsApi } from './services/sessions'
import { authApi } from './services/auth'
import auth from './features/auth/authSlice'
import { listenerMiddleware } from './middleware/auth'
import orderReducer from './features/order/orderSlice'

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [sessionsApi.reducerPath]: sessionsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth,
    order: orderReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(moviesApi.middleware, sessionsApi.middleware, authApi.middleware)
      .prepend(listenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
