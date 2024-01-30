import { useGetGenresQuery } from '../../redux/services/movies'
import './MovieCard.scss'
import { Link } from 'react-router-dom'
import '../../utils/ratingHelper'
import { getRatingColorClass, roundVoteAverage } from '../../utils/ratingHelper'
import { formatDateWithMonthAbbreviation } from '../../utils/dateFormatter'

type Props = {
  id: number
  title: string
  poster_path: string
  vote_average: number
  genre_ids: number[]
  release_date: string
  showDate?: boolean
  showRating?: boolean
  clickable?: boolean
}

type Genre = {
  id: number
  name: string
}

const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  genre_ids,
  release_date,
  showDate,
  showRating,
  clickable = true,
}: Props) => {
  const { data: genres } = useGetGenresQuery()

  const genresData = genres as { genres: Genre[] } | undefined

  const getGenreName = (genreId: number) => {
    const genre = genresData?.genres.find((g) => g.id === genreId)
    return genre?.name || 'Unkown Genre'
  }

  return (
    <div className="movie__card">
      <div className="movie__card-body">
        {showRating && (
          <p className={`movie-rating ${getRatingColorClass(vote_average)}`}>
            {roundVoteAverage(vote_average)}
          </p>
        )}
        {showDate && (
          <p className="movie__card-date">
            {formatDateWithMonthAbbreviation(release_date)}
          </p>
        )}
        {clickable ? (
          <Link to={`/movie/${id}`}>
            <img className="movie__card-img" src={poster_path} alt={title} />
          </Link>
        ) : (
          <img
            className={`movie__card-img ${
              !clickable && 'movie__card-img__disabled'
            }`}
            src={poster_path}
            alt={title}
          />
        )}
      </div>
      <div className="movie__card-details">
        <h1 className="movie__card-title">{title}</h1>
        <div className="movie__card-genres">
          {genre_ids.slice(0, 2).map((genre, key) => (
            <p className="movie__card-genre" key={key}>
              {getGenreName(genre)}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
