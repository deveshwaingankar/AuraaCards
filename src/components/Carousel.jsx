// src/pages/CardCarouselWithSummary.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const cards = [
  {
    id: "hi",
    name: "Hi Card",
    image: "/images/yellow-card.png",
    price: 5,
    description: "Make a bold introduction at any event."
  },
  {
    id: "hello",
    name: "Hello Card",
    image: "/images/purple-card.png",
    price: 6,
    description: "Say hello in style with seamless NFC sharing."
  },
  {
    id: "honored",
    name: "Honored Card",
    image: "/images/green-card.png",
    price: 7,
    description: "Show gratitude with a premium greeting."
  },
];

export default function CardCarouselWithSummary() {
  const [idx, setIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [promo, setPromo] = useState("");

  const selected = cards[idx];

  const prev = () => setIdx(i => (i - 1 + cards.length) % cards.length);
  const next = () => setIdx(i => (i + 1) % cards.length);

  const taxRate = 0.10;
  const discountPct = promo.toLowerCase() === "save10" ? 0.10 : 0;
  const subtotal = selected.price * quantity;
  const discount = subtotal * discountPct;
  const tax = (subtotal - discount) * taxRate;
  const total = subtotal - discount + tax;

  // 3D positions
  const getPos = i => {
    const d = (i - idx + cards.length) % cards.length;
    if (d === 0) return "center";
    if (d === 1) return "right";
    if (d === cards.length - 1) return "left";
    return "hidden";
  };
  const v = {
    left:   { y: 45,  z: 100, opacity: 0.5, scale: 0.8, zIndex: 1 },
    center: { y: 0,   z: 200, opacity: 1,   scale: 1,   zIndex: 3 },
    right:  { y: -45, z: 100, opacity: 0.5, scale: 0.8, zIndex: 1 },
    hidden: { opacity:0, scale:0.5, zIndex:0 }
  };

  return (
    <main className="min-h-screen bg-[url('/images/bg-grid.png')] bg-cover text-white p-4 flex flex-col lg:flex-row items-center justify-center gap-8">
      {/* Carousel */}
      <div className="relative w-full max-w-md h-[60vw] max-h-[400px]">
        <button onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-zinc-800/60 rounded-full hover:bg-zinc-900 z-10">
          <ChevronLeftIcon size={24} />
        </button>
        <button onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-zinc-800/60 rounded-full hover:bg-zinc-900 z-10">
          <ChevronRightIcon size={24} />
        </button>

        <div className="w-full h-full relative" style={{ perspective: 800 }}>
          {cards.map((c, i) => {
            const pos = getPos(i), cfg = v[pos];
            return (
              <AnimatePresence key={c.id}>
                {pos !== "hidden" && (
                  <motion.div
                    initial={{ opacity:0, scale:0.5 }}
                    animate={{
                      opacity: cfg.opacity,
                      scale: cfg.scale,
                      transform: `rotateY(${cfg.y}deg) translateZ(${cfg.z}px)`
                    }}
                    exit={{ opacity:0, scale:0.5 }}
                    transition={{ duration:0.5, ease:"easeInOut" }}
                    style={{ zIndex: cfg.zIndex }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                               w-2/3 sm:w-1/2 md:w-64 h-3/4 sm:h-2/3 md:h-80
                               bg-white/10 backdrop-blur rounded-xl
                               flex flex-col items-center p-4 cursor-pointer drop-shadow-lg"
                    onClick={() => pos==="center" && setIdx(i)}
                  >
                    <img src={c.image} alt={c.name}
                         className="w-full h-2/5 object-contain mb-2" />
                    <h4 className="text-lg font-semibold text-center">{c.name}</h4>
                    <p className="text-sm text-gray-300 grow text-center">{c.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-full max-w-xs bg-white/10 backdrop-blur p-5 rounded-xl shadow-xl flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-center">Order Summary</h3>

        <div className="flex justify-between">
          <span>Item:</span>
          <span>{selected.name}</span>
        </div>
        <div className="flex justify-between">
          <span>Price:</span>
          <span>${selected.price.toFixed(2)}</span>
        </div>

        {/* Quantity */}
        <div className="flex justify-between items-center">
          <span>Quantity:</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setQuantity(q => Math.max(1, q-1))}
                    className="px-2 py-1 bg-zinc-700 rounded hover:bg-orange-600">–</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q+1)}
                    className="px-2 py-1 bg-zinc-700 rounded hover:bg-orange-600">+</button>
          </div>
        </div>

        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discountPct > 0 && (
          <div className="flex justify-between text-green-400">
            <span>Discount (10%):</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Tax (10%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <input
          value={promo}
          onChange={e => setPromo(e.target.value)}
          placeholder="Promo code"
          className="px-3 py-2 rounded bg-zinc-800 text-sm placeholder-gray-400"
        />

        <button className="w-full py-2 mt-2 bg-orange-500 text-black rounded hover:bg-orange-600 font-semibold">
          Checkout
        </button>
      </div>
    </main>
  );
}
