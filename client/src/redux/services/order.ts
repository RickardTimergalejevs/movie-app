import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IOrderListResponse {
  _id: string
  sessionId: string
  userId: string
  selectedSeats: string[]
  totalSelectedSeats: number
  totalPrice: number
}

interface ICreateOrderRequest {
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
    getOrders: builder.query<IOrderListResponse[], string>({
      query: (userId) => `${userId}`,
    }),
    createOrder: builder.mutation<ICreateOrderRequest, ICreateOrderRequest>({
      query: (order) => ({
        url: '/',
        method: 'POST',
        body: order,
      }),
    }),
  }),
})

export const { useGetOrdersQuery, useCreateOrderMutation } = ordersApi
