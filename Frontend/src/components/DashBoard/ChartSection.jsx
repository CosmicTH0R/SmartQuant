import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function MarketOverview() {
  const [activeChartPeriod, setActiveChartPeriod] = useState("1D");
  const [darkMode] = useState(false);
  
  // Sample stock data for the chart
  const stockData = [
    { name: "9:30", price: 22220.87, volume: 2800 },
    { name: "10:00", price: 22244.15, volume: 2300 },
    { name: "10:30", price: 22289.35, volume: 3500 },
    { name: "11:00", price: 22276.22, volume: 2900 },
    { name: "11:30", price: 22305.78, volume: 3200 },
    { name: "12:00", price: 22356.44, volume: 4100 },
    { name: "12:30", price: 22376.92, volume: 3600 },
    { name: "13:00", price: 22392.31, volume: 2800 },
    { name: "13:30", price: 22410.79, volume: 3200 },
    { name: "14:00", price: 22423.11, volume: 3900 },
    { name: "14:30", price: 22441.67, volume: 4200 },
    { name: "15:00", price: 22456.32, volume: 5100 }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Market Overview
          </h2>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              NIFTY 50
            </span>
            <span className="text-lg font-medium text-green-500 flex items-center">
              22,456.32
              <TrendingUp className="h-4 w-4 ml-1" />
              <span className="ml-1">+235.45 (+1.06%)</span>
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              activeChartPeriod === "1D"
                ? "bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 font-medium"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveChartPeriod("1D")}
          >
            1D
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              activeChartPeriod === "1W"
                ? "bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 font-medium"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveChartPeriod("1W")}
          >
            1W
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              activeChartPeriod === "1M"
                ? "bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 font-medium"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveChartPeriod("1M")}
          >
            1M
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              activeChartPeriod === "1Y"
                ? "bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 font-medium"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveChartPeriod("1Y")}
          >
            1Y
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              activeChartPeriod === "ALL"
                ? "bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 font-medium"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveChartPeriod("ALL")}
          >
            ALL
          </button>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={stockData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e0e0e0"
            />
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
            />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#fff",
                borderRadius: "8px",
                border: darkMode
                  ? "1px solid #374151"
                  : "1px solid #e5e7eb",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                color: darkMode ? "#f3f4f6" : "#111827",
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#0ea5e9"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              activeDot={{
                r: 6,
                fill: "#0ea5e9",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
          Volume
        </h3>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stockData}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e0e0e0"
              />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#1f2937" : "#fff",
                  borderRadius: "8px",
                  border: darkMode
                    ? "1px solid #374151"
                    : "1px solid #e5e7eb",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  color: darkMode ? "#f3f4f6" : "#111827",
                }}
              />
              <Bar
                dataKey="volume"
                fill="#a5f3fc"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}