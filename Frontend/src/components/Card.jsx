import React from "react";

const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-4 text-center flex flex-col items-center gap-2 w-full max-w-[200px] transition-colors duration-300">
      <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 p-3 rounded-full">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-black dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
};

export default Card;
