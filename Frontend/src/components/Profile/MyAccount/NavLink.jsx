import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const NavLink = ({ to, label }) => (
  <Link 
    to={to}
    className="flex items-center justify-between p-3 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30 transition-colors"
  >
    <span className="font-medium">{label}</span>
    <ChevronRight size={16} />
  </Link>
);

export default NavLink;
