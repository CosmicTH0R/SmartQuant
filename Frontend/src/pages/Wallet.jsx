import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar1";

const Wallet = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black flex items-center justify-center px-4 transition-colors">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 max-w-md w-full text-center transition-colors"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Want to add money on SmartQuant wallet. Worry not?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Adding the feature soon...
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Wallet;
