import MovieList from '../../components/MovieList/MovieList'
import Loader from '../../components/common/Loader/Loader'
import { useGetPlayingMoviesQuery } from '../../redux/services/movies'
import './Movies.scss'

const Movies = () => {
  const { data: playingMovies, error, isLoading } = useGetPlayingMoviesQuery(1)

  return (
    <div className="movie__page">
      <div className="movie__page-nav">
        <hr />
        <h1 className="movie__page-title">Today</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>
          <p>Error!</p>
        </div>
      ) : (
        <MovieList movies={playingMovies} showRating={true} />
      )}
    </div>
  )
}

export default Movies
