import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import './PaymentForm.scss'
import Button from '../common/Button/Button'

type Props = {
  createOrder: () => void
}

const SUCCESS_CONFRIM_PAYMENT_URL = import.meta.env.SUCCESS_CONFRIM_PAYMENT_URL

const PaymentForm = ({ createOrder }: Props) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    createOrder()

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: SUCCESS_CONFRIM_PAYMENT_URL,
      },
    })

    if (result.error) {
      console.log(result.error.message)
    }
  }

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h1>Dina uppgifter</h1>
      <PaymentElement />
      <Button children={'Betala köp'} disabled={!stripe} color="green" />
    </form>
  )
}

export default PaymentForm
