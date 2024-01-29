import { Router } from 'express'
import { createOrder, getOrders } from '../controllers/order.controller'

const orderRouter = Router()
  .post('/orders', createOrder)
  .get('/orders', getOrders)

export default orderRouter
