import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sessionsApi = createApi({
  reducerPath: 'sessionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
  }),
  endpoints: (builder) => ({
    getSessionsByMovieId: builder.query({
      query: (id) => `sessions/${id}`,
    }),
  }),
})

export const { useGetSessionsByMovieIdQuery } = sessionsApi
