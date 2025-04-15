import React from "react";
import Card from "../common/Card";
import NavLink from "../common/NavLink";

const QuickLinks = () => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
      
      <nav className="space-y-1">
        <NavLink to="/dashboard" label="Dashboard" />
        <NavLink to="/orders" label="View Orders" />
        <NavLink to="/settings" label="Settings" />
        <NavLink to="/pricing" label="Upgrade Plan" />
        <NavLink to="/help" label="Help Center" />
      </nav>
    </Card>
  );
};

export default QuickLinks;