import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  sessionId: string | null
  userId: string | null
  selectedSeats: string[] | []
  totalSelectedSeats: number
  totalPrice: number
}

const initialState: InitialState = {
  sessionId: null,
  userId: null,
  selectedSeats: [],
  totalSelectedSeats: 0,
  totalPrice: 0,
}

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {},
})

export const {} = orderSlice.actions

export default orderSlice.reducer
