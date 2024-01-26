import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ICheckout {
  clientSecret: string
}

interface ICreatePaymentIntent {
  amount: number
}

export const checkoutApi = createApi({
  reducerPath: 'checkoutApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
  }),
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<ICheckout, ICreatePaymentIntent>({
      query: (amount) => ({
        url: '/create-payment-intent',
        method: 'POST',
        body: { amount },
      }),
    }),
  }),
})

export const { useCreatePaymentIntentMutation } = checkoutApi
