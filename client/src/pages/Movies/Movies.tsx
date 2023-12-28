import MovieList from '../../components/MovieList/MovieList'
import './Movies.scss'

const Movies = () => {
  return (
    <div className="movie__page">
      <div className="movie__page-nav">
        <hr />
        <h1 className="movie__page-title">Today</h1>
      </div>
      <MovieList />
    </div>
  )
}

export default Movies
