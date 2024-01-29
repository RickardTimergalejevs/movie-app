export interface IOrder {
  _id: string
  sessionId: string
  userId: string
  selectedSeats: string[]
  totalSelectedSeats: number
  totalPrice: number
}
