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

const SESSIONS_URL = import.meta.env.VITE_SESSIONS_URL

export const sessionsApi = createApi({
  reducerPath: 'sessionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SESSIONS_URL,
  }),
  tagTypes: ['Session'],
  endpoints: (builder) => ({
    getAllSessions: builder.query<ISessionListResponse[], void>({
      query: () => `/`,
    }),
    getSessionsByMovieIdAndDate: builder.query<
      ISessionListResponse[],
      { id: string; date: string }
    >({
      query: ({ id, date }) => `${id}/${date}`,
    }),
    getSessionsByMovieId: builder.query<ISessionListResponse[], { id: string }>(
      {
        query: ({ id }) => `${id}`,
        providesTags: ['Session'],
      },
    ),
    createSession: builder.mutation<
      ICreateSessionRequest,
      ICreateSessionRequest
    >({
      query: (session) => ({
        url: '/',
        method: 'POST',
        body: session,
      }),
      invalidatesTags: ['Session'],
    }),
  }),
})

export const {
  useGetAllSessionsQuery,
  useGetSessionsByMovieIdQuery,
  useGetSessionsByMovieIdAndDateQuery,
  useCreateSessionMutation,
} = sessionsApi
