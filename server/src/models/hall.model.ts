import { Schema, model, models } from 'mongoose'

interface ISeat {
  seat: string
  isBooked: boolean
}

interface IRow {
  row: string
  seats: ISeat[]
}

export interface IHall {
  name: string
  capacity: number
  rows: IRow[]
}

const seatSchema = new Schema<ISeat>({
  seat: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
})

const rowSchema = new Schema<IRow>({
  row: { type: String, required: true },
  seats: [seatSchema],
})

export const hallSchema = new Schema<IHall>({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  rows: [rowSchema],
})

const HallModel = models.hall || model<IHall>('Hall', hallSchema)

export default HallModel
