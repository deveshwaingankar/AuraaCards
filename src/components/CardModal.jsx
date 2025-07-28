// src/components/CardModal.jsx
import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function CardModal({ cardId, onClose, onRegister }) {
  // TODO: swap with real registration‐check API
  const isRegistered = false;

  // close on ESC
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!cardId) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-11/12 max-w-sm rounded-xl bg-zinc-900 p-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-gray-300"
        >
          <X size={20} />
        </button>

        {isRegistered ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-white">Your Card</h2>
            <motion.img
              src={`/images/${cardId}.png`}
              alt=""
              className="mx-auto w-full h-auto rounded-lg"
              whileHover={{ rotateY: 10, rotateX: 5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="mt-6 w-full py-2 bg-orange-500 text-black rounded-lg font-semibold"
            >
              Show Contact
            </motion.button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2 text-white">
              Card Not Registered
            </h2>
            <p className="mb-4 text-gray-400">
              This card isn’t in our system yet. Please register below.
            </p>
            <motion.button
              onClick={onRegister}
              whileTap={{ scale: 0.96 }}
              className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold"
            >
              Register Card
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
