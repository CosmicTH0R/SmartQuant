import React, { useState, useRef } from "react";
import { Calendar, Camera, Upload, X, Check, Users, Bookmark, Twitter, Linkedin, Link, Mail } from "lucide-react";
import Badge from "../../Common/Badge";

const ProfileHeader = ({ user }) => {
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setShowPhotoModal(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const uploadTrigger = () => {
    fileInputRef.current.click();
    setShowPhotoModal(true);
  };

  return (
    <>
      <div
        className="relative bg-gradient-to-br from-indigo-800 via-blue-700 to-violet-800 dark:from-indigo-950 dark:via-blue-900 dark:to-violet-950 p-5 md:p-6 overflow-hidden rounded-t-xl"
        style={{
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        {/* Enhanced background pattern */}
        <div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        ></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-400 opacity-10 rounded-full blur-3xl -ml-16 -mb-16"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-5">
          {/* Left column: Profile image */}
          <div
            className="relative group"
            onMouseEnter={() => setIsHoveringPhoto(true)}
            onMouseLeave={() => setIsHoveringPhoto(false)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div
              className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-300 ${
                isHoveringPhoto ? "ring-3 ring-white/40 scale-105" : "ring-2 ring-white/30"
              }`}
            >
              <img
                src={previewImage || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
                alt="Profile"
                className="w-full h-full rounded-full bg-white object-cover"
                style={{
                  boxShadow: "0 6px 15px -3px rgba(0,0,0,0.3)",
                }}
              />

              {/* Verified badge */}
              {user.verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full border-2 border-white dark:border-indigo-950 shadow-lg">
                  <Check size={14} className="text-white" />
                </div>
              )}

              {/* Upload overlay */}
              <div
                className={`absolute inset-0 bg-black/60 rounded-full flex items-center justify-center transition-opacity cursor-pointer ${isHoveringPhoto ? "opacity-100" : "opacity-0"}`}
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

            {/* Drag & drop text */}
            {isHoveringPhoto && (
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-white/90 font-medium backdrop-blur-sm bg-black/20 px-2 py-0.5 rounded-full">
                Click or drop
              </div>
            )}
          </div>

          {/* Right column: User info - REDUCED for more compact appearance */}
          <div className="flex-1 md:ml-2 w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="w-full">
                {/* Name and username */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-xl md:text-2xl font-bold text-white">
                    {user.name}
                  </h1>
                  <span className="inline-block text-indigo-200 text-sm bg-indigo-500/30 px-2.5 py-0.5 rounded-full font-normal backdrop-blur-sm">
                    @{user.username}
                  </span>
                </div>

                {/* Badge row */}
                <div className="flex flex-wrap items-center gap-2 text-indigo-100 mb-2">
                  <span className="text-xs bg-indigo-600/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-medium border border-indigo-400/20">
                    {user.plan} Plan
                  </span>

                  {user.verified && <Badge color="green" label="Verified" />}
                  
                  {user.subscriptionExpiry && (
                    <span className="text-xs bg-blue-500/30 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-medium">
                      Expires: {user.subscriptionExpiry}
                    </span>
                  )}
                </div>

                {/* Compact stats row */}
                <div className="flex flex-wrap items-center gap-4 text-indigo-100 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-indigo-300" />
                    <span>Since {user.joined}</span>
                  </div>

                  {user.postsCount !== undefined && (
                    <div className="flex items-center gap-1.5">
                      <Bookmark size={14} className="text-indigo-300" />
                      <span>{user.postsCount} Posts</span>
                    </div>
                  )}
                  
                  {user.followersCount !== undefined && (
                    <div className="flex items-center gap-1.5">
                      <Users size={14} className="text-indigo-300" />
                      <span>{user.followersCount} Followers</span>
                    </div>
                  )}
                  
                  {/* Social Media Icons */}
                  {user.socialLinks && (
                    <div className="flex items-center gap-2 ml-auto">
                      {user.socialLinks?.twitter && (
                        <a 
                          href={user.socialLinks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo-200 hover:text-white transition-colors"
                        >
                          <Twitter size={14} />
                        </a>
                      )}
                      
                      {user.socialLinks?.linkedin && (
                        <a 
                          href={user.socialLinks.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo-200 hover:text-white transition-colors"
                        >
                          <Linkedin size={14} />
                        </a>
                      )}
                      
                      {user.website && (
                        <a 
                          href={user.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo-200 hover:text-white transition-colors"
                        >
                          <Link size={14} />
                        </a>
                      )}
                      
                      {user.email && (
                        <a 
                          href={`mailto:${user.email}`}
                          className="text-indigo-200 hover:text-white transition-colors"
                        >
                          <Mail size={14} />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Bio condensed (only show if it exists) */}
                {user.bio && (
                  <div className="mt-2 text-indigo-100 text-xs line-clamp-1">
                    {user.bio}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo upload modal - improved design */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-xl p-5 max-w-md w-full border border-indigo-500/30 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Update Profile Photo</h3>
              <button onClick={() => setShowPhotoModal(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col items-center mb-4">
              <div className="p-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500">
                <img
                  src={previewImage || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
                  alt="Profile preview"
                  className="w-28 h-28 rounded-full object-cover border-4 border-gray-900"
                />
              </div>

              <div className="text-center mt-3">
                {previewImage ? (
                  <p className="text-gray-300 text-xs mb-2">Looking good! Ready to update?</p>
                ) : (
                  <p className="text-gray-300 text-xs mb-2">Drop an image or select a file</p>
                )}

                <div
                  className="border-2 border-dashed border-indigo-500/50 rounded-lg p-6 mt-3 text-center cursor-pointer hover:bg-indigo-900/30 transition-colors"
                  onClick={() => fileInputRef.current.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <Upload className="mx-auto text-indigo-400 mb-2" size={20} />
                  <p className="text-indigo-300 text-sm">Click or drag file</p>
                  <p className="text-gray-400 text-xs mt-1">JPG, PNG, GIF supported</p>
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
                className={`flex-1 py-2 px-4 rounded-lg transition-colors font-medium ${
                  previewImage 
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white" 
                    : "bg-indigo-600/50 text-white/50 cursor-not-allowed"
                }`}
                disabled={!previewImage}
              >
                Save Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;