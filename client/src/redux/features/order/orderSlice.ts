import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { ISession } from '../../../interfaces/session'

interface InitialState {
  session: ISession | null
  userId: string | null
  selectedSeats: string[] | []
  totalSelectedSeats: number
  totalPrice: number
}

const initialState: InitialState = {
  session: null,
  userId: null,
  selectedSeats: [],
  totalSelectedSeats: 0,
  totalPrice: 0,
}

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    setSession: (state, action: PayloadAction<ISession>) => {
      state.session = action.payload
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload
    },
    setSelectedSeats: (state, action: PayloadAction<string[]>) => {
      state.selectedSeats = action.payload
      state.totalSelectedSeats = action.payload.length
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload
    },
  },
})

export const { setSelectedSeats, setSession, setUserId, setTotalPrice } =
  orderSlice.actions

export default orderSlice.reducer

export const selectSession = (state: RootState) => state.order.session
export const selectSeats = (state: RootState) => state.order.selectedSeats
export const selectTotalSelectedSeats = (state: RootState) =>
  state.order.totalSelectedSeats
export const selectTotalPrice = (state: RootState) => state.order.totalPrice
