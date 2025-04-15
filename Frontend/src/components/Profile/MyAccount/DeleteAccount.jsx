// import React, { useState } from "react";
// import { Trash } from "lucide-react";

// const DeleteAccount = () => {
//   const [confirmDelete, setConfirmDelete] = useState(false);

//   const handleDelete = () => {
//     // Future scope: API call to delete account
//     alert("Account deleted!"); // Dummy confirmation
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
//       <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
//         Delete Account
//       </h3>
//       <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//         This action is irreversible. Once deleted, your account data will be permanently erased.
//       </div>

//       <div className="bg-red-100 dark:bg-red-700 p-4 rounded-lg text-red-700 dark:text-red-300 flex items-center gap-2">
//         <Trash size={20} />
//         <span className="font-medium">Are you sure you want to delete your account?</span>
//       </div>

//       {/* Confirm delete */}
//       <div className="mt-4">
//         <label className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
//           <input
//             type="checkbox"
//             checked={confirmDelete}
//             onChange={() => setConfirmDelete(!confirmDelete)}
//             className="form-checkbox h-4 w-4 text-red-500"
//           />
//           <span className="ml-2">I understand the consequences</span>
//         </label>
//       </div>

//       <button
//         onClick={handleDelete}
//         disabled={!confirmDelete}
//         className={`w-full mt-4 p-2 bg-red-600 text-white rounded-lg ${!confirmDelete ? "opacity-50 cursor-not-allowed" : ""} hover:bg-red-700 transition`}
//       >
//         Delete Account
//       </button>
//     </div>
//   );
// };

// export default DeleteAccount;

import React, { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";

const DeleteAccount = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleRequestDelete = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setConfirmText("");
  };

  const handleConfirmDelete = () => {
    // This would normally call an API endpoint
    if (confirmText === "DELETE") {
      alert(
        "Account deletion request submitted. You will receive an email confirmation."
      );
      setShowConfirmation(false);
      setConfirmText("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Trash2 size={20} className="text-red-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Delete Account
          </h2>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>

        {!showConfirmation ? (
          <button
            onClick={handleRequestDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            Request Account Deletion
          </button>
        ) : (
          <div className="border border-red-200 dark:border-red-900 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
            <div className="flex items-start mb-4">
              <AlertTriangle
                className="text-red-600 mr-2 flex-shrink-0 mt-0.5"
                size={18}
              />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
                  This action cannot be undone
                </h3>
                <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                  This will permanently delete your account, all your data, and
                  remove access to all services.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type "DELETE" to confirm
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                placeholder="DELETE"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleConfirmDelete}
                disabled={confirmText !== "DELETE"}
                className={`px-4 py-2 text-white rounded-md text-sm font-medium transition-colors ${
                  confirmText === "DELETE"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-red-400 cursor-not-allowed"
                }`}
              >
                Delete My Account
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteAccount;
