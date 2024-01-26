import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IOrder {
  sessionId: string
  userId: string
  selectedSeats: string[]
  totalSelectedSeats: number
  totalPrice: number
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/orders/',
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<IOrder, IOrder>({
      query: (order) => ({
        url: '/',
        method: 'POST',
        body: order,
      }),
    }),
  }),
})

export const {} = ordersApi
