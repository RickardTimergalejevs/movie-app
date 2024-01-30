import MovieList from '../../components/MovieList/MovieList'
import { useGetUpcomingMoviesQuery } from '../../redux/services/movies'

const Upcoming = () => {
  const {
    data: upcomingMovies,
    error,
    isLoading,
  } = useGetUpcomingMoviesQuery(1)

  return (
    <div className="movie__page">
      <div className="movie__page-nav">
        <hr />
        <h1 className="movie__page-title">Soon</h1>
      </div>
      {isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div>
          <p>Error!</p>
        </div>
      ) : (
        <MovieList movies={upcomingMovies?.results} showDate={true} />
      )}
    </div>
  )
}

export default Upcoming
