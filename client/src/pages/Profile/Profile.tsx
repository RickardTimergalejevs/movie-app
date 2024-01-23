import { useSelector } from 'react-redux'
import { logout, selectCurrentUser } from '../../redux/features/auth/authSlice'
import NavButton from '../../components/common/NavButton/NavButton'
import { useDispatch } from 'react-redux'
import './Profile.scss'

const Profile = () => {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
  }

  return (
    <div className="profile__page">
      <div className="profile-nav">
        <hr />
        <h1 className="profile-nav__title">Profile</h1>
      </div>
      <div className="profile-logout">
        <NavButton children="Logout" onClick={handleLogout} />
      </div>
      {user && (
        <div className="profile-user">
          <h1 className="profile-user__name">{`${user.firstName} ${user.lastName}`}</h1>
          <p className="profile-user__email">{user.email}</p>
        </div>
      )}
      <div className="profile-tickets">
        <div className="tickets-past">
          <hr />
          <h3 className="tickets-past__title">Past</h3>
        </div>
        <div className="tickets-current">
          <hr />
          <h3 className="tickets-current__title">Current</h3>
        </div>
      </div>
    </div>
  )
}

export default Profile
