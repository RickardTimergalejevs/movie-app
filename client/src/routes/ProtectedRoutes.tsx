import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../redux/features/auth/authSlice'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoutes
