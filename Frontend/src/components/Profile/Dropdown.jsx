import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, ClipboardList, Headphones, FileText, LogOut, User, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";

const ProfileDropdown = ({ apiBaseUrl = "http://localhost:5000" }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Menu items configuration - easily customizable
  const menuItems = [
    {
      category: "Account",
      items: [
        { icon: User, label: "My Account", action: () => navigate("/myaccount") },
      ]
    },
    {
      category: "Orders",
      items: [
        { icon: ShoppingBag, label: "All Orders", action: () => navigate("/orders") },
        { icon: ClipboardList, label: "Track Order", action: () => navigate("/track-order") },
      ]
    },
    {
      category: "Support",
      items: [
        { icon: Headphones, label: "Customer Support", action: () => navigate("/support") },
        { icon: FileText, label: "Reports", action: () => navigate("/reports") },
      ]
    },
  ];

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiBaseUrl}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
        } else {
          console.log("User fetch failed:", data.message);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [apiBaseUrl]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Logout successful!");
        setUser(null);
        setShowDropdown(false);
        
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

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    return names.length === 1
      ? names[0][0].toUpperCase()
      : names[0][0].toUpperCase() + (names[1]?.[0]?.toUpperCase() || '');
  };

  const getProfileColor = () => {
    if (!user) return "bg-gray-400";
    
    // Dynamic color based on user role or ID
    const colorOptions = ["bg-teal-600", "bg-blue-600", "bg-purple-600", "bg-pink-600", "bg-amber-600"];
    const userIdSum = user.id ? String(user.id).split('').reduce((a, b) => a + parseInt(b), 0) : 0;
    return colorOptions[userIdSum % colorOptions.length];
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 rounded-full"
      >
        {loading ? (
          <div className="bg-gray-300 w-8 h-8 rounded-full animate-pulse"></div>
        ) : (
          <div className={`${getProfileColor()} w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold`}>
            {getInitials(user?.name)}
          </div>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 text-black dark:text-white shadow-xl rounded-md py-4 px-4 z-50 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              {loading ? (
                <>
                  <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                </>
              ) : (
                <>
                  <p className="font-semibold text-lg">{user?.name || "Guest User"}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email || ""}
                  </p>
                  {user?.role && (
                    <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                      {user.role}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          <hr className="my-2 border-gray-300 dark:border-gray-700" />

          {menuItems.map((category, idx) => (
            <div key={idx} className="mb-3">
              {category.category && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase font-medium">
                  {category.category}
                </p>
              )}
              <div className="space-y-2 text-sm">
                {category.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx} 
                    className="flex items-center gap-2 py-1 px-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md cursor-pointer transition-colors"
                    onClick={item.action}
                  >
                    <item.icon size={16} className="text-gray-600 dark:text-gray-400" /> 
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              {idx < menuItems.length - 1 && (
                <hr className="my-3 border-gray-200 dark:border-gray-800" />
              )}
            </div>
          ))}

          <div className="mt-4 pt-2 border-t border-gray-300 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full gap-2 py-2 px-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
            >
              <LogOut size={16} /> 
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;