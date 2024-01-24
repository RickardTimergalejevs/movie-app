import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

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
  reducers: {
    setSelectedSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload
    },
    setSelectedSeats: (state, action: PayloadAction<string[]>) => {
      state.selectedSeats = action.payload
      state.totalSelectedSeats = action.payload.length
    },
  },
})

export const { setSelectedSeats, setSelectedSessionId, setUserId } =
  orderSlice.actions

export default orderSlice.reducer

export const selectSeats = (state: RootState) => state.order.selectedSeats
