import { useParams } from 'react-router-dom'
import { useGetSessionsByMovieIdQuery } from '../../redux/services/sessions'

const MovieSession = () => {
  const { id } = useParams()

  if (!id) {
    return <div>Error: Movie ID is not provided</div>
  }

  const { data, error, isLoading } = useGetSessionsByMovieIdQuery(id)
  console.log(data)

  return <div>MovieSession</div>
}

export default MovieSession
