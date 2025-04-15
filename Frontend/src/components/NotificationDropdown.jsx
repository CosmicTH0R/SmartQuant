import { useState, useEffect, useRef } from "react";
import { Bell, Box, Check, Info, AlertTriangle } from "lucide-react";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const dropdownRef = useRef(null);

  const [notifications, setNotifications] = useState([
    { id: 1, icon: <Check size={16} className="text-green-600" />, title: "Trade executed successfully", description: "Your limit order for 0.5 BTC was filled at $67,240", date: "Apr 12, 2025 - 14:32", read: false },
    { id: 2, icon: <Info size={16} className="text-indigo-600" />, title: "Premium plan renewed", description: "Your premium subscription was successfully renewed for another year", date: "Jan 20, 2025 - 08:15", read: false },
    { id: 3, icon: <AlertTriangle size={16} className="text-yellow-500" />, title: "Price alert triggered", description: "ETH reached your target price of $3,200", date: "Apr 10, 2025 - 21:45", read: false },
    { id: 4, icon: <Check size={16} className="text-green-600" />, title: "Limit order placed", description: "Your limit order for 2 ETH at $3,050 has been placed", date: "Apr 08, 2025 - 09:22", read: true },
    { id: 5, icon: <Info size={16} className="text-indigo-600" />, title: "Account verification complete", description: "Your account has been fully verified. You now have access to all features", date: "Mar 29, 2025 - 16:40", read: true },
    { id: 6, icon: <AlertTriangle size={16} className="text-yellow-500" />, title: "Login from new device", description: "New login detected from MacBook Pro in San Francisco", date: "Mar 25, 2025 - 11:15", read: true }
  ]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setExpand(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
  };

  const handleToggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} className="text-gray-700 dark:text-gray-300" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={`absolute right-0 mt-2 rounded-xl shadow-lg z-50 border
          bg-white dark:bg-gray-800 text-black dark:text-white
          border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-500 ease-in-out
          ${expand ? 'w-[90vw] md:w-[600px] h-screen' : 'w-80 max-h-96 overflow-hidden'}`}
          aria-label="Notifications dropdown"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold">Notifications</h3>
            <div className="flex items-center space-x-4">
              {expand && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  Mark all as read
                </button>
              )}
              {expand && (
                <button
                  onClick={handleToggleExpand}
                  className="text-sm text-gray-500 hover:underline dark:text-gray-400"
                >
                  View Less
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className={`flex-1 overflow-y-auto px-1 py-2
            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200
            dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800`}
          >
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
                <Box size={40} className="text-gray-400 mb-2" />
                <p className="text-gray-500 dark:text-gray-400">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                    ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                >
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium truncate">{notification.title}</p>
                      <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-2">
                        {notification.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {!expand && (
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleToggleExpand}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
