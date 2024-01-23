import { useSelector } from 'react-redux'
import { logout, selectCurrentUser } from '../../redux/features/auth/authSlice'
import NavButton from '../../components/common/NavButton/NavButton'
import { useDispatch } from 'react-redux'

const Profile = () => {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
  }

  return (
    <div>
      <div className="profile__page-nav">
        <hr />
        <h1 className="profile__page-title">Profile</h1>
      </div>
      <NavButton children="Logout" onClick={handleLogout} />
      {user && (
        <div>
          <h1>{`${user.firstName} ${user.lastName}`}</h1>
          <p>{user.email}</p>
        </div>
      )}
      <div>
        <h2>Past</h2>
        <h2>Current</h2>
      </div>
    </div>
  )
}

export default Profile
