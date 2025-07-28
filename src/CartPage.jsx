// src/CartPage.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const cards = [
  { id: "hi",      name: "Hi Card",     image: "/images/Gold.png",       price: 5, description: "Make a bold introduction at any event." },
  { id: "hello",   name: "Hello Card",  image: "/images/Purple.png",     price: 6, description: "Say hello in style with seamless NFC sharing." },
  { id: "honored", name: "Honored Card",image: "/images/OliveGreen.png", price: 7, description: "Show gratitude with a premium greeting." },
];

export default function CardCarouselWithSummary() {
  const location = useLocation();
  // Pull the desired cardId out of state
  const requestedId = location.state?.cardId;

  // Find its index (or default to 0)
  const defaultIdx = cards.findIndex(c => c.id === requestedId);
  const [idx, setIdx] = useState(defaultIdx >= 0 ? defaultIdx : 0);

  const [quantity, setQuantity] = useState(1);
  const [promo, setPromo]       = useState("");
  const selected = cards[idx];

  const prev = () => setIdx(i => (i - 1 + cards.length) % cards.length);
  const next = () => setIdx(i => (i + 1) % cards.length);

  // Pricing
  const taxRate    = 0.10;
  const discountPct= promo.toLowerCase() === "save10" ? 0.10 : 0;
  const subtotal   = selected.price * quantity;
  const discount   = subtotal * discountPct;
  const tax        = (subtotal - discount) * taxRate;
  const total      = subtotal - discount + tax;

  // Carousel slot logic (unchanged)
  const getPos = i => {
    const d = (i - idx + cards.length) % cards.length;
    if (d === 0)                return "center";
    if (d === 1)                return "right";
    if (d === cards.length - 1) return "left";
    return "hidden";
  };
  const slots = {
    left:   { y: 40,  z:100, opacity:0.2, scale:1, zIndex:1 },
    center: { y: 0,   z:200, opacity:1,   scale:1, zIndex:2 },
    right:  { y:-40,  z:100, opacity:0.2, scale:1, zIndex:1 },
    hidden: { opacity:0,    scale:1,        zIndex:0 },
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 flex flex-col lg:flex-row items-start justify-center gap-8">
      {/* Carousel + Description */}
      <div className="flex-1 flex flex-col items-center w-full max-w-lg">
        <div
          className="relative w-full h-[60vh] max-h-[500px] flex items-center justify-center overflow-visible mb-6"
          style={{ perspective: 800 }}
        >
          {/* Left Arrow */}
          <button onClick={prev}
            className="z-20 p-2 bg-zinc-800/60 rounded-full hover:bg-zinc-900 text-white mr-4">
            <ChevronLeftIcon size={24} />
          </button>

          {/* Cards Container */}
          <div className="relative w-2/3 h-full">
            {cards.map((card,i) => {
              const pos = getPos(i), cfg = slots[pos];
              return (
                <AnimatePresence key={card.id}>
                  {pos !== "hidden" && (
                    <motion.div
                      initial={{ opacity:0 }}
                      animate={{
                        opacity: cfg.opacity,
                        transform: `rotateY(${cfg.y}deg) translateZ(${cfg.z}px)`
                      }}
                      exit={{ opacity:0 }}
                      transition={{ duration:0.5, ease:"easeInOut" }}
                      style={{ zIndex: cfg.zIndex }}
                      className="
                        absolute inset-0 m-auto
                        w-[2.5in] h-[5.25in]
                        bg-transparent rounded-xl
                        flex items-center justify-center
                        cursor-pointer
                      "
                      onClick={() => pos==="center" && setIdx(i)}
                    >
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button onClick={next}
            className="z-20 p-2 bg-zinc-800/60 rounded-full hover:bg-zinc-900 text-white ml-4">
            <ChevronRightIcon size={24} />
          </button>
        </div>

        {/* Description */}
        <p className="mt-2 text-center text-gray-300 w-2/3 truncate">
          {selected.description}
        </p>
      </div>

      {/* Order Summary */}
      <aside className="w-full lg:w-1/4 bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow-lg sticky top-20">
        <h3 className="text-l font-bold text-center mb-4">Order Summary</h3>
        <div className="flex justify-between"><span>Item:</span><span>{selected.name}</span></div>
        <div className="flex justify-between"><span>Price:</span><span>${selected.price.toFixed(2)}</span></div>
        <div className="flex justify-between items-center my-2">
          <span>Qty:</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setQuantity(q => Math.max(1,q-1))} className="px-2 py-1 bg-zinc-700 rounded hover:bg-orange-600">–</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q+1)} className="px-2 py-1 bg-zinc-700 rounded hover:bg-orange-600">+</button>
          </div>
        </div>
        <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
        {discountPct > 0 && <div className="flex justify-between text-green-400"><span>Discount:</span><span>-${discount.toFixed(2)}</span></div>}
        <div className="flex justify-between"><span>Tax:</span><span>${tax.toFixed(2)}</span></div>
        <hr className="my-2 border-gray-500" />
        <div className="flex justify-between font-bold"><span>Total:</span><span>${total.toFixed(2)}</span></div>
        <input
          value={promo}
          onChange={e => setPromo(e.target.value)}
          placeholder="Promo code"
          className="w-full mt-4 px-3 py-2 bg-zinc-800 rounded"
        />
        <button className="w-full mt-3 py-2 bg-orange-500 text-black rounded hover:bg-orange-600 font-semibold">
          Checkout
        </button>
      </aside>
    </main>
  );
}
