import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../redux/features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setUserId } from '../../redux/features/order/orderSlice'

const Checkout = () => {
  const dispatch = useDispatch()

  const user = useSelector(selectCurrentUser)

  useEffect(() => {
    if (user && user._id) {
      dispatch(setUserId(user._id))
    }
  }, [user, dispatch])

  return <div>Checkout</div>
}

export default Checkout
