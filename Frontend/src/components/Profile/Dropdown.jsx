import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, ClipboardList, Headphones, FileText } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { toast } from "react-toastify";

const ProfileDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include", // Cookie bhejne ke liye
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Logout successful!");
      
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);       
      } else {
        toast.error(data.message || "Logout failed.");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown}>
        <div className="bg-teal-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold">
          I
        </div>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 text-black dark:text-white shadow-xl rounded-md py-4 px-4 z-50 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <p className="font-semibold text-lg">CosmicTHOR</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                md.salman59765976@gmail.com
              </p>
            </div>
            <Settings
              size={18}
              className="text-gray-500 ml-4 mt-1 cursor-pointer hover:text-blue-600"
              onClick={() => navigate("/profile")}
            />
          </div>

          <hr className="my-2 border-gray-300 dark:border-gray-700" />

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
              <ClipboardList size={16} /> <span>All Orders</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
              <Headphones size={16} /> <span>Customer Support</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
              <FileText size={16} /> <span>Reports</span>
            </div>
          </div>

          <hr className="my-3 border-gray-300 dark:border-gray-700" />

          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="cursor-pointer hover:text-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
