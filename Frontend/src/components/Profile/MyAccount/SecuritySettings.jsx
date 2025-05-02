import React, { useState } from "react";
import Card from "../../Common/Card";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const SecuritySettings = () => {
  const navigate = useNavigate();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [twoFACode, setTwoFACode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Modal Handlers
  const handleChangePassword = () => setShowPasswordModal(true);
  const handleManage2FA = () => setShow2FAModal(true);
  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowPasswords({ currentPassword: false, newPassword: false, confirmPassword: false });
  };
  const handleClose2FAModal = () => {
    setShow2FAModal(false);
    setTwoFACode("");
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleUpdatePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/security/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update password");

      toast.success("Password updated successfully!");
      handleClosePasswordModal();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle2FA = async () => {
    try {
      setLoading(true);
      const url = is2FAEnabled
        ? "http://localhost:5000/api/security/disable-2fa"
        : "http://localhost:5000/api/security/verify-2fa";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code: twoFACode }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "2FA operation failed");

      toast.success(data.message);
      setIs2FAEnabled(!is2FAEnabled);
      handleClose2FAModal();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOutAllDevices = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/security/signout-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to sign out");

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="p-6 relative">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Security Settings</h3>

      <div className="space-y-6">
        {/* Password Section */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Password</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last changed 3 months ago</p>
            </div>
            <button
              onClick={handleChangePassword}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Change Password
            </button>
          </div>
        </Card>

        {/* Two-Factor Authentication */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {is2FAEnabled ? "Enabled via Authenticator App" : "Not Enabled"}
              </p>
            </div>
            <button
              onClick={handleManage2FA}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Manage 2FA
            </button>
          </div>
        </Card>

        {/* Active Sessions */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Active Sessions</h4>
            <button
              onClick={handleSignOutAllDevices}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
            >
              {loading ? "Signing out..." : "Sign Out All Devices"}
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
          </div>
        </Card>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
            <button onClick={handleClosePasswordModal} className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl">
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <div className="space-y-4">
              {["currentPassword", "newPassword", "confirmPassword"].map((name) => (
                <div key={name}>
                  <label className="block text-sm mb-1">
                    {name === "currentPassword"
                      ? "Current Password"
                      : name === "newPassword"
                      ? "New Password"
                      : "Repeat New Password"}
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords[name] ? "text" : "password"}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pr-10 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(name)}
                      className="absolute right-2 top-2 text-gray-400 hover:text-white"
                    >
                      {showPasswords[name] ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={handleUpdatePassword}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
                <button onClick={handleForgotPassword} className="text-sm text-gray-400 hover:text-gray-200">
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
            <button onClick={handleClose2FAModal} className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl">
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4">
              {is2FAEnabled ? "Disable Two-Factor Authentication" : "Enable Two-Factor Authentication"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">
                  {is2FAEnabled ? "Enter 2FA Code to Disable" : "Enter 2FA Code to Enable"}
                </label>
                <input
                  type="text"
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={handleToggle2FA}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                disabled={loading}
              >
                {loading ? "Processing..." : is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;
