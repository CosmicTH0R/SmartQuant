import React from "react";
import { Calendar, Edit, Check } from "lucide-react";
import { motion } from "framer-motion";
import Badge from "../../Common/Badge";

const ProfileHeader = ({ user }) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-indigo-900 dark:to-violet-950 p-6 md:p-8">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/api/placeholder/400/320')] bg-cover bg-center"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative">
          <img
            src="https://api.dicebear.com/7.x/bottts/svg?seed=thor"
            alt="Profile"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white p-1 shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full border-2 border-white dark:border-indigo-900">
            <Check size={14} className="text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{user.name}</h1>
              <div className="flex items-center gap-2 text-indigo-100">
                <span>@{user.username}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-200"></div>
                <span className="text-sm bg-indigo-500/30 px-2 py-0.5 rounded-full">
                  {user.plan} Plan
                </span>
                {user.verified && (
                  <Badge color="green" label="Verified" />
                )}
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg px-4 py-2 flex items-center gap-2 text-sm backdrop-blur-sm"
            >
              <Edit size={14} />
              Edit Profile
            </motion.button>
          </div>
          
          <div className="mt-2 text-indigo-100 text-sm flex items-center gap-2">
            <Calendar size={14} className="text-indigo-200" />
            <span>Member since {user.joined}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-200"></div>
            <span>Last active: {user.lastLogin}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;