import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar1";

import AccountSummary from "../components/DashBoard/AccountSummary";
import ChartSection from "../components/DashBoard/ChartSection";
import WatchlistSection from "../components/DashBoard/WatchlistSection";
import MarketNews from "../components/DashBoard/MarketNews";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        console.log("🚀 Fetching user profile...");
  
        const res = await fetch("http://localhost:5000/api/auth/user/profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "Cache-Control": "no-cache", 
          },
        });
  
        const status = res.status;
        let data = null;
  
        if (status === 200) {
          data = await res.json();
          console.log("✅ User data received:", data);
  
          if (data && data.email) {
            setUser(data);
            setError(null);
            navigate("/dashboard");
          } else {
            throw new Error("Invalid user data");
          }
        } else {
          console.warn("❌ Unauthorized or bad response", status);
          navigate("/signin?error=auth_failed");
        }
      } catch (error) {
        console.error("🔥 Error while fetching user profile:", error);
        setError("Connection error. Please try again.");
        setTimeout(() => navigate("/signin"), 2000);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserProfile();
  }, [navigate]);
  
  
  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg shadow-md">
          <p className="text-red-600 mb-2">⚠️ {error}</p>
          <p>Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  // Render dashboard when user data is available
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>No user data available.</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate("/signin")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black min-h-screen px-4 md:px-6 py-6 pb-20">
        <div className="container mx-auto px-2">
          <AccountSummary user={user} />
          <ChartSection />
          <WatchlistSection />
          <MarketNews />
        </div>
      </div>
    </>
  );
};

export default Dashboard;