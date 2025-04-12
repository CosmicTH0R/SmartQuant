import React from "react";
import { Sun, Moon, Bell, Wallet, ShoppingCart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/ThemeSlice";
import ProfileDropdown from "./Profile/Dropdown";

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className="flex items-center justify-between px-6 py-3 shadow-md transition-colors duration-300 bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Logo + Nav Links */}
      <div className="flex items-center gap-2">
        <div className="bg-gradient-to-tr from-blue-500 to-green-400 w-8 h-8 rounded-full text-center text-xl text-fuchsia-600 flex items-center justify-center">
          Sq
        </div>
        <span className="text-xl font-semibold">SmartQuant</span>
        <nav className="ml-6 flex gap-4">
          <Link to="/explore" className="hover:text-blue-400">
            Explore
          </Link>
          <Link to="/dashboard" className="hover:text-blue-400 font-semibold">
            Dashboard
          </Link>
        </nav>
      </div>

      {/* Search */}
      <div className="flex items-center px-4 py-1 rounded-md w-96 bg-gray-100 dark:bg-neutral-800 text-black dark:text-white">
        <Search size={18} className="mr-2 text-gray-400" />
        <input
          type="text"
          placeholder="Search SmartQuant..."
          className="bg-transparent focus:outline-none w-full"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4">
        <button onClick={() => dispatch(toggleTheme())}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Bell size={20} className="hover:text-blue-400" />
        <Link to="/wallet" className="hover:text-blue-400">
          <Wallet size={20} />
        </Link>
        <ShoppingCart size={20} className="hover:text-blue-400" />
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Navbar;
