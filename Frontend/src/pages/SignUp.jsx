import React, { useState } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Signup successful!");
        setTimeout(() => {
          window.location.href = "/Explore";
        }, 1500);
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black transition-colors">
      <div className="rounded-3xl shadow-xl p-8 w-[90%] max-w-md backdrop-blur-md bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black transition-colors">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-2 shadow">
            <FiUser size={24} className="dark:text-white" />
          </div>
        </div>
        <h2 className="text-center text-xl font-bold text-gray-800 dark:text-white">Sign up with email</h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-1">
          Join to access your smart stock insights. It's free!
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
            <FiUser className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
            <FiMail className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg relative">
            <FiLock className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-sm pr-8 text-gray-900 dark:text-white"
            />
            <button
              type="button"
              className="absolute right-3 text-gray-500 dark:text-gray-300"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center text-gray-400 dark:text-gray-300 text-sm">
          <div className="border-t w-1/4 border-gray-300 dark:border-gray-600" />
          <span className="mx-2">or sign up with</span>
          <div className="border-t w-1/4 border-gray-300 dark:border-gray-600" />
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <button className="bg-white dark:bg-gray-100 p-2 rounded-full shadow hover:scale-105 transition">
            <FcGoogle size={22} />
          </button>
          <button className="bg-blue-600 text-white p-2 rounded-full shadow hover:scale-105 transition">
            <FaFacebookF size={20} />
          </button>
          <button className="bg-black text-white p-2 rounded-full shadow hover:scale-105 transition">
            <FaApple size={22} />
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 dark:text-blue-400 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
