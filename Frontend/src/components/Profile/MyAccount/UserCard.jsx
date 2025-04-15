// import React from "react";
// import { BadgeCheck } from "lucide-react";

// const UserCard = () => {
//   // Dummy data — replace with real user later
//   const user = {
//     name: "CosmicTHOR",
//     email: "md.salman59765976@gmail.com",
//     username: "cosmicthor",
//     joined: "Jan 12, 2024",
//     verified: true,
//     profilePic: "https://i.pravatar.cc/150?img=56", // dummy avatar
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
//       <img
//         src={user.profilePic}
//         alt="profile"
//         className="w-24 h-24 rounded-full shadow-md border-4 border-white dark:border-gray-700"
//       />
//       <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
//         {user.name}
//       </h2>
//       <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
//       <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
//       <div className="mt-2 flex items-center gap-2">
//         <span className="text-xs text-gray-600 dark:text-gray-300">
//           Joined: {user.joined}
//         </span>
//         {user.verified && (
//           <BadgeCheck size={18} className="text-green-500" title="Verified" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserCard;





import React from "react";
import { Mail, MapPin, Calendar, Briefcase } from "lucide-react";

const UserCard = () => {
  const user = {
    name: "John Smith",
    email: "john.smith@example.com",
    location: "New York, USA",
    joined: "January 2023",
    role: "Product Designer",
    profilePic: "https://i.pravatar.cc/150?img=56"
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center">
          <img
            className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-800 shadow object-cover"
            src={user.profilePic}
            alt={user.name}
          />
          <div className="ml-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-blue-600 dark:text-blue-400 font-medium">{user.role}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <Mail size={18} className="mr-2 text-gray-400" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={18} className="mr-2 text-gray-400" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={18} className="mr-2 text-gray-400" />
            <span>Joined {user.joined}</span>
          </div>
          <div className="flex items-center">
            <Briefcase size={18} className="mr-2 text-gray-400" />
            <span>{user.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;