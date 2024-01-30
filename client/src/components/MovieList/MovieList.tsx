import { IMovie, IMovieListResponse } from '../../interfaces/movie'
import MovieCard from '../MovieCard/MovieCard'
import './MovieList.scss'

type Props = {
  movies?: IMovie[]
  showDate?: boolean
  showRating?: boolean
}

const MovieList = ({ movies, showDate, showRating }: Props) => {
  console.log(movies)

  return (
    <div className="movie__list">
      {movies?.map((movie) => (
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
