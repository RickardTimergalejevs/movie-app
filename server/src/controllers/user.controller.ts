import { Request, Response } from 'express'
import UserModel from '../models/user.model'

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = {
      firstName: 'Rick',
      lastName: 'Tim',
      email: 'test@gmail.com',
      password: 'gwqgqw',
      location: 'Stockholm',
    }

    const createdUser = await UserModel.create(user)

    res.status(200).json(createdUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not create user' })
  }
}

export { registerUser }
