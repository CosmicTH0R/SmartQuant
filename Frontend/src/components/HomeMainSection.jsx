// components/HomeMainSection.jsx
import React from "react";
import { FaCheckCircle, FaCreditCard } from "react-icons/fa";
import StockCarousel from "./StockCarousel";
import { Link } from 'react-router-dom';

const HomeMainSection = () => {
  return ( 
    <div className="min-h-screen px-6 py-16 md:px-20 flex flex-col gap-20 transition-colors duration-300 bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black text-gray-900 dark:text-white">
      {/* Top Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Left Text */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            "SmartQuant <br /> Predict the Market, <br /> Perfect Your Move."
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mt-6">
            We help you invest your money smartly by predicting stock prices.
            Just follow the steps, and you’ll be on your way to making better
            investment decisions with ease.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition">
              Get Started
            </button>
            <Link to="/how-it-works">
              <button className="text-gray-900 dark:text-white hover:underline font-medium flex items-center gap-2">
                How It Works <span className="text-green-400">→</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Right Card (Carousel Section) */}
        <div className="relative w-full max-w-sm flex justify-center items-center">
          <StockCarousel />
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">We Provide Quality Service</h2>
        <p className="text-gray-700 dark:text-gray-300">
          We will provide the best service to you so that you understand how to
          use and get to know the features that we provide
        </p>
      </div>
    </div>
  );
};

export default HomeMainSection;
