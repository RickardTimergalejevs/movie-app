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
    <div>
      <div></div>
      <NavButton children="Back" onClick={() => navigate(-1)} />
      {session && movie && (
        <div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
            />
            <h1>{movie.title}</h1>
          </div>
          <div>
            <p>Date: {session.showDate}</p>
            <p>Time: {session.showTime}</p>
            <p>Tickets: {tickets}</p>
            <div>
              <p>Seats: </p>
              <p>
                {seats.map((seat, index) => (
                  <p key={index}>{seat}</p>
                ))}
              </p>
            </div>
            <p>Total Price: {totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout
