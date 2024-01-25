import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../redux/features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {
  selectSeats,
  selectSession,
  selectTotalPrice,
  selectTotalSelectedSeats,
  setUserId,
} from '../../redux/features/order/orderSlice'
import NavButton from '../../components/common/NavButton/NavButton'
import { useNavigate } from 'react-router-dom'
import { useGetMovieQuery } from '../../redux/services/movies'
import './Checkout.scss'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(selectCurrentUser)
  const session = useSelector(selectSession)
  const seats = useSelector(selectSeats)
  const tickets = useSelector(selectTotalSelectedSeats)
  const totalPrice = useSelector(selectTotalPrice)

  const { data: movie, isLoading, isError } = useGetMovieQuery(session?.movieId)

  useEffect(() => {
    if (user && user._id) {
      dispatch(setUserId(user._id))
    }
  }, [user, dispatch])

  return (
    <div className="checkout__page">
      <div className="checkout-nav">
        <hr />
        <h1 className="checkout-nav__title">Checkout</h1>
      </div>
      <div className="checkout-back-btn">
        <NavButton children="Back" onClick={() => navigate(-1)} />
      </div>
      {session && movie && (
        <div className="checkout-session-card">
          <div className="checkout-movie-details">
            <img
              className="checkout-movie-details__img"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
            />
            <h2 className="checkout-movie-details__title">{movie.title}</h2>
          </div>
          <div className="checkout-session-details">
            <p className="checkout-session-details__field">
              <span>Date:</span> {session.showDate}
            </p>
            <p className="checkout-session-details__field">
              <span>Time:</span> {session.showTime}
            </p>
            <p className="checkout-session-details__field">
              <span>Type:</span> {session.displayType}
            </p>
            <p className="checkout-session-details__field">
              <span>Tickets:</span> {tickets}
            </p>
            <div className="checkout-session-details__field checkout-session-details__seats">
              <p>
                <span>Seats:</span>{' '}
              </p>
              <p>{seats.join(', ')}</p>
            </div>
            <p className="checkout-session-details__field">
              <span>Total Price:</span> {totalPrice} kr
            </p>
          </div>
        </div>
      )}
      <div>
        <NavButton children="Buy" color="green" />
      </div>
    </div>
  )
}

export default Checkout
