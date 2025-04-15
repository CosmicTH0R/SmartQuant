// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar1";

// const user = {
//   name: "CosmicTHOR",
//   username: "thor5976",
//   email: "md.salman5976596@gmail.com",
//   joined: "Jan 2023",
//   verified: true,
//   plan: "Premium",
//   orders: 42,
//   lastLogin: "Apr 13, 2025 - 9:24 PM",
//   activity: ["Changed password", "Updated bio", "Logged in from new device"],
//   bio: "Trader • Developer • Coffee Addict",
//   website: "https://cosmicthor.dev",
// };

// const Settings = () => {

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 space-y-6"
//         >
//           {/* Top Section */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <img
//                 src="https://api.dicebear.com/7.x/bottts/svg?seed=thor"
//                 alt="Profile"
//                 className="w-16 h-16 rounded-full"
//               />
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
//                   {user.name}
//                 </h2>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   @{user.username} • {user.plan} Plan
//                 </p>
//                 <span
//                   className={`text-xs font-semibold ${
//                     user.verified ? "text-green-500" : "text-red-500"
//                   }`}
//                 >
//                   {user.verified ? "Verified" : "Not Verified"}
//                 </span>
//               </div>
//             </div>

//           </div>

//           {/* Quick Stats */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
//             <div>
//               <p className="text-lg font-bold text-gray-800 dark:text-white">
//                 {user.orders}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Total Orders
//               </p>
//             </div>
//             <div>
//               <p className="text-lg font-bold text-gray-800 dark:text-white">
//                 {user.plan}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">Plan</p>
//             </div>
//             <div>
//               <p className="text-lg font-bold text-gray-800 dark:text-white">
//                 {user.joined}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">Joined</p>
//             </div>
//             <div>
//               <p className="text-lg font-bold text-gray-800 dark:text-white">
//                 {user.lastLogin}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Last Login
//               </p>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-wrap justify-center gap-4">
//             <Link to="/settings" className="btn">
//               ⚙️ Settings
//             </Link>
//             <Link to="/dashboard" className="btn">
//               📊 Dashboard
//             </Link>
//             <Link to="/orders" className="btn">
//               🧾 View Orders
//             </Link>
//             <Link to="/pricing" className="btn">
//               🚀 Upgrade Plan
//             </Link>
//           </div>

//           {/* Bio & Links */}
//           <div className="text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 italic">
//               "{user.bio}"
//             </p>
//             <a
//               href={user.website}
//               className="text-blue-600 hover:underline text-sm"
//               target="_blank"
//               rel="noreferrer"
//             >
//               🌐 {user.website}
//             </a>
//           </div>

//           {/* Activity Snapshot */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//               🔍 Recent Activities
//             </h3>
//             <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc pl-5 space-y-1">
//               {user.activity.map((act, i) => (
//                 <li key={i}>{act}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Motivational Quote */}
//           <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 p-4 rounded-xl text-center">
//             🎯 <strong>Today’s Goal:</strong> Don’t check charts every 2 mins 😅
//           </div>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default Settings;





import React, { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar1";
import ProfileHeader from "../components/Profile/MyAccount/ProfileHeader";
import ProfileTabs from "../components/Profile/MyAccount/ProfileTabs";
import ProfileTab from "../components/Profile/MyAccount/ProfileTab";
import ActivityTimeline from "../components/Profile/MyAccount/ActivityTimeline";
import SecuritySettings from "../components/Profile/MyAccount/SecuritySettings";
import NotificationTab from "../components/Profile/MyAccount/NotificationTab";
import BillingTab from "../components/Profile/MyAccount/BillingTab";


const user = {
  name: "CosmicTHOR",
  username: "thor5976",
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
      case "activity":
        return <ActivityTimeline activities={user.activity} />;
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