// src/HomePage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { cards } from "./data/cards"; // hi / hello / honored

export default function HomePage() {
  const navigate = useNavigate();

  // carousel constants (unchanged)
  const CARD_WIDTH = 300 + 16;
  const groupWidth = CARD_WIDTH * cards.length;
  const loopCards = [...cards, ...cards];

  // helper: navigate to CartPage with selected cardId
  const goToCart = cardId => {
    navigate("/cart", { state: { cardId } });
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* IMAGE CAROUSEL */}
      {/* <div className="mt-24 mb-12 flex justify-center">
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
      </div> */}

      {/* HERO TEXT */}
      <section className="px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Simple and <span className="text-gray-400">transparent</span> business transactions
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-gray-300">
          Step into our innovation oasis, where groundbreaking ideas bloom, and every click is a step into a world of endless possibilities.
        </p>
      </section>

      {/* IMAGE CAROUSEL */}
      {/* <div className="mt-24 mb-12 flex justify-center">
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
      </div> */}

      {/* ABOUT SECTION */}
      <section className="mt-16 px-6">
        {/* <h2 className="text-3xl font-bold text-center mb-8">
          Auraa Cards – Unlock Your Digital Aura
        </h2> */}
        <div className="flex flex-col gap-12 md:grid md:grid-cols-3 md:gap-8">
          {/* Essential */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl flex flex-col items-center">
            <img
              src="/images/yellow-card.png"
              alt="Auraa Essential"
              className="w-32 h-auto mb-4 object-contain"
            />
            <h3 className="text-xl font-semibold mb-2">
              The Foundation of Connection
            </h3>
            <p className="text-gray-300 mb-4 text-center">
              Start building your digital presence with a simple tap. The Auraa Essential card is your gateway to instant networking…
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-200 mb-6">
              <li>One‑Tap Contact Sharing</li>
              <li>Dynamic Profile Link</li>
              <li>Direct to Contacts</li>
              <li>No App Required</li>
              <li>Basic Analytics</li>
            </ul>
            <button
              onClick={() => goToCart("hi")}
              className="mt-auto px-6 py-2 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-600 transition"
            >
              Get Essential
            </button>
          </div>

          {/* Pro */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl flex flex-col items-center">
            <img
              src="/images/purple-card.png"
              alt="Auraa Pro"
              className="w-32 h-auto mb-4 object-contain"
            />
            <h3 className="text-xl font-semibold mb-2">
              Your Professional Networking Hub
            </h3>
            <p className="text-gray-300 mb-4 text-center">
              Elevate your networking with the ultimate digital business card. Auraa Pro goes beyond basic contact sharing…
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-200 mb-6">
              <li>All Features of Essential</li>
              <li>Comprehensive Profile Page</li>
              <li>Call to Action Buttons</li>
              <li>Integrated Lead Capture</li>
              <li>Advanced Analytics</li>
              <li>Custom Design Options</li>
            </ul>
            <button
              onClick={() => goToCart("hello")}
              className="mt-auto px-6 py-2 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-600 transition"
            >
              Get Pro
            </button>
          </div>

          {/* Infinite */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl flex flex-col items-center">
            <img
              src="/images/green-card.png"
              alt="Auraa Infinite"
              className="w-32 h-auto mb-4 object-contain"
            />
            <h3 className="text-xl font-semibold mb-2">
              The Enterprise Solution for Limitless Connections
            </h3>
            <p className="text-gray-300 mb-4 text-center">
              Power your entire organization with a unified, smart networking platform. Auraa Infinite is designed for teams…
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-200 mb-6">
              <li>All Features of Pro</li>
              <li>Team Management Dashboard</li>
              <li>Branded Experience</li>
              <li>Seamless CRM Integration</li>
              <li>Enterprise‑Grade Security</li>
              <li>Advanced Reporting & API Access</li>
            </ul>
            <button
              onClick={() => goToCart("honored")}
              className="mt-auto px-6 py-2 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-600 transition"
            >
              Get Infinite
            </button>
          </div>
        </div>
      </section>

      {/* FLASHY LOGIN & SIGNUP */}
      <section className="mt-16 mb-16 flex flex-col items-center gap-4 px-6">
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
