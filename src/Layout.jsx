// src/Layout.jsx
import React from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: isProfilePage ? 'none' : "url('/images/home-background5.png')",
        backgroundColor: isProfilePage ? '#1A1A2E' : undefined
      }}
    >
      {/* Conditionally render the Navbar */}
      {!isProfilePage && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={isProfilePage ? "pt-0" : "pt-20 px-4"}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Conditionally render the Footer */}
      {!isProfilePage && (
        <footer className="bg-black text-gray-400 py-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Auraa Cards. All rights reserved.</p>
          <p>123 Innovation Street, Phoenix, AZ • contact@cardplay.com</p>
        </footer>
      )}
    </div>
  );
}