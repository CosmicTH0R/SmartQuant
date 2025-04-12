import React, { useEffect } from "react";

const GoogleLoginButton = () => {
  const handleCredentialResponse = async (response) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/oauth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oauthProvider: "google",
          oauthId: response.sub,
          email: response.email,
          username: response.name,
          profilePicture: response.picture,
        }),
      });

      const data = await res.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      console.error("OAuth login failed:", error);
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  return (
    <div
      id="google-button"
      className="flex justify-center dark:bg-transparent"
    ></div>
  );
};

export default GoogleLoginButton;
