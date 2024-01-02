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

interface IGenre {
  id: number
  name: string
}

interface IMovieDetails extends IMovie {
  belongs_to_collection: null
  budget: number
  genres: IGenre[]
  homepage: string
  imbd_id: string
  production_companies: []
  production_countries: []
  revenue: number
  runtime: number
  spoken_languages: []
  status: string
  tagline: string
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
      query: (page) => `movie/now_playing?language=en-US&page=${page}`,
    }),
    getUpcomingMovies: builder.query<IMovieListResponse, number>({
      query: (page) => `movie/upcoming?language=en-US&page=${page}`,
    }),
    getGenres: builder.query<IGenreListResponse, void>({
      query: () => `genre/movie/list?language=en`,
    }),
    getMovie: builder.query<IMovieDetails, number>({
      query: (id) => `movie/${id}`,
    }),
  }),
})

export const {
  useGetPlayingMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
} = moviesApi
