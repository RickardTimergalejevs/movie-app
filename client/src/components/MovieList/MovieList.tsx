import { useGetPlayingMoviesQuery } from '../../redux/services/movies'
import MovieCard from '../MovieCard/MovieCard'
import './MovieList.scss'

const MovieList = () => {
  const {
    data: playingMovies,
    error: moviesError,
    isLoading: moviesLoading,
  } = useGetPlayingMoviesQuery(1)
  console.log()

  return (
    <div className="movie__list">
      {playingMovies?.results.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          poster_path={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          vote_average={movie.vote_average}
          genre_ids={movie.genre_ids}
        />
      ))}
    </div>
  )
}

export default MovieList
