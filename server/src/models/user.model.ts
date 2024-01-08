import { Schema, model, models } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
  location: string
  comparePassword: (
    password: string,
    callback: (error: Error | null, isMatch?: boolean) => void,
  ) => void
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
})

userSchema.pre('save', function (next) {
  const user = this

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

userSchema.methods.comparePassword = function (
  this: IUser,
  password: string,
  callback: (error: Error | null, isMatch?: boolean) => void,
) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error)
    } else {
      callback(null, isMatch)
    }
  })
}

const UserModel = models.user || model<IUser>('User', userSchema)

export default UserModel
