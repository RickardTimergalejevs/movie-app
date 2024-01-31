import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import './PaymentForm.scss'

type Props = {
  createOrder: () => void
}

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
        return_url: 'http://localhost:5173/confirmation',
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
      <button className="payment-form__btn" disabled={!stripe}>
        Betala köp
      </button>
    </form>
  )
}

export default PaymentForm
