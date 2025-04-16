import React, { useState } from "react";
import { Sun, Moon, Bell, Wallet, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/ThemeSlice";
import { NavLink } from "react-router-dom";
import ProfileDropdown from "./Profile/Dropdown";
import SearchBar from "./SearchBar";
import NotificationDropdown from "./NotificationDropdown";

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-6 py-3 shadow-md transition-colors duration-300 bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Logo + Nav Links */}
      <div className="flex items-center gap-2">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/favicon-32x32.png"
            alt="SmartQuant Logo"
            className="w-6 h-6 rounded-md"
          />
          <span>SmartQuant</span>
        </div>

        <nav className="ml-6 flex gap-4">
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "hover:text-blue-400"
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "hover:text-blue-400"
            }
          >
            Dashboard
          </NavLink>
        </nav>
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

      {/* Icons */}
      <div className="flex items-center gap-4">
        <button onClick={() => dispatch(toggleTheme())}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <NotificationDropdown />

        <Link to="/wallet" className="hover:text-blue-400">
          <Wallet size={20} />
        </Link>
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Navbar;
