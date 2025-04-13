import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion"; // Add framer-motion for animation

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Make API call to check if email exists in database
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });    

      const data = await response.json();

      if (response.status === 404) {
        toast.error(data.message); // Email doesn't exist
      } else if (response.status === 200) {
        toast.success(data.message); // Reset link sent successfully
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h5 className="text-2xl font-bold mb-4 text-center">An email will be sent with reset password link</h5>

        {/* Email input with icon */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-12 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Request Reset Link
        </motion.button>
      </motion.div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ForgotPasswordForm;
