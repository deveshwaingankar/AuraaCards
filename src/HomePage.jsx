// src/pages/HomePage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { cards } from "./data/cards";

export default function HomePage() {
  const navigate = useNavigate();
  // constants for carousel
  const CARD_WIDTH = 300 + 16;       // px: card width + gap
  const groupWidth = CARD_WIDTH * cards.length;
  // duplicate cards array so loop is seamless
  const loopCards = [...cards, ...cards];

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* IMAGE CAROUSEL */}
      <div className="mt-24 mb-12 flex justify-center">
        <div className="w-full overflow-hidden max-w-4xl">
          <motion.div
            className="flex gap-4"
            style={{ width: groupWidth * 2 }}
            animate={{ x: [0, -groupWidth] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 12,
                ease: "linear",
              },
            }}
          >
            {loopCards.map((c, idx) => (
              <div
                key={`${c.id}-${idx}`}
                className="flex-shrink-0 w-[300px] h-[180px] bg-transparent rounded-xl flex items-center justify-center"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* HERO TEXT */}
      <section className="px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          The Foundation <span className="text-gray-400">of Connection</span>{" "}
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-gray-300">
          Start building your digital presence with a simple tap. 
          The Auraa Essential card is your gateway to instant networking, perfect for individuals and small businesses who want to share contact information effortlessly and professionally. 
          It's the simplest way to make a lasting first impression.
        </p>
      </section>

      {/* FLASHY LOGIN BUTTON */}
      <section className="mt-10 mb-16 flex justify-center px-6">
        <motion.button
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            bg-gradient-to-r from-orange-500 to-yellow-400
            text-black font-semibold
            px-8 py-4 rounded-full shadow-xl
            uppercase tracking-wide
            hover:from-yellow-400 hover:to-orange-500
            transition
          "
        >
          Member Login
        </motion.button>

        {/* Free Signup */}
        <motion.button
          onClick={() => navigate("/signup")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="
            text-orange-400 border border-orange-400
            px-6 py-2 rounded-full text-sm font-medium
            uppercase tracking-wide
            hover:bg-orange-500 hover:text-black
            transition
          "
        >
          Free Signup
        </motion.button>        
      </section>
    </div>
  );
}
