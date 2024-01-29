import { useSelector } from 'react-redux'
import { logout, selectCurrentUser } from '../../redux/features/auth/authSlice'
import NavButton from '../../components/common/NavButton/NavButton'
import { useDispatch } from 'react-redux'
import './Profile.scss'
import { useGetOrdersQuery } from '../../redux/services/order'
import { useGetMovieQuery } from '../../redux/services/movies'

const Profile = () => {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const { data: order, isLoading, isError } = useGetOrdersQuery(user?._id || '')

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
          <div className="tickets-current-list">
            {order?.map((order) => (
              <div className="current-ticket">
                <div className="current-ticket-details">
                  <h1 className="current-ticket-details__field">
                    {order.sessionId.movieId}
                  </h1>
                  <p className="current-ticket-details__field">
                    <span>Date: </span>
                    {order.sessionId?.showDate}
                  </p>
                  <p className="current-ticket-details__field">
                    <span>Time: </span>
                    {order.sessionId?.showTime}
                  </p>
                  <p className="current-ticket-details__field">
                    <span>Type: </span>
                    {order.sessionId?.displayType}
                  </p>
                  <p className="current-ticket-details__field">
                    <span>Places: </span>
                    {order.selectedSeats.join(', ')}
                  </p>
                  <p className="current-ticket-details__field">
                    <span>Total Price: </span>
                    {order.totalPrice} kr
                  </p>
                </div>
                <div className="current-ticket-id">
                  <p>{order._id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
