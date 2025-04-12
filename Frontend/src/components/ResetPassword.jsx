import React, { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const handleReset = () => {
    // Replace with actual API call
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-6">
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl shadow-md transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
