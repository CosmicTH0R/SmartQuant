import React, { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar1";
import ProfileHeader from "../components/Profile/MyAccount/ProfileHeader";
import ProfileTabs from "../components/Profile/MyAccount/ProfileTabs";
import ProfileTab from "../components/Profile/MyAccount/ProfileTab";
import SecuritySettings from "../components/Profile/MyAccount/SecuritySettings";
import NotificationTab from "../components/Profile/MyAccount/NotificationTab";
import BillingTab from "../components/Profile/MyAccount/BillingTab";


const user = {
  name: "CosmicTHOR",
  email: "md.salman5976596@gmail.com",
  joined: "Jan 2023",
  verified: true,
  plan: "Premium",
  orders: 42,
  lastLogin: "Apr 13, 2025 - 9:24 PM",
  activity: [
    { action: "Changed password", date: "Apr 12, 2025", time: "4:30 PM" },
    { action: "Updated bio", date: "Apr 10, 2025", time: "7:15 AM" },
    { action: "Logged in from new device", date: "Apr 8, 2025", time: "11:42 PM" }
  ],
  bio: "Trader • Developer • Coffee Addict",
  website: "https://cosmicthor.dev",
  profits: "+12.5%",
  trades: 145,
  favoriteMarkets: ["BTC/USD", "ETH/USD", "SOL/USD"]
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch(activeTab) {
      case "profile":
        return <ProfileTab user={user} />;
      case "security":
        return <SecuritySettings />;
      case "billing":
        return <BillingTab />;
      case "notifications":
        return <NotificationTab />;
      default:
        return <ProfileTab user={user} />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-black p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-xl"
        >
          <ProfileHeader user={user} />
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="bg-white dark:bg-gray-800">
            {renderTabContent()}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Settings;