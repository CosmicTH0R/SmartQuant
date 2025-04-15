import React from "react";
import Card from "../../Common/Card";
import { Shield } from "lucide-react";

const SecuritySettings = () => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Security Settings</h3>
      
      <div className="space-y-6">
        {/* Password Section */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Password</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last changed 3 months ago</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
              Change Password
            </button>
          </div>
        </Card>
        
        {/* Two-Factor Authentication */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enabled via Authenticator App</p>
            </div>
            <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
              Manage 2FA
            </button>
          </div>
        </Card>
        
        {/* Active Sessions */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Active Sessions</h4>
            <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium">
              Sign Out All Devices
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                  <Shield size={16} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Current Device</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">MacBook Pro • New York, USA</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full">
                Active Now
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <Shield size={16} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">iPhone 15 Pro</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">San Francisco, USA</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                2 days ago
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SecuritySettings;


//this is a simple security settings component for a user profile page. It includes sections for password management, two-factor authentication, and active sessions. Each section is styled with Tailwind CSS and uses Lucide icons for visual representation. The component is designed to be responsive and user-friendly, providing clear information and actions for the user to manage their account security.