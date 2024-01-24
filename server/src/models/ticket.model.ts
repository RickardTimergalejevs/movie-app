import { Schema, model, models } from 'mongoose'

export interface ITicket {
  price: number
  type: 'standard' | 'student' | 'pensioner'
}

export const ticketSchema = new Schema<ITicket>({
  price: { type: Number, required: true },
  type: {
    type: String,
    enum: ['standard', 'student', 'pensioner'],
    required: true,
  },
})

const TicketModel = models.ticket || model<ITicket>('ticket', ticketSchema)

export default TicketModel
