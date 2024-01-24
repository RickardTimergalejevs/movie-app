import { Request, Response } from 'express'
import OrderModel from '../models/order.model'
import SessionModel from '../models/session.model'

const createOrder = async (req: Request, res: Response) => {
  try {
    const sessionId = '65b1426e098a16dae11d63d4'
    const userId = '65afa4946ddf6027d921ae33'
    const selectedSeats = ['D1', 'D2']
    const totalSelectedSeats = 1
    const totalPrice = 199

    const order = {
      sessionId: sessionId,
      userId: userId,
      selectedSeats: selectedSeats,
      totalSelectedSeats: totalSelectedSeats,
      totalPrice: totalPrice,
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

export { createOrder }
