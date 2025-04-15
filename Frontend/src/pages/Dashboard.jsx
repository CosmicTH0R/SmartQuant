import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar1";

import AccountSummary from "../components/DashBoard/AccountSummary";
import ChartSection from "../components/DashBoard/ChartSection";
import WatchlistSection from "../components/DashBoard/WatchlistSection";
import MarketNews from "../components/DashBoard/MarketNews";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("token");

      if (tokenFromUrl) {
        localStorage.setItem("token", tokenFromUrl);
        window.history.replaceState({}, document.title, "/dashboard");
      }

      const finalToken = tokenFromUrl || localStorage.getItem("token");

      if (!finalToken) {
        navigate("/signin");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${finalToken}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Error:", errorData);
          localStorage.removeItem("token");
          navigate("/signin");
          return;
        }

        const data = await res.json();
        if (data && data.email) {
          setUser(data);
        } else {
          localStorage.removeItem("token");
          navigate("/signin");
        }
      } catch (error) {
        console.error("🔥 Error while fetching user profile:", error);
        localStorage.removeItem("token");
        navigate("/signin");
      }
    };

    init();
  }, [navigate]);

  if (!user) return null; // Or add loading spinner here if you want

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black min-h-screen px-4 md:px-6 py-6 pb-20">
        <AccountSummary user={user} />
        <ChartSection />
        <WatchlistSection />
        <MarketNews />
      </div>
    </>
  );
};

export default Dashboard;
