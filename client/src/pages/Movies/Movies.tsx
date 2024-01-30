import MovieList from '../../components/MovieList/MovieList'
import Loader from '../../components/common/Loader/Loader'
import { useGetPlayingMoviesQuery } from '../../redux/services/movies'
import { useGetAllSessionsQuery } from '../../redux/services/sessions'
import './Movies.scss'

const Movies = () => {
  const {
    data: playingMovies,
    error: playingMoviesError,
    isLoading: playingMoviesLoading,
  } = useGetPlayingMoviesQuery(1)

  const {
    data: sessions,
    error: sessionsError,
    isLoading: sessionsLoading,
  } = useGetAllSessionsQuery()

  const moviesWithSessions = playingMovies?.results.filter(
    (movie) => sessions?.some((session) => session.movieId === movie.id),
  )

  const isLoading = playingMoviesLoading || sessionsLoading
  const error =
    playingMoviesError || sessionsError || moviesWithSessions?.length === 0

  console.log(sessions)
  console.log(moviesWithSessions)

  return (
    <div className="movie__page">
      <div className="movie__page-nav">
        <hr />
        <h1 className="movie__page-title">Current</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>
          <p>No sessions</p>
        </div>
      ) : (
        <MovieList movies={moviesWithSessions} showRating={true} />
      )}
    </div>
  )
}

export default Movies
