// import React from "react";
// import { Crown, CalendarClock } from "lucide-react";

// const PlanInfo = () => {
//   // Dummy data
//   const plan = {
//     type: "Pro",
//     renewalDate: "May 12, 2025",
//     features: ["Real-time Data", "Advanced Analytics", "Priority Support"],
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <Crown size={20} className="text-yellow-500" />
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//             Subscription Plan
//           </h3>
//         </div>
//         <span className="text-sm px-2 py-1 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-700 dark:text-white">
//           {plan.type}
//         </span>
//       </div>

//       <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
//         <CalendarClock size={18} className="text-blue-500" />
//         <span>Renewal Date: {plan.renewalDate}</span>
//       </div>

//       <ul className="text-sm list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1 mb-4">
//         {plan.features.map((f, i) => (
//           <li key={i}>{f}</li>
//         ))}
//       </ul>

//       <button className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//         Upgrade Plan
//       </button>
//     </div>
//   );
// };

// export default PlanInfo;



import React from "react";
import { Crown, ChevronRight } from "lucide-react";

const PlanInfo = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Crown size={20} className="text-amber-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Current Plan</h2>
          </div>
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded">
            Pro
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your plan renews on <span className="font-medium text-gray-700 dark:text-gray-300">May 15, 2025</span>
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">$19.99</span>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <div className="w-4 h-4 mr-2 text-green-500">✓</div>
            <span>Unlimited projects</span>
          </div>
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <div className="w-4 h-4 mr-2 text-green-500">✓</div>
            <span>Priority support</span>
          </div>
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <div className="w-4 h-4 mr-2 text-green-500">✓</div>
            <span>Advanced analytics</span>
          </div>
        </div>

        <button className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View Plans</span>
          <ChevronRight size={16} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default PlanInfo;
