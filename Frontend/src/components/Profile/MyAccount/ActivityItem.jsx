import React from "react";

const ActivityItem = ({ icon, action, date, time }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 flex items-start gap-4">
      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-full text-indigo-700 dark:text-indigo-300">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h4 className="font-medium text-gray-900 dark:text-white">{action}</h4>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span>{date}</span>
            <span>•</span>
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;