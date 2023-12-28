import { useParams } from 'react-router-dom'
import { useGetMovieQuery } from '../../redux/services/movies'

const MovieDetails = () => {
  const { id } = useParams()

  if (!id) {
    return <div>Error: Movie ID is not provided</div>
  }
  const movieId = parseInt(id, 10)

  const { data: movie, error, isLoading } = useGetMovieQuery(movieId)
  console.log(movie)

  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
        alt={movie?.title}
        width={'300px'}
      />
      <h1>{movie?.title}</h1>
      {movie?.genres.map((genre, key) => (
        <div key={key}>
          <p>{genre.name}</p>
        </div>
      ))}
      <p>{movie?.runtime} minutes</p>
      <p>{movie?.adult === false && '12+'}</p>
      <p>{movie?.vote_average}</p>
      <p>Overview</p>
      <p>{movie?.overview}</p>
      <p>Release Date</p>
      <p>{movie?.release_date}</p>
    </div>
  )
}

export default MovieDetails
