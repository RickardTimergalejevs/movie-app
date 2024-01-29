import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import './PaymentForm.scss'
import Button from '../common/Button/Button'

type Props = {
  createOrder: () => void
}

const PaymentForm = ({ createOrder }: Props) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: React.FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    createOrder()

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/confirmation',
      },
    })

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <PaymentElement />
      <Button children={'Submit'} disabled={!stripe} color="green" />
    </form>
  )
}

export default PaymentForm
