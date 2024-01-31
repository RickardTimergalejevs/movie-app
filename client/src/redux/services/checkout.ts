import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ICheckout {
  clientSecret: string
}

const CHECKOUT_URL = import.meta.env.VITE_CHECKOUT_URL

export const checkoutApi = createApi({
  reducerPath: 'checkoutApi',
  baseQuery: fetchBaseQuery({
    baseUrl: CHECKOUT_URL,
  }),
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<ICheckout, number>({
      query: (amount) => ({
        url: 'create-payment-intent',
        method: 'POST',
        body: { amount },
      }),
    }),
  }),
})

export const { useCreatePaymentIntentMutation } = checkoutApi
