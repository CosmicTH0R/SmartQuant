// import React, { useState } from "react";
// import { UploadCloud } from "lucide-react";

// const ProfilePictureUploader = () => {
//   const [preview, setPreview] = useState("https://i.pravatar.cc/150?img=56");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result); // Just showing preview, not uploading
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 text-center">
//       <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
//         Update Profile Picture
//       </h3>
//       <img
//         src={preview}
//         alt="Preview"
//         className="w-24 h-24 rounded-full mx-auto border-4 border-white dark:border-gray-700 shadow-md"
//       />
//       <label className="mt-4 inline-block cursor-pointer text-blue-600 hover:underline text-sm">
//         <input type="file" accept="image/*" onChange={handleImageChange} hidden />
//         <div className="flex justify-center items-center gap-1">
//           <UploadCloud size={16} /> Change Image
//         </div>
//       </label>
//     </div>
//   );
// };

// export default ProfilePictureUploader;




// import React, { useState } from "react";
// import { Upload, X } from "lucide-react";

// const ProfilePictureUploader = () => {
//   const [previewUrl, setPreviewUrl] = useState("https://i.pravatar.cc/150?img=56");
//   const [dragging, setDragging] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragging(true);
//   };

//   const handleDragLeave = () => {
//     setDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragging(false);
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setPreviewUrl("/api/placeholder/200/200");
//   };

//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
//       <div className="p-6">
//         <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile Picture</h2>
        
//         <div className="flex flex-col items-center">
//           <div className="relative mb-4">
//             <img
//               src={previewUrl}
//               alt="Profile"
//               className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
//             />
//             {previewUrl !== "/api/placeholder/200/200" && (
//               <button
//                 onClick={removeImage}
//                 className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//               >
//                 <X size={16} />
//               </button>
//             )}
//           </div>
          
//           <div
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//             className={`w-full border-2 border-dashed p-6 rounded-lg text-center ${
//               dragging 
//                 ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
//                 : "border-gray-300 dark:border-gray-700"
//             }`}
//           >
//             <Upload className="mx-auto h-12 w-12 text-gray-400" />
//             <div className="mt-2">
//               <label htmlFor="file-upload" className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline">
//                 Upload a file
//               </label>
//               <input
//                 id="file-upload"
//                 name="file-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="sr-only"
//               />
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                 PNG, JPG up to 10MB
//               </p>
//             </div>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//               or drag and drop
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePictureUploader;

import React, { useState } from "react";
import { Upload, X } from "lucide-react";

const ProfilePictureUploader = () => {
  const [previewUrl, setPreviewUrl] = useState("https://i.pravatar.cc/150?img=56");
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => setPreviewUrl("/api/placeholder/200/200");

  return (
    <>

    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Profile Picture</h2>
        
        <div className="flex flex-col items-center gap-2">
          <div className="relative mb-2">
            <img
              src={previewUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
            />
            {previewUrl !== "/api/placeholder/200/200" && (
              <button
                onClick={removeImage}
                className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
              >
                <X size={14} />
              </button>
            )}
          </div>
          
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full border-2 border-dashed transition-colors p-4 rounded-md text-center text-sm ${
              dragging
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-700"
            }`}
          >
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <label htmlFor="file-upload" className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline block mt-1">
              Upload a file
            </label>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              PNG, JPG up to 10MB or drag and drop
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePictureUploader;
