import Stripe from 'stripe'

const initStripe = (): Stripe => {
  return new Stripe(
    'sk_test_51No0MbDTXgg9R4l7mkFxUDuTQPXfCBg3BAxk3rHQAnKVutbNw7rDoEhfLdyFV34gueBkPSIvNffNfwxGd39Ss8um009CbdPsLo',
  )
}

export { initStripe }
