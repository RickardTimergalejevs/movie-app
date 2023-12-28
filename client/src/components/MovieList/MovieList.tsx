import { useGetPlayingMoviesQuery } from '../../redux/services/movies'
import MovieCard from '../MovieCard/MovieCard'

const MovieList = () => {
  const { data, error, isLoading } = useGetPlayingMoviesQuery(1)
  console.log(data)

  return (
    <div>
      <MovieCard />
    </div>
  )
}

export default MovieList
