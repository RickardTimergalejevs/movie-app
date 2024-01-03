import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ISeat {
  isBooked: boolean
  seat: string
}

interface IRow {
  row: string
  seats: ISeat[]
}

interface ISessionListResponse {
  _id: string
  movieId: string
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
  }),
})

export const { useGetSessionsByMovieIdAndDateQuery } = sessionsApi
