import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileTab = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
  });

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/me", {
        withCredentials: true,
      });
      setUser(response.data);
      setFormData({
        username: response.data.username || "",
        email: response.data.email || "",
        bio: response.data.bio || "",
      });
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      toast.error("Failed to load profile data");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {};

    if (formData.username !== user.username)
      updatedFields.username = formData.username;
    if (formData.email !== user.email) updatedFields.email = formData.email;
    if (formData.bio !== user.bio) updatedFields.bio = formData.bio;

    if (Object.keys(updatedFields).length > 0) {
      try {
        const res = await fetch(
          "http://localhost:5000/api/user/profile-update",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(updatedFields),
          }
        );

        if (!res.ok) throw new Error("Failed to update profile");

        toast.success("Profile updated successfully!");
        setEditing(false);
        await fetchUserProfile(); // refresh updated data
      } catch (error) {
        console.error("Update error:", error);
        toast.error("Failed to update profile.");
      }
    } else {
      toast.info("No changes detected.");
    }
  };

  if (!user)
    return (
      <p className="p-6 text-gray-600 dark:text-gray-300">Loading profile...</p>
    );

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Profile Information
          </h2>
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Display Name
                </p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {user.email}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Joined
                </p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {user.joined}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Bio</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {user.bio || "N/A"}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Trading Stats
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Profits
                  </p>
                  <p className="text-xl font-bold text-green-500">
                    {user.profits ?? 0}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Trades
                  </p>
                  <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    {user.trades ?? 0}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Plan
                  </p>
                  <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    {user.plan || "Free"}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Favorite Markets
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.favoriteMarkets?.length > 0 ? (
                  user.favoriteMarkets.map((market, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm"
                    >
                      {market}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    No favorites yet
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileTab;
