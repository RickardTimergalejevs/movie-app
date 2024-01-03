import { Schema, model, models, Types } from 'mongoose'

export interface ISession {
  movieId: string
  city: string
  hall: Types.ObjectId
  showDate: string
  showTime: string
  displayType: '2D' | '3D' | 'IMAX'
}

export const sessionSchema = new Schema<ISession>({
  movieId: { type: String, required: true },
  city: { type: String, required: true },
  hall: { type: Schema.Types.ObjectId, ref: 'Hall', required: true },
  showDate: { type: String, required: true },
  showTime: { type: String, required: true },
  displayType: { type: String, enum: ['2D', '3D', 'IMAX'], required: true },
})

const SessionModel = models.session || model<ISession>('Session', sessionSchema)

export default SessionModel
