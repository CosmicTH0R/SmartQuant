import React from "react";
import Card from "../../Common/Card";
import StatsCard from "./StatsCard";
import { ChevronRight } from "lucide-react";

const TradingStats = ({ user }) => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trading Statistics</h3>
        <button className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline flex items-center gap-1">
          View All
          <ChevronRight size={14} />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <StatsCard 
          label="Total Orders" 
          value={user.orders} 
          color="indigo"
        />
        <StatsCard 
          label="Monthly Profit" 
          value={user.profits} 
          color="green"
        />
        <StatsCard 
          label="Total Trades" 
          value={user.trades} 
          color="blue"
        />
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Favorite Markets</h4>
        <div className="flex flex-wrap gap-2">
          {user.favoriteMarkets.map(market => (
            <span 
              key={market} 
              className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-medium"
            >
              {market}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TradingStats;