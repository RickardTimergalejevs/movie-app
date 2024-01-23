import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../redux/features/auth/authSlice'

const Profile = () => {
  const user = useSelector(selectCurrentUser)

  return (
    <div>
      <div className="profile__page-nav">
        <hr />
        <h1 className="profile__page-title">Profile</h1>
      </div>
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
