import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

interface IUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  location: string
  isAdmin: boolean
}

export interface IUserResponse {
  user: IUser
  token: string
}

export interface ILoginRequest {
  email: string
  password: string
}

interface IRegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  location: string
}

interface ICurrentUserRequest {
  _id: string
  firstName: string
  lastName: string
  email: string
  location: string
  isAdmin: boolean
  password: string
}

const USERS_URL = import.meta.env.VITE_USERS_URL

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: USERS_URL,
    prepareHeaders(headers, { getState }) {
      const token =
        (getState() as RootState).auth.token || localStorage.getItem('token')

      if (token && token !== null) {
        headers.set('authorization', `Bearer ${token}`)
      }
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    register: builder.mutation<IUser, IRegisterRequest>({
      query: (user) => ({
        url: 'register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation<IUserResponse, ILoginRequest>({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    current: builder.query<ICurrentUserRequest, void>({
      query: () => ({
        url: 'current',
        method: 'GET',
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } =
  authApi
