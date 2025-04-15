// src/components/explore/StatsCards.js
import { BarChart2, Clock, TrendingUp, Star } from 'lucide-react';

export default function StatsCards({ stats }) {
  const { marketCap, volume24h, tradingPairs, activeUsers } = stats;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard 
        title="Global Market Cap" 
        value={`$${marketCap.value}`} 
        change={marketCap.change} 
        trend={marketCap.trend}
        icon={<BarChart2 className="text-blue-500" size={24} />}
      />
      <StatCard 
        title="24h Volume" 
        value={`$${volume24h.value}`} 
        change={volume24h.change} 
        trend={volume24h.trend}
        icon={<Clock className="text-purple-500" size={24} />}
      />
      <StatCard 
        title="Trading Pairs" 
        value={tradingPairs.value} 
        change={tradingPairs.change}
        trend={tradingPairs.trend} 
        icon={<TrendingUp className="text-green-500" size={24} />}
      />
      <StatCard 
        title="Active Users" 
        value={activeUsers.value} 
        change={activeUsers.change} 
        trend={activeUsers.trend}
        icon={<Star className="text-yellow-500" size={24} />}
      />
    </div>
  );
}

function StatCard({ title, value, change, trend, icon }) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 transition-transform duration-200 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {change} (24h)
          </p>
        </div>
        {icon}
      </div>
    </div>
  );
}