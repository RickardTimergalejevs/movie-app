import { Router } from 'express'
import { createTicket } from '../controllers/ticket.controller'

const ticketRouter = Router().post('/tickets', createTicket)

export default ticketRouter
