import { useParams } from 'react-router-dom'
import { useGetMovieQuery } from '../../redux/services/movies'
import './MovieDetails.scss'
import MovieSession from '../../components/MovieSession/MovieSession'
import { getRatingColorClass, roundVoteAverage } from '../../utils/ratingHelper'
import {
  convertToHoursAndMinutes,
  formatDateWithMonthAbbreviation,
} from '../../utils/dateFormatter'
import Loader from '../../components/common/Loader/Loader'

const MovieDetails = () => {
  const { id } = useParams()

  if (!id) {
    return <div>Error: Movie ID is not provided</div>
  }
  const movieId = parseInt(id, 10)

  const { data: movie, isLoading } = useGetMovieQuery(movieId)
  console.log(movie)

  return isLoading ? (
    <Loader />
  ) : (
    movie && (
      <div className="movie-details__page">
        <div className="movie-body">
          <img
            className="movie-body__img"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-description">
            <p className="movie-description__title">Overview</p>
            <p className="movie-description__overview">{movie.overview}</p>
            <p className="movie-description__title">Release Date</p>
            <p className="movie-description__date">
              {formatDateWithMonthAbbreviation(movie.release_date)}
            </p>
          </div>
        </div>
        <div className="movie-body-info">
          <div className="movie-container">
            <div className="movie-details">
              <h1 className="movie-details__title">{movie.title}</h1>
              <div className="movie-details__genres">
                {movie?.genres.map((genre, key) => (
                  <p className="movie-details__genre" key={key}>
                    {genre.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="movie-info">
              <p className="movie-info__runtime">
                {convertToHoursAndMinutes(movie.runtime)}
              </p>
              <p className="movie-info__age">
                <span>{movie.adult === false ? '12+' : '18+'}</span>
              </p>
              <p
                className={`movie-rating ${getRatingColorClass(
                  movie.vote_average,
                )}`}
              >
                {roundVoteAverage(movie.vote_average)}
              </p>
            </div>
          </div>
          <MovieSession />
        </div>
      </div>
    )
  )
}

export default MovieDetails
