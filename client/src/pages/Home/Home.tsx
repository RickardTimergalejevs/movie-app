import { useGetPlayingMoviesQuery } from '../../redux/services/movies'
import './Home.scss'
import { Link } from 'react-router-dom'

const Home = () => {
  const { data: playingMovies, error, isLoading } = useGetPlayingMoviesQuery(1)

  const results = playingMovies?.results || []
  const randomIndex = Math.floor(Math.random() * results.length)
  const playingMovie = results[randomIndex]

  return isLoading ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : error ? (
    <div>
      <p>Error!</p>
    </div>
  ) : (
    <div className="home__page">
      <div className="home__page-movie-body">
        <img
          className="home__page-movie-img"
          src={`https://image.tmdb.org/t/p/original/${playingMovie?.backdrop_path}`}
          alt={playingMovie?.title}
        />
      </div>
      <div className="home__page-details">
        <h1 className="home__page-movie-title">{playingMovie?.title}</h1>
        <Link to={`/movie/${playingMovie?.id}`}>
          <h1 className="home__page-title">Watch now</h1>
        </Link>
      </div>
    </div>
  )
}

export default Home
