import { useSelector } from 'react-redux'
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from '../redux/features/auth/authSlice'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const currentUser = useSelector(selectCurrentUser)

  const isAdmin = isAuthenticated && currentUser && currentUser.isAdmin

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />
}

export default AdminRoutes
