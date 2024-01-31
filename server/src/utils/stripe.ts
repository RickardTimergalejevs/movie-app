import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const initStripe = (): Stripe => {
  return new Stripe(process.env.STRIPE_SECRET_KEY || '')
}

export { initStripe }
