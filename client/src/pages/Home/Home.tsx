import Loader from '../../components/common/Loader/Loader'
import { useGetUpcomingMoviesQuery } from '../../redux/services/movies'
import './Home.scss'
import { Link } from 'react-router-dom'

const Home = () => {
  const { data: playingMovies, isLoading } = useGetUpcomingMoviesQuery(1)

  const results = playingMovies?.results || []
  const randomIndex = Math.floor(Math.random() * results.length)
  const playingMovie = results[randomIndex]

  const POSTER_PATH = import.meta.env.VITE_TMBD_POSTER_PATH

  return isLoading ? (
    <Loader />
  ) : (
    <div className="home__page">
      <div className="home__page-movie-body">
        <img
          className="home__page-movie-img"
          src={`${POSTER_PATH}${playingMovie?.backdrop_path}`}
          alt={playingMovie?.title}
        />
      </div>
      <div className="home__page-details">
        <h1 className="home__page-movie-title">{playingMovie?.title}</h1>
        <Link to={`/upcoming`}>
          <h1 className="home__page-title">Watch soon</h1>
        </Link>
      </div>
    </div>
  )
}

export default Home
