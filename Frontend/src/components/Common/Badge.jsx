import React from "react";

const Badge = ({ color = "default", label }) => {
  const colors = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    green: "bg-green-500/20 text-green-200 dark:bg-green-900/40 dark:text-green-300",
    blue: "bg-blue-500/20 text-blue-200 dark:bg-blue-900/40 dark:text-blue-300",
    red: "bg-red-500/20 text-red-200 dark:bg-red-900/40 dark:text-red-300",
    yellow: "bg-yellow-500/20 text-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300",
  };

  return (
    <span className={`text-xs ${colors[color]} px-2 py-0.5 rounded-full`}>
      {label}
    </span>
  );
};

export default Badge;