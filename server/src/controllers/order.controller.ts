import { Request, Response } from 'express'
import OrderModel from '../models/order.model'
import SessionModel, { ISession } from '../models/session.model'

const createOrder = async (req: Request, res: Response) => {
  try {
    const { sessionId, userId, selectedSeats, totalSelectedSeats, totalPrice } =
      req.body

    const order = {
      sessionId,
      userId,
      selectedSeats,
      totalSelectedSeats,
      totalPrice,
    }
    const createdOrder = await OrderModel.create(order)

    const session = await SessionModel.findById(sessionId)

    if (!session || !session.hall || !session.hall.rows) {
      console.error('Invalid session data')
      return
    }

    session.hall.rows.forEach((row: any) => {
      row.seats.forEach((seat: any) => {
        if (selectedSeats.includes(seat.seat)) {
          seat.isBooked = true
          console.log(seat)
        }
      })
    })

    await session.save()

    res.status(201).json(createdOrder)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not create order' })
  }
}

const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const orders = await OrderModel.find({ userId: userId }).populate(
      'sessionId',
    )

    res.status(200).json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not find orders' })
  }
}

export { createOrder, getOrders }
