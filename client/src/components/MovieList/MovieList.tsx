import MovieCard from '../MovieCard/MovieCard'
import './MovieList.scss'

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

type Props = {
  movies?: IMovieListResponse
  showDate?: boolean
  showRating?: boolean
}

const MovieList = ({ movies, showDate, showRating }: Props) => {
  console.log(movies)

  return (
    <div className="movie__list">
      {movies?.results.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          vote_average={movie.vote_average}
          release_date={movie.release_date}
          genre_ids={movie.genre_ids}
          showDate={showDate}
          showRating={showRating}
        />
      ))}
    </div>
  )
}

export default MovieList
