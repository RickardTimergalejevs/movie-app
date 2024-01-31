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
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import PaymentForm from '../../components/CheckoutForm/PaymentForm'
import { useCreatePaymentIntentMutation } from '../../redux/services/checkout'
import { useCreateOrderMutation } from '../../redux/services/order'
import Button from '../../components/common/Button/Button'

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(selectCurrentUser)
  const session = useSelector(selectSession)
  const seats = useSelector(selectSeats)
  const tickets = useSelector(selectTotalSelectedSeats)
  const totalPrice = useSelector(selectTotalPrice)

  const { data: movie } = useGetMovieQuery(session?.movieId ?? 0)

  const [createPaymentIntent, { data }] = useCreatePaymentIntentMutation()
  const [createOrder] = useCreateOrderMutation()

  console.log(totalPrice)

  const handleCreateOrder = async () => {
    try {
      if (!session || !user) {
        console.error('Invalid session data')
        return
      }

      const order = {
        sessionId: session._id,
        userId: user?._id,
        selectedSeats: seats,
        totalSelectedSeats: tickets,
        totalPrice: totalPrice,
      }

      const data = await createOrder(order)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handlePaymentIntent = async () => {
    try {
      const amountInOre = totalPrice * 100

      const data = await createPaymentIntent(amountInOre)

      const clientSecret = data

      console.log(clientSecret)
      console.log(amountInOre)
    } catch (error) {
      console.error(error)
    }
  }

  const options = {
    clientSecret: data?.clientSecret || '',
  }

  console.log(options)

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
        <NavButton children="Back" color="light" onClick={() => navigate(-1)} />
      </div>
      <div className="checkout-details">
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
        {options && options.clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm createOrder={handleCreateOrder} />
          </Elements>
        )}
      </div>
      <div>
        <Button children="Buy" color="green" onClick={handlePaymentIntent} />
      </div>
    </div>
  )
}

export default Checkout
