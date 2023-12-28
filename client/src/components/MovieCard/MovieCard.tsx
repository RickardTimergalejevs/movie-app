import { useGetGenresQuery } from '../../redux/services/movies'
import './MovieCard.scss'
import { Link } from 'react-router-dom'

type Props = {
  id: number
  title: string
  poster_path: string
  vote_average: number
  genre_ids: number[]
  release_date: string
  showDate?: boolean
  showRating?: boolean
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
}: Props) => {
  const { data: genres } = useGetGenresQuery()

  const genresData = genres as { genres: Genre[] } | undefined

  const getGenreName = (genreId: number) => {
    const genre = genresData?.genres.find((g) => g.id === genreId)
    return genre?.name || 'Unkown Genre'
  }

  const roundedVoteAverage = Math.round(vote_average)

  let ratingColorClass

  if (roundedVoteAverage >= 7) {
    ratingColorClass = 'movie__card-rating--green'
  } else if (roundedVoteAverage >= 5) {
    ratingColorClass = 'movie__card-rating--yellow'
  } else if (roundedVoteAverage <= 4) {
    ratingColorClass = 'movie__card-rating--red'
  }

  return (
    <div className="movie__card">
      <div className="movie__card-body">
        {showRating && (
          <p className={`movie__card-rating ${ratingColorClass}`}>
            {roundedVoteAverage}
          </p>
        )}
        {showDate && <p className="movie__card-date">{release_date}</p>}
        <Link to={`/movie/${id}`}>
          <img className="movie__card-img" src={poster_path} alt={title} />
        </Link>
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
