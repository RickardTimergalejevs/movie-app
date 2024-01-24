import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { authApi } from '../../services/auth'

interface IUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  location: string
  isAdmin: boolean
}

interface InitialState {
  user: IUser | null
  token: string | null
  isAuthenticated: boolean
}

const initialState: InitialState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      },
    )
    builder.addMatcher(
      authApi.endpoints.current.matchFulfilled,
      (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
      },
    )
  },
})

export const { logout } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
