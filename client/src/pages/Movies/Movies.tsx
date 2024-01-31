import MovieList from '../../components/MovieList/MovieList'
import Loader from '../../components/common/Loader/Loader'
import { useGetPlayingMoviesQuery } from '../../redux/services/movies'
import { useGetAllSessionsQuery } from '../../redux/services/sessions'
import './Movies.scss'

const Movies = () => {
  const { data: playingMovies, isLoading: playingMoviesLoading } =
    useGetPlayingMoviesQuery(1)

  const { data: sessions, isLoading: sessionsLoading } =
    useGetAllSessionsQuery()

  const moviesWithSessions = playingMovies?.results.filter(
    (movie) => sessions?.some((session) => session.movieId === movie.id),
  )

  const isLoading = playingMoviesLoading || sessionsLoading

  return (
    <div className="movie__page">
      <div className="movie__page-nav">
        <hr />
        <h1 className="movie__page-title">Current</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : moviesWithSessions?.length !== 0 ? (
        <MovieList movies={moviesWithSessions} showRating={true} />
      ) : (
        <p className="movie__page-error">No sessions</p>
      )}
    </div>
  )
}

export default Movies
