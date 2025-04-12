import React from "react";
import Navbar from "../components/Navbar1";
import Tabs from "../components/Explore/Tabs";
import IndicesSection from "../components/Explore/IndicesSection";
import InvestmentsSummary from "../components/Explore/InvestmentsSummary";
import MostTraded from "../components/Explore/MostTraded";
import Watchlist from "../components/Explore/Watchlist";

const Explore = () => {
  return (
    <div className="bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black min-h-screen text-gray-800 dark:text-gray-100">
      <Navbar />
      <Tabs />
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="col-span-2">
          <IndicesSection />
          <MostTraded />
        </div>
        <div className="col-span-1">
          <InvestmentsSummary />
          <Watchlist />
        </div>
      </div>
    </div>
  );
};

export default Explore;
