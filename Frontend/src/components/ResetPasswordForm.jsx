import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPasswordForm = () => {
  const { token } = useParams();
  // console.log("Reset token from URL:", token);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Disable paste functionality
  const handlePaste = (e) => {
    e.preventDefault(); // Prevent paste
    toast.error("Please confirm the password manually.");
  };

  const handleResetPassword = async () => {
    // Check if fields are empty
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Optional: Add password validation (e.g., min length)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 chars, with one letter and one number
    if (!passwordRegex.test(newPassword)) {
      toast.error("Password must be at least 8 characters, including a letter and a number.");
      return;
    }

    try {
      // API call to reset the password
      const response = await fetch(`/api/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Password reset successfully!");
        setTimeout(() => {
          window.location.href = "/signin"; // Redirect to Sign In page
        }, 2000);
      } else {
        toast.error(data.message || "Reset failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const renderPasswordInput = (label, value, onChange, show, setShow, extraProps = {}) => (
    <div className="relative mb-4">
      <input
        type={show ? "text" : "password"}
        placeholder={label}
        value={value}
        onChange={onChange}
        onPaste={handlePaste} // Prevent pasting in this field
        {...extraProps}
        className="w-full p-3 pr-10 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-black dark:hover:text-white"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <motion.h2
          className="text-2xl font-bold mb-4 text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          🔒 Set New Password
        </motion.h2>

        {renderPasswordInput(
          "New Password",
          newPassword,
          (e) => setNewPassword(e.target.value),
          showNewPass,
          setShowNewPass
        )}

        {renderPasswordInput(
          "Confirm Password",
          confirmPassword,
          (e) => setConfirmPassword(e.target.value),
          showConfirmPass,
          setShowConfirmPass
        )}

        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          ✅ Reset Password
        </button>
      </motion.div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default ResetPasswordForm;
