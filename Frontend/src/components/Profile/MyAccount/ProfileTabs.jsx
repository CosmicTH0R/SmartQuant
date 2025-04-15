import React from "react";
import TabButton from "./TabButton"; // Assuming TabButton is a separate component
import { User, Activity, Shield, CreditCard, Bell } from "lucide-react";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-100 dark:border-gray-700">
      <div className="flex gap-1 overflow-x-auto hide-scrollbar">
        <TabButton 
          isActive={activeTab === "profile"} 
          onClick={() => setActiveTab("profile")}
          icon={<User size={16} />}
          label="Profile"
        />
        <TabButton 
          isActive={activeTab === "activity"} 
          onClick={() => setActiveTab("activity")}
          icon={<Activity size={16} />}
          label="Activity"
        />
        <TabButton 
          isActive={activeTab === "security"} 
          onClick={() => setActiveTab("security")}
          icon={<Shield size={16} />}
          label="Security"
        />
        <TabButton 
          isActive={activeTab === "billing"} 
          onClick={() => setActiveTab("billing")}
          icon={<CreditCard size={16} />}
          label="Billing"
        />
        <TabButton 
          isActive={activeTab === "notifications"} 
          onClick={() => setActiveTab("notifications")}
          icon={<Bell size={16} />}
          label="Notifications"
        />
      </div>
    </div>
  );
};

export default ProfileTabs;