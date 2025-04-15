import React, { useEffect } from 'react';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Redirect to your backend OAuth start route
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  useEffect(() => {
    // Check if the URL has a token (after the Google OAuth flow finishes)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Store token in HTTP-only cookie (secure approach)
      document.cookie = `authToken=${token}; path=/; Secure; HttpOnly`;

      // Redirect to dashboard or any other page you want after successful login
      window.location.href = '/dashboard';
    }
  }, []);

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
