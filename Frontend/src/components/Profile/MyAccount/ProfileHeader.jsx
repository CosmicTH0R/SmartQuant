import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Camera,
  Upload,
  X,
  Check,
  Mail,
  AlertCircle
} from "lucide-react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getBgColor = () => {
    switch (type) {
      case "success": return "bg-green-500";
      case "error": return "bg-red-500";
      case "warning": return "bg-amber-500";
      default: return "bg-blue-500";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success": return <Check size={18} />;
      case "error": return <X size={18} />;
      case "warning": return <AlertCircle size={18} />;
      default: return <AlertCircle size={18} />;
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center ${getBgColor()} text-white px-4 py-3 rounded-lg shadow-lg max-w-md animate-fade-in-down`}>
      <div className="mr-2">
        {getIcon()}
      </div>
      <p className="flex-1">{message}</p>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <X size={16} />
      </button>
    </div>
  );
};

const ProfileHeader = ({ user }) => {
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [userData, setUserData] = useState(user);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const fileInputRef = useRef(null);

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
  };

  const closeToast = () => {
    setToast({ show: false, message: "", type: "" });
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/me", {
        withCredentials: true,
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      showToast("Failed to load profile data", "error");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("File too large. Maximum size is 5MB.", "warning");
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setShowPhotoModal(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.match("image.*")) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("File too large. Maximum size is 5MB.", "warning");
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setShowPhotoModal(true);
    }
  };

  const handlePhotoUpload = async () => {
    if (!imageFile) {
      showToast("No image selected!", "warning");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "profile_pics");
      formData.append("folder", "user_profiles");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dqzalfygh/image/upload`,
        formData
      );

      const uploadedUrl = response.data.secure_url;

      const backendResponse = await axios.put(
        "http://localhost:5000/api/user/profile-photo",
        { imageUrl: uploadedUrl },
        { withCredentials: true }
      );

      if (backendResponse.status === 200) {
        showToast("Profile photo updated successfully!", "success");
        setShowPhotoModal(false);
        setPreviewImage(null);
        setImageFile(null);
        await fetchUserProfile();
      } else {
        showToast("Failed to update profile photo", "error");
      }
    } catch (err) {
      console.error("Upload failed", err);
      showToast("An error occurred while uploading the photo", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const uploadTrigger = () => {
    fileInputRef.current.click();
  };

  // Format bio to display with bullet points if it contains multiple items
  const formatBio = (bio) => {
    if (!bio) return null;
    
    const bioItems = bio.split('•').filter(item => item.trim());
    if (bioItems.length <= 1) return bio;
    
    return bioItems.map(item => item.trim()).join(' • ');
  };

  // Function to generate random avatar if no profile photo
  const getDefaultAvatar = () => {
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random().toString(36).substring(7)}`;
  };

  return (
    <>
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
      
      <div
        className="relative bg-blue-900 p-4 md:p-6 overflow-hidden"
        style={{
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div className="relative z-10 flex items-start gap-5">
          {/* Profile image with verification badge */}
          <div
            className="relative group"
            onMouseEnter={() => setIsHoveringPhoto(true)}
            onMouseLeave={() => setIsHoveringPhoto(false)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div
              className="relative w-24 h-24 rounded-full border-4 border-blue-800 bg-purple-500"
            >
              <img
                src={userData.profilePhoto || getDefaultAvatar()}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />

              {/* Verified badge */}
              {userData.verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full border-2 border-blue-900 shadow-lg">
                  <Check size={16} className="text-white" />
                </div>
              )}

              {/* Upload overlay */}
              <div
                className={`absolute inset-0 bg-black/60 rounded-full flex items-center justify-center transition-opacity cursor-pointer ${
                  isHoveringPhoto ? "opacity-100" : "opacity-0"
                }`}
                onClick={uploadTrigger}
              >
                <Camera size={24} className="text-white" />
              </div>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* User info column */}
          <div className="flex-1 text-white space-y-2">
            {/* Name row */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-white">
                {userData.name || "CosmicTHOR"}
              </h1>
            </div>

            {/* Email address */}
            <div className="flex items-center gap-1.5 text-white/80">
              <Mail size={16} />
              <span>{userData.email || "md.salman5976596@gmail.com"}</span>
            </div>

            {/* Bio with bullets */}
            <div className="text-white/90 font-medium">
              {formatBio(userData.bio) || "Trader • Developer • Coffee Addict"}
            </div>

            {/* Badge row */}
            <div className="flex items-center gap-3 pt-2">
              <span className="bg-blue-700 px-4 py-1 rounded-full text-white font-medium text-sm">
              {userData.plan || "Free Member"}
              </span>
              
              {userData.verified && (
                <span className="bg-green-600 px-4 py-1 rounded-full text-white font-medium text-sm">
                  {userData.isVerified || "not verified"}
                </span>
              )}
            </div>

            {/* Join date */}
            <div className="flex items-center gap-1.5 text-white/70 text-sm pt-1">
              <Calendar size={14} />
              <span>Since {userData.joined || "Jan 2023"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Photo upload modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-xl p-5 max-w-md w-full border border-indigo-500/30 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">
                Update Profile Photo
              </h3>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col items-center mb-4">
              <div className="p-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500">
                <img
                  src={previewImage || (userData.profilePhoto || getDefaultAvatar())}
                  alt="Profile preview"
                  className="w-28 h-28 rounded-full object-cover border-4 border-gray-900"
                />
              </div>

              <div className="text-center mt-3">
                {previewImage ? (
                  <p className="text-gray-300 text-xs mb-2">
                    Looking good! Ready to update?
                  </p>
                ) : (
                  <p className="text-gray-300 text-xs mb-2">
                    Drop an image or select a file
                  </p>
                )}

                <div
                  className="border-2 border-dashed border-indigo-500/50 rounded-lg p-6 mt-3 text-center cursor-pointer hover:bg-indigo-900/30 transition-colors"
                  onClick={() => fileInputRef.current.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <Upload className="mx-auto text-indigo-400 mb-2" size={20} />
                  <p className="text-indigo-300 text-sm">Click or drag file</p>
                  <p className="text-gray-400 text-xs mt-1">
                    JPG, PNG, GIF supported (max 5MB)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
                onClick={() => setShowPhotoModal(false)}
              >
                Cancel
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-lg transition-colors font-medium flex items-center justify-center ${
                  previewImage && !uploading
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white"
                    : "bg-indigo-600/50 text-white/50 cursor-not-allowed"
                }`}
                onClick={handlePhotoUpload}
                disabled={!previewImage || uploading}
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  "Save Photo"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;