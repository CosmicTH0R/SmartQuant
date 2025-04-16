import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

// Pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Explore from "./pages/Explore";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
// import Profile from "./pages/Profile"; // <-- your Profile component
import HowItWorks from "./pages/HowitWorks";
import GetStarted from "./pages/GetStarted";
import StockDetail from "./pages/StockDetail";
import ResetPasswordForm from "./components/ResetPasswordForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Cart from "./pages/Cart";
import MyAccount from "./pages/MyAccount";
import CoustomerSupport from "./pages/CoustomerSupport";
import Reports from "./pages/Reports";

// ErrorBoundary Component
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="bg-white text-black dark:bg-zinc-900 dark:text-white min-h-screen transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/stocks/:symbol" element={<StockDetail />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/support" element={<CoustomerSupport />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
