// src/pages/CheckoutPage.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

// publishable key from .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ card }) {
  const stripe   = useStripe();
  const elements = useElements();

  const [data, setData]   = useState({ email:"", address:"", shipping:"standard" });
  const [phase, setPhase] = useState("form");   // form | creating | processing | success | error

  const shippingCents = data.shipping==="express" ? 500 : 0;
  const totalCents    = 500 + shippingCents;

  const change = e => setData(d => ({ ...d, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setPhase("creating");

    const res  = await fetch("/.netlify/functions/stripeCreateIntent", {
      method: "POST",
      body: JSON.stringify({ amount: totalCents })
    });
    const { clientSecret } = await res.json();
    setPhase("processing");

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { email: data.email }
      }
    });

    setPhase(error ? "error" : "success");
  };

  if (phase==="creating"||phase==="processing") {
    return <p className="text-white p-8">Processing payment…</p>;
  }

  if (phase==="success") {
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="max-w-lg mx-auto p-8 bg-white/10 backdrop-blur rounded-xl text-center"
      >
        <h2 className="text-3xl font-bold text-green-300 mb-4">🎉 Payment Successful!</h2>
        <img
          src={card.image}
          alt="Purchased card"
          className="mx-auto mb-6 max-w-[300px] h-[65vh] object-contain drop-shadow-2xl"
        />
        <p>Thank you! Your card is now sealed in our system.</p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-orange-500 text-black rounded-xl hover:bg-orange-600 transition"
        >
          Return Home
        </a>
      </motion.div>
    );
  }

  if (phase==="error") {
    return <p className="text-red-400 p-8 text-center">❌ Payment failed. Try again later.</p>;
  }

  // —   Form phase   —
  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto p-6 bg-white/10 backdrop-blur rounded-xl space-y-4 text-white"
    >
      <h2 className="text-2xl font-bold text-center">Finish Payment</h2>

      <input
        name="email"
        type="email"
        value={data.email}
        onChange={change}
        placeholder="Email"
        required
        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded focus:ring-2 focus:ring-orange-400"
      />

      <textarea
        name="address"
        rows={2}
        value={data.address}
        onChange={change}
        placeholder="Shipping Address"
        required
        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded focus:ring-2 focus:ring-orange-400"
      />

      <select
        name="shipping"
        value={data.shipping}
        onChange={change}
        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded focus:ring-2 focus:ring-orange-400"
      >
        <option value="standard">Standard (Free)</option>
        <option value="express">Express (+$5)</option>
      </select>

      <div className="p-3 bg-white rounded">
        <CardElement options={{ style: { base: { color: "#000" } } }} />
      </div>

      <button
        disabled={!stripe}
        className="w-full py-3 bg-orange-500 text-black font-bold rounded-xl hover:bg-orange-600 transition"
      >
        Pay ${(totalCents / 100).toFixed(2)}
      </button>
    </motion.form>
  );
}

export default function CheckoutPage() {
  const { state } = useLocation();            // receives { card }
  const card = state?.card ?? { image: "/images/yellow-card.png" };

  return (
    <main className="min-h-screen pt-24 px-4 flex flex-col items-center bg-gradient-to-b from-black via-zinc-900 to-black">
      <Navbar />
      <Elements stripe={stripePromise}>
        <CheckoutForm card={card} />
      </Elements>
    </main>
  );
}
