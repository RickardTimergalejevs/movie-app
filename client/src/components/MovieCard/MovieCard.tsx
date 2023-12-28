import { useGetGenresQuery } from '../../redux/services/movies'
import './MovieCard.scss'

type Props = {
  title: string
  poster_path: string
  vote_average: number
  genre_ids: number[]
}

type Genre = {
  id: number
  name: string
}

const MovieCard = ({ title, poster_path, vote_average, genre_ids }: Props) => {
  const {
    data: genres,
    error: genresError,
    isLoading: genresLoading,
  } = useGetGenresQuery()

  const genresData = genres as { genres: Genre[] } | undefined

  const getGenreName = (genreId: number) => {
    const genre = genresData?.genres.find((g) => g.id === genreId)
    return genre?.name || 'Unkown Genre'
  }

  const roundedVoteAverage = Math.round(vote_average)

  let ratingColorClass = ''

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
        <p className={`movie__card-rating ${ratingColorClass}`}>
          {roundedVoteAverage}
        </p>
        <img className="movie__card-img" src={poster_path} alt={title} />
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
