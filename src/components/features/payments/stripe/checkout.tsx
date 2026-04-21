"use client";

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { stripePromise } from "./stripe";

type CheckoutFormProps = {
  clientSecret?: string | null;
  onSuccess?: () => void;
};

function CheckoutForm({ clientSecret, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    if (clientSecret) {
      // Teammate: use confirmCardPayment when clientSecret is provided
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (error) {
        console.error('Payment failed:', error.message);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        console.log('Payment succeeded!');
        onSuccess?.();
      }
    } else {
      // Fallback: create token (dev/test only)
      const result = await stripe.createToken(card);
      console.log('Token result:', result);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border rounded-xl p-4 bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        Pay Now
      </button>

      <p className="text-xs text-center text-gray-400">
        Secured by Stripe · Your card info is never stored on our servers.
      </p>
    </form>
  );
}

type CheckoutPageProps = {
  clientSecret?: string | null;
  onSuccess?: () => void;
};

export default function CheckoutPage({ clientSecret, onSuccess }: CheckoutPageProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm clientSecret={clientSecret} onSuccess={onSuccess} />
    </Elements>
  );
}
