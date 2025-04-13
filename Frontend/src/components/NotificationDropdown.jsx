import { useState } from "react";
import { Bell, Box } from "lucide-react";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-900 dark:text-white hover:text-blue-400 p-2"
      >
        <Bell size={20} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-60 h-60 p-5 rounded-xl shadow-lg z-50 border transition-all duration-300
          bg-white dark:bg-gray-900 
          text-black dark:text-white 
          border-gray-300 dark:border-gray-700
          overflow-hidden"
        >
          {/* Centered Faded Box Icon */}
          <Box
            className="absolute w-32 h-32 text-black/5 dark:text-white/10 
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          />

          {/* Foreground Text */}
          <p className="relative text-center font-semibold z-10">
            You're All Caught Up
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
