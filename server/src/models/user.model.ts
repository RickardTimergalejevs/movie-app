import { Schema, model, models } from 'mongoose'

export interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
  location: string
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
})

const UserModel = models.user || model<IUser>('User', userSchema)

export default UserModel
