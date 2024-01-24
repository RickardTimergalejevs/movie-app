import { Schema, model, models, Types } from 'mongoose'

export interface IOrder {
  sessionId: Types.ObjectId
  userId: Types.ObjectId
  selectedSeats: string[]
  totalSelectedSeats: number
  totalPrice: number
}

export const orderSchema = new Schema<IOrder>({
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  selectedSeats: [{ type: String, required: true }],
  totalSelectedSeats: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
})

const OrderModel = models.session || model<IOrder>('Order', orderSchema)

export default OrderModel
