import { Request, Response } from 'express'
import UserModel from '../models/user.model'

interface AuthenticatedRequest extends Request {
  user?: any
}

const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, location } = req.body

    const existingUser = await UserModel.findOne({ email })

    if (existingUser) {
      return res.status(404).json({ message: 'Email already exists!' })
    }

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      location,
    })

    res.status(201).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not register user' })
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })

    if (user) {
      user.comparePassword(
        password,
        function (matchError: Error | null, isMatch?: boolean) {
          if (matchError) {
            return res
              .status(404)
              .json({ message: 'Server error while comparing password' })
          }

          if (!isMatch) {
            return res
              .status(404)
              .json({ message: 'Incorrect email or password' })
          }

          const token = user.generateAuthToken()
          console.log(token)

          res
            .status(200)
            .json({ message: 'Logged in successfully', user, token })
        },
      )
    } else {
      res.status(404).json({ message: 'Incorrect email or password' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not login' })
  }
}

const logoutUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'You logged out successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not logout' })
  }
}

const currentUser = async (req: AuthenticatedRequest, res: Response) => {
  res.json(req.user)
}

export { registerUser, loginUser, logoutUser, currentUser }
