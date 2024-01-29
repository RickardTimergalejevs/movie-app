import { Request, Response } from 'express'
import TicketModel from '../models/ticket.model'

const createTicket = async (req: Request, res: Response) => {
  try {
    const ticket = {
      price: 199,
      type: 'standard',
    }

    const createdTicket = await TicketModel.create(ticket)

    res.status(201).json(createdTicket)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not create ticket' })
  }
}

export { createTicket }
