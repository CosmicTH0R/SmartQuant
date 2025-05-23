import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // Reset error message
    setIsLoading(true);
    
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signin",
        { email, password },
        { withCredentials: true }
      );
      
      if (res.data.success) {
        navigate("/explore"); // Redirect to Explore page on success
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setErrorMsg("User does not exist. Please sign up.");
      } else if (err.response?.status === 400) {
        setErrorMsg("Invalid credentials. Try again.");
      } else {
        setErrorMsg("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to Google OAuth with state parameter for CSRF protection
  const handleGoogleLogin = () => {
    // Create a random state value for CSRF protection
    const state = Math.random().toString(36).substring(2);
    // Store the state in localStorage to verify when the user returns
    localStorage.setItem("oauthState", state);
    
    window.location.href = `http://localhost:5000/api/auth/google?state=${state}`;
  };

  const handleFacebookLogin = () => {
    // Create a random state value for CSRF protection
    const state = Math.random().toString(36).substring(2);
    // Store the state in localStorage to verify when the user returns
    localStorage.setItem("oauthState", state);
    
    window.location.href = `http://localhost:5000/api/auth/facebook?state=${state}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black transition-colors">
      <div className="rounded-3xl shadow-xl p-8 w-[90%] max-w-md backdrop-blur-md bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black transition-colors">
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow mb-4">
            <span className="text-2xl">🔐</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Sign in with email
          </h2>
          <p className="text-gray-500 dark:text-gray-300 text-sm text-center mt-2">
            Unlock your smart insights.
          </p>
        </div>

        {/* Sign-in Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSignIn}>
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
            <FiMail className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-white"
              required
            />
          </div>

          <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg relative">
            <FiLock className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-sm pr-8 text-gray-800 dark:text-white"
              required
            />
            <button
              type="button"
              className="absolute right-3 text-gray-500 dark:text-gray-300"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          <div className="flex justify-end">
            <button
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              type="button"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Sign-in with Social Media */}
        <div className="mt-6 flex items-center justify-center text-gray-400 dark:text-gray-300 text-sm">
          <div className="border-t w-1/4 border-gray-300 dark:border-gray-600" />
          <span className="mx-2">or sign in with</span>
          <div className="border-t w-1/4 border-gray-300 dark:border-gray-600" />
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={handleGoogleLogin}
            className="bg-white dark:bg-gray-100 p-2 rounded-full shadow hover:scale-105 transition"
          >
            <FcGoogle size={22} />
          </button>
          <button
            onClick={handleFacebookLogin}
            className="bg-blue-600 text-white p-2 rounded-full shadow hover:scale-105 transition"
          >
            <FaFacebookF size={20} />
          </button>
          <button 
            className="bg-black text-white p-2 rounded-full shadow hover:scale-105 transition"
            onClick={() => setErrorMsg("Apple sign in is not available yet")}
          >
            <FaApple size={22} />
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;