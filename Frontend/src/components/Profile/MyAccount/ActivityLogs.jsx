import React from "react";
import { Clock, LogIn, Settings, Download } from "lucide-react";

const ActivityLogs = () => {
  const activities = [
    {
      type: "login",
      device: "Mac - Chrome",
      location: "New York, USA",
      time: "Today, 10:30 AM",
      icon: LogIn
    },
    {
      type: "settings",
      description: "Password changed",
      time: "Apr 12, 2025, 4:45 PM",
      icon: Settings
    },
    {
      type: "download",
      description: "Downloaded profile data",
      time: "Apr 10, 2025, 2:30 PM",
      icon: Download
    },
    {
      type: "login",
      device: "iPhone - Safari",
      location: "Boston, USA",
      time: "Apr 9, 2025, 9:15 AM",
      icon: LogIn
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Clock size={20} className="text-blue-600 dark:text-blue-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
          </div>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                <activity.icon size={16} className="text-gray-600 dark:text-gray-400" />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    {activity.type === "login" ? (
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Logged in from {activity.device}
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.description}
                      </p>
                    )}
                    {activity.location && (
                      <p className="text-xs text-gray-500">{activity.location}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
