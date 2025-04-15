import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export default function WatchlistSection() {
  // Sample data for the watchlist
  const watchlist = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 156.34,
      changePercent: "2.45",
      isPositive: true
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 327.25,
      changePercent: "1.32",
      isPositive: true
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 2712.83,
      changePercent: "0.87",
      isPositive: true
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 3105.67,
      changePercent: "0.35",
      isPositive: false
    },
    {
      symbol: "TSLA",
      name: "Tesla, Inc.",
      price: 248.92,
      changePercent: "3.21",
      isPositive: true
    }
  ];

  // Sample data for portfolio allocation
  const portfolioData = [
    { name: "Technology", value: 35, color: "bg-sky-500" },
    { name: "Healthcare", value: 25, color: "bg-purple-500" },
    { name: "Energy", value: 20, color: "bg-green-500" },
    { name: "Finance", value: 15, color: "bg-amber-500" },
    { name: "Consumer", value: 5, color: "bg-red-500" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Watchlist
          </h2>
          <button className="text-sky-500 hover:text-sky-600 text-sm font-medium">
            Edit
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  24h Change
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {watchlist.map((stock, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                          {stock.symbol.substring(0, 1)}
                        </span>
                      </div>
                      <span className="font-medium text-sky-600 dark:text-sky-400">
                        {stock.symbol}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {stock.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-800 dark:text-gray-200">
                    ${stock.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    {stock.isPositive ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-500">
                        <TrendingUp className="h-3 w-3 mr-1" />+
                        {stock.changePercent}%
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-500">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        {stock.changePercent}%
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <button className="inline-flex items-center px-3 py-1.5 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/40 rounded-lg text-sm font-medium transition-colors">
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-center">
          <button className="text-sky-500 hover:text-sky-600 text-sm font-medium">
            View All Markets
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 grid grid-cols-1 gap-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            Portfolio Allocation
          </h2>
          <div className="flex items-center justify-center h-48">
            <div className="relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Simple pie chart visual */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#e0e0e0"
                  strokeWidth="1"
                />
                <path
                  d="M50,50 L50,10 A40,40 0 0,1 84.27,38.73 Z"
                  fill="#0ea5e9"
                />
                <path
                  d="M50,50 L84.27,38.73 A40,40 0 0,1 65.45,84.27 Z"
                  fill="#a855f7"
                />
                <path
                  d="M50,50 L65.45,84.27 A40,40 0 0,1 15.73,61.27 Z"
                  fill="#10b981"
                />
                <path
                  d="M50,50 L15.73,61.27 A40,40 0 0,1 15.73,38.73 Z"
                  fill="#f59e0b"
                />
                <path
                  d="M50,50 L15.73,38.73 A40,40 0 0,1 50,10 Z"
                  fill="#ef4444"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  fill="white"
                  stroke="#e0e0e0"
                  strokeWidth="1"
                  className="dark:fill-gray-900"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  $24.9K
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Total Value
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {portfolioData.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-2 rounded-lg border border-gray-100 dark:border-gray-800"
              >
                <div
                  className={`w-3 h-3 rounded-full ${item.color} mr-2`}
                ></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.value}% of portfolio
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    Bought AAPL
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    10:30 AM
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  5 shares at $156.34
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg mr-3">
                <TrendingDown className="h-4 w-4 text-red-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    Sold MSFT
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    09:45 AM
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  2 shares at $327.25
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg mr-3">
                <DollarSign className="h-4 w-4 text-sky-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    Deposit
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Yesterday
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  $1,000.00 added to account
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    Bought TSLA
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Yesterday
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  1 share at $248.92
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button className="w-full text-center text-sky-500 hover:text-sky-600 text-sm font-medium">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}