import { Schema, model, models, Types } from 'mongoose'

export interface ISeat {
  seat: string
  isBooked: boolean
}

export interface IRow {
  row: string
  seats: ISeat[]
}

export interface IHall {
  name: string
  capacity: number
  rows: IRow[]
}

export interface ISession {
  movieId: number
  city: string
  hall: IHall
  showDate: string
  showTime: string
  displayType: '2D' | '3D' | 'IMAX'
  tickets: Types.ObjectId[]
}

const seatSchema = new Schema<ISeat>({
  seat: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
})

const rowSchema = new Schema<IRow>({
  row: { type: String, required: true },
  seats: [seatSchema],
})

const hallSchema = new Schema<IHall>({
  name: { type: String, default: 'Stockholm Hall Basic', required: true },
  capacity: { type: Number, required: true },
  rows: [rowSchema],
})

export const sessionSchema = new Schema<ISession>({
  movieId: { type: Number, required: true },
  city: { type: String, required: true },
  hall: hallSchema,
  showDate: { type: String, required: true },
  showTime: { type: String, required: true },
  displayType: { type: String, enum: ['2D', '3D', 'IMAX'], required: true },
  tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket', required: true }],
})

const SessionModel = models.session || model<ISession>('Session', sessionSchema)

export default SessionModel
