import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ISeat {
  isBooked: boolean
  seat: string
  _id: string
}

interface IRow {
  row: string
  seats: ISeat[]
  _id: string
}

interface ISessionListResponse {
  _id: string
  movieId: number
  city: string
  showDate: string
  showTime: string
  displayType: string
  hall: {
    _id: string
    name: string
    capacity: number
    rows: IRow[]
  }
  tickets: [
    {
      _id: string
      price: number
      type: string
    },
  ]
}

interface ICreateSessionRequest {
  movieId: number
  city: string
  showDate: string
  showTime: string
  displayType: string
}

export const sessionsApi = createApi({
  reducerPath: 'sessionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
  }),
  endpoints: (builder) => ({
    getSessionsByMovieIdAndDate: builder.query<
      ISessionListResponse[],
      { id: string; date: string }
    >({
      query: ({ id, date }) => `sessions/${id}/${date}`,
    }),
    createSession: builder.mutation<
      ICreateSessionRequest,
      ICreateSessionRequest
    >({
      query: (session) => ({
        url: 'sessions',
        method: 'POST',
        body: session,
      }),
    }),
  }),
})

export const { useGetSessionsByMovieIdAndDateQuery, useCreateSessionMutation } =
  sessionsApi
