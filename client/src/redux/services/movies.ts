import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IMovie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface IMovieListResponse {
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  results: IMovie[]
  total_pages: number
  total_results: number
}

interface IGenreListResponse {
  genres: []
}

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMBD_TOKEN}`,
    },
  }),
  endpoints: (builder) => ({
    getPlayingMovies: builder.query<IMovieListResponse, number>({
      query: (page: number) => `movie/now_playing?language=en-US&page=${page}`,
    }),
    getUpcomingMovies: builder.query<IMovieListResponse, number>({
      query: (page: number) => `movie/upcoming?language=en-US&page=${page}`,
    }),
    getGenres: builder.query<IGenreListResponse, void>({
      query: () => `genre/movie/list?language=en`,
    }),
  }),
})

export const {
  useGetPlayingMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetGenresQuery,
} = moviesApi
