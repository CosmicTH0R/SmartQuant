import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;