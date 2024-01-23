import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { authApi } from '../../services/auth'

interface IUser {
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
}

const initialState: InitialState = {
  user: null,
  token: null,
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
      },
    )
    builder.addMatcher(
      authApi.endpoints.current.matchFulfilled,
      (state, action) => {
        state.user = action.payload
      },
    )
  },
})

export const { logout } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token
