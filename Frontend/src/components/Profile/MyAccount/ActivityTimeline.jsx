import React from "react";
import ActivityItem from "./ActivityItem";
import { Activity, CreditCard, Shield, ChevronRight } from "lucide-react";

const ActivityTimeline = ({ activities }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        <button className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline flex items-center gap-1">
          View All
          <ChevronRight size={14} />
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <ActivityItem
            key={i}
            icon={<Activity size={20} />}
            action={activity.action}
            date={activity.date}
            time={activity.time}
          />
        ))}
        
        {/* Additional placeholder activities */}
        <ActivityItem
          icon={<CreditCard size={20} />}
          action="Successfully completed trade #1337"
          date="Apr 7, 2025"
          time="2:15 PM"
        />
        
        <ActivityItem
          icon={<Shield size={20} />}
          action="Enabled 2-factor authentication"
          date="Apr 5, 2025"
          time="11:30 AM"
        />
      </div>
    </div>
  );
};

export default ActivityTimeline;


// This component is used to display a timeline of user activities. It takes an array of activity objects as props and renders them using the ActivityItem component. Each activity item includes an icon, action description, date, and time. The component also includes a "View All" button for navigation.