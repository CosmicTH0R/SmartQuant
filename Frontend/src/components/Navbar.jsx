import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/ThemeSlice";
import { Moon, Sun, Search } from "lucide-react";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="from-sky-200 dark:from-gray-900 text-gray-900 dark:text-white px-6 py-3 flex items-center justify-between relative">
      {/* Logo + Icon */}
      <div className="flex items-center space-x-2">
        <img src="/favicon-32x32.png" alt="SmartQuant Logo" className="w-6 h-6 rounded-md" />
        <Link to="/" className="font-bold text-lg hover:underline">
          SmartQuant
        </Link>
      </div>

      {/* SearchBar for md+ */}
      <div className="hidden md:flex flex-1 justify-center px-6">
        <SearchBar />
      </div>

      {/* Mobile Search Toggle */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="text-gray-900 dark:text-white p-2 rounded-full"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Mobile SearchBar */}
      {isSearchOpen && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-3/4 sm:w-96 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg md:hidden">
          <SearchBar />
        </div>
      )}

      {/* Theme + Auth Buttons */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="text-gray-900 dark:text-white px-3 py-2 rounded hover:bg-white hover:text-blue-900 dark:hover:bg-gray-700 dark:hover:text-white transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <Link to="/signin">
          <button className="border border-gray-900 dark:border-white text-gray-900 dark:text-white text-sm sm:text-base rounded-full px-5 py-2 hover:bg-white hover:text-blue-900 dark:hover:bg-gray-700 transition">
            Sign In
          </button>
        </Link>

        <Link to="/signup">
          <button className="bg-white dark:bg-blue-600 text-blue-900 dark:text-white text-sm sm:text-base rounded-full px-5 py-2 font-semibold hover:bg-gray-100 dark:hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
