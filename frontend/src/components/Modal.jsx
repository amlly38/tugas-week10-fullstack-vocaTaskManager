import React from "react";
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  const isSuccess = title.toLowerCase().includes("successful");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-gray-800 text-white rounded-lg shadow-xl w-96 p-6 relative"
      >
        {/* Animasi Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex justify-center mb-4"
        >
          {isSuccess ? (
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-16 h-16 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </motion.div>

        {/* Judul dan Pesan */}
        <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
        <p className="text-gray-300 text-center">{message}</p>

        {/* Tombol OK */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-semibold transition duration-300"
        >
          OK
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Modal;
