import { Request, Response } from 'express'
import { initStripe } from '../utils/stripe'

const stripe = initStripe()

const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'sek',
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error })
  }
}

export { createPaymentIntent }
