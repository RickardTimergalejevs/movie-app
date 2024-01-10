import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
  location: string
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

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/users/',
  }),
  endpoints: (builder) => ({
    register: builder.mutation<IUser, IRegisterRequest>({
      query: (credentials) => ({
        url: 'register',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation<IUserResponse, ILoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
