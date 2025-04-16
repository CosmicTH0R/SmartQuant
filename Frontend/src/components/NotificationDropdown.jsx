import {
  Bell,
  Check,
  Info,
  AlertTriangle,
  Trash2
} from "lucide-react";
import dayjs from "dayjs";
import isToday from "date-fns/isToday";
import isThisWeek from "date-fns/isThisWeek";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState, useEffect, useRef } from "react";


dayjs.extend(relativeTime);

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const [filter, setFilter] = useState("All");
  const [notifs, setNotifs] = useState([]);
  const dropdownRef = useRef(null);

  const rawNotifications = [
    {
      id: 1,
      icon: <Check size={16} className="text-green-600" />,
      title: "Trade executed successfully",
      description: "Your limit order for 0.5 BTC was filled at $67,240",
      date: "2025-04-16T10:32:00",
      read: false
    },
    {
      id: 2,
      icon: <Info size={16} className="text-indigo-600" />,
      title: "Premium plan renewed",
      description: "Your premium subscription was renewed",
      date: "2025-04-12T08:15:00",
      read: false
    },
    {
      id: 3,
      icon: <AlertTriangle size={16} className="text-yellow-500" />,
      title: "Price alert triggered",
      description: "ETH reached your target price of $3,200",
      date: "2025-04-15T21:45:00",
      read: false
    },
    {
      id: 4,
      icon: <Check size={16} className="text-green-600" />,
      title: "Limit order placed",
      description: "Your limit order for 2 ETH at $3,050 has been placed",
      date: "2025-04-08T09:22:00",
      read: true
    },
    {
      id: 5,
      icon: <Info size={16} className="text-indigo-600" />,
      title: "Account verification complete",
      description: "Your account has been verified",
      date: "2025-03-29T16:40:00",
      read: true
    },
    {
      id: 6,
      icon: <AlertTriangle size={16} className="text-yellow-500" />,
      title: "Login from new device",
      description: "New login from MacBook Pro in San Francisco",
      date: "2025-03-25T11:15:00",
      read: true
    },
    {
      id: 7,
      icon: <Check size={16} className="text-green-600" />,
      title: "Withdrawal successful",
      description: "You successfully withdrew $10,000 to your bank account",
      date: "2025-04-14T15:30:00",
      read: false
    },
    {
      id: 8,
      icon: <AlertTriangle size={16} className="text-yellow-500" />,
      title: "Security alert",
      description: "Unusual activity detected on your account",
      date: "2025-04-13T18:10:00",
      read: false
    },
    {
      id: 9,
      icon: <Check size={16} className="text-green-600" />,
      title: "Funds deposited",
      description: "A deposit of $500 has been successfully added to your account",
      date: "2025-04-10T13:50:00",
      read: true
    },
    {
      id: 10,
      icon: <Info size={16} className="text-indigo-600" />,
      title: "App updated",
      description: "A new update is available for the app. Please update to continue.",
      date: "2025-04-09T08:25:00",
      read: true
    },
    {
      id: 11,
      icon: <AlertTriangle size={16} className="text-yellow-500" />,
      title: "Price alert triggered",
      description: "Bitcoin reached your target price of $70,000",
      date: "2025-04-07T20:15:00",
      read: false
    },
    {
      id: 12,
      icon: <Info size={16} className="text-indigo-600" />,
      title: "Account password changed",
      description: "Your account password was successfully updated",
      date: "2025-04-06T14:00:00",
      read: true
    }
  ];
  

  useEffect(() => {
    setNotifs(rawNotifications);
  }, []);

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

  const handleDelete = (id) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getGroupedNotifications = () => {
    const filtered =
      filter === "All"
        ? notifs
        : notifs.filter((n) => n.title.includes("Price alert"));

    const today = [];
    const thisWeek = [];
    const earlier = [];

    filtered.forEach((n) => {
      const date = new Date(n.date);
      if (isToday(date)) today.push(n);
      else if (isThisWeek(date, { weekStartsOn: 1 })) thisWeek.push(n);
      else earlier.push(n);
    });

    return { today, thisWeek, earlier };
  };

  const { today, thisWeek, earlier } = getGroupedNotifications();
  const hasUnread = notifs.some((n) => !n.read);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} className="text-gray-700 dark:text-gray-300" />
        {hasUnread && (
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full" />
        )}
      </button>

      {open && (
        <div
          className={`absolute right-0 mt-2 z-50 rounded-xl shadow-lg border bg-white dark:bg-gray-800 text-black dark:text-white border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col transition-all duration-500 ease-in-out ${
            expand
            ? "w-[50vw] max-h-[90vh]" 
            : "w-80 max-h-[24rem]"
        }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Notifications</h3>
              {expand && (
                <div className="text-xs flex gap-2 items-center">
                  <button
                    onClick={() => setFilter("All")}
                    className={`${
                      filter === "All" ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    All
                  </button>
                  |
                  <button
                    onClick={() => setFilter("Price Alerts")}
                    className={`${
                      filter === "Price Alerts"
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    Price Alerts
                  </button>
                </div>
              )}
            </div>
            {expand && (
              <div className="flex gap-2">
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Mark all as read
                </button>
                <button
                  onClick={() => setExpand(false)}
                  className="text-xs text-gray-500 hover:underline"
                >
                  View Less
                </button>
              </div>
            )}
          </div>

          <div className="overflow-y-auto flex-1 px-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {[{ label: "Today", data: today }, { label: "This Week", data: thisWeek }, { label: "Earlier", data: earlier }].filter((g) => g.data.length).map((group) => (
              <div key={group.label}>
                <h4 className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
                  {group.label}
                </h4>
                {group.data.map((notification) => (
                  <div
                    key={notification.id}
                    className={`group flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all relative ${
                      !notification.read
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : ""
                    }`}
                  >
                    <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-medium truncate">
                          {notification.title}
                        </p>
                        <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-2">
                          {dayjs(notification.date).format("MMM D, YYYY - HH:mm")}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.description}
                      </p>
                    </div>
                    {expand && (
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {!expand && (
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setExpand(true)}
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
