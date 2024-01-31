import MovieList from '../../components/MovieList/MovieList'
import Loader from '../../components/common/Loader/Loader'
import { useGetUpcomingMoviesQuery } from '../../redux/services/movies'

const Upcoming = () => {
  const { data: upcomingMovies, isLoading } = useGetUpcomingMoviesQuery(1)

  return (
    <div className="movie__page">
      <div className="movie__page-nav">
        <hr />
        <h1 className="movie__page-title">Soon</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <MovieList
          movies={upcomingMovies?.results}
          showDate={true}
          clickable={false}
        />
      )}
    </div>
  )
}

export default Upcoming
