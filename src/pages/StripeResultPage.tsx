import { useSearchParams } from 'react-router-dom'

export function Success() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  
  return (
    <div>
      <h1>✅ Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <p>Session ID: {sessionId}</p>
    </div>
  )
}


export function Cancel() {
  return (
    <div>
      <h1>❌ Payment Cancelled</h1>
      <p>Your payment was cancelled. No charges were made.</p>
      <a href="/">Go back home</a>
    </div>
  )
}


// Step 12: Test with Stripe Test Card
// When you click the payment button and reach Stripe Checkout, use:

// Card number: 4242 4242 4242 4242
// Expiry: Any future date (e.g., 12/25)
// CVC: Any 3 digits (e.g., 123)
// ZIP: Any 5 digits (e.g., 12345)


// ✅ You're Done!
// What happens when user pays:

// User clicks button → handleCheckout() runs
// Creates Stripe checkout session → Redirects to Stripe
// User enters card details → Completes payment
// Stripe sends webhook to your function → Saves payment to Supabase
// User redirected to /success page

// To view payments: Supabase Dashboard → Table Editor → payments table