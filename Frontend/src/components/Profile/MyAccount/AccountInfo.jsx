import React from "react";
import Card from "../../Common/Card";

const AccountInfo = ({ user }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
      
      <dl className="space-y-3">
        <div className="flex justify-between">
          <dt className="text-gray-600 dark:text-gray-400 text-sm">Username</dt>
          <dd className="text-gray-900 dark:text-white font-medium text-sm">@{user.username}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600 dark:text-gray-400 text-sm">Email</dt>
          <dd className="text-gray-900 dark:text-white font-medium text-sm">{user.email}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600 dark:text-gray-400 text-sm">Member Since</dt>
          <dd className="text-gray-900 dark:text-white font-medium text-sm">{user.joined}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600 dark:text-gray-400 text-sm">Current Plan</dt>
          <dd className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">{user.plan}</dd>
        </div>
      </dl>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 text-sm font-medium transition-colors">
          Upgrade to Pro
        </button>
      </div>
    </Card>
  );
};

export default AccountInfo;