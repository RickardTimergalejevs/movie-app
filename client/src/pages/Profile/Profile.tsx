import { useSelector } from 'react-redux'
import { logout, selectCurrentUser } from '../../redux/features/auth/authSlice'
import NavButton from '../../components/common/NavButton/NavButton'
import { useDispatch } from 'react-redux'
import './Profile.scss'
import {
  IOrderListResponse,
  useGetOrdersQuery,
} from '../../redux/services/order'

import { getCurrentDate } from '../../utils/dateFormatter'
import TicketCard from '../../components/TicketCard/TicketCard'

const Profile = () => {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const { data: order } = useGetOrdersQuery(user?._id || '')

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
  }

  console.log(getCurrentDate())

  const isOrderPast = (orderDate: IOrderListResponse) => {
    const currentDate = getCurrentDate()
    return orderDate.sessionId.showDate < currentDate
  }

  const isOrderCurrent = (orderDate: IOrderListResponse) => {
    const currentDate = getCurrentDate()
    return orderDate.sessionId.showDate >= currentDate
  }

  const pastTickets = order?.filter((order) => isOrderPast(order))
  const currentTickets = order?.filter((order) => isOrderCurrent(order))

  return (
    <div className="profile__page">
      <div className="profile-nav">
        <hr />
        <h1 className="profile-nav__title">Profile</h1>
      </div>
      <div className="profile-logout">
        <NavButton children="Logout" color="light" onClick={handleLogout} />
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
          <div className="tickets-list">
            {pastTickets && pastTickets?.length !== 0 ? (
              pastTickets?.map((order, index) => (
                <TicketCard key={index} order={order} index={index} />
              ))
            ) : (
              <p className="tickets-list__error">No past tickets</p>
            )}
          </div>
        </div>
        <div className="tickets-current">
          <hr />
          <h3 className="tickets-current__title">Current</h3>
          <div className="tickets-list">
            {currentTickets && currentTickets?.length !== 0 ? (
              currentTickets?.map((order, index) => (
                <TicketCard
                  key={index}
                  order={order}
                  index={index}
                  showId={true}
                />
              ))
            ) : (
              <p className="tickets-list__error">No current tickets</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
