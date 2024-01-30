import Loader from '../../../components/common/Loader/Loader'
import { useCurrentQuery } from '../../services/auth'

const Authorization = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <Loader />
  }

  return children
}

export default Authorization
