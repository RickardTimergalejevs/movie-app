import { Router } from 'express'
import { createPaymentIntent } from '../controllers/checkout.controller'

const checkoutRouter = Router().post(
  '/checkout/create-payment-intent',
  createPaymentIntent,
)

export default checkoutRouter
