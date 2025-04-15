// import React from "react";
// import { Pencil } from "lucide-react";

// const EditProfileForm = () => {
//   return (
//     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Edit Profile</h3>
//         <Pencil size={18} className="text-gray-500" />
//       </div>
//       <form className="space-y-4">
//         <div>
//           <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Name</label>
//           <input
//             type="text"
//             placeholder="Your name"
//             className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Email</label>
//           <input
//             type="email"
//             placeholder="Your email"
//             className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Bio</label>
//           <textarea
//             placeholder="Short bio"
//             className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled
//           className="w-full p-2 bg-gray-400 dark:bg-gray-600 text-white rounded-lg cursor-not-allowed"
//         >
//           Save Changes (coming soon)
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditProfileForm;


import React, { useState } from "react";
import { Save } from "lucide-react";
import ProfilePictureUploader from "./ProfilePictureUploader";
const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    location: "New York, USA",
    role: "Product Designer",
    bio: "User interface designer and front-end developer with over 7 years of experience in creating beautiful and functional web applications."
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call would go here
    alert("Profile updated successfully!");
  };

  return (
    <>
    <ProfilePictureUploader />
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Desigination
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              ></textarea>
          </div>
          
          <button
            type="submit"
            className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
            <Save size={16} className="mr-2" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default EditProfileForm;
