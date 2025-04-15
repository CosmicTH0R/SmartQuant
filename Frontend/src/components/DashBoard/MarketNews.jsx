import React from 'react';
import { PieChart, Activity, Briefcase } from 'lucide-react';

export default function MarketNews() {
  return (
    <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Market News
        </h2>
        <button className="text-sky-500 hover:text-sky-600 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
          <div className="h-40 bg-gradient-to-r from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30 flex items-center justify-center">
            <PieChart className="h-12 w-12 text-sky-500" />
          </div>
          <div className="p-4">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              April 14, 2025 • 2 hours ago
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              Q1 Earnings Season Kicks Off: What to Expect
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Major banks report strong earnings, setting a positive tone
              for the quarter's reporting season.
            </p>
            <button className="text-sky-500 hover:text-sky-600 text-sm font-medium">
              Read More
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
          <div className="h-40 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
            <Activity className="h-12 w-12 text-green-500" />
          </div>
          <div className="p-4">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              April 14, 2025 • 5 hours ago
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              Federal Reserve Signals Possible Rate Cut
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Markets rally as Fed chair hints at easing monetary policy
              in the coming months.
            </p>
            <button className="text-sky-500 hover:text-sky-600 text-sm font-medium">
              Read More
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
          <div className="h-40 bg-gradient-to-r from-purple-100 to-fuchsia-100 dark:from-purple-900/30 dark:to-fuchsia-900/30 flex items-center justify-center">
            <Briefcase className="h-12 w-12 text-purple-500" />
          </div>
          <div className="p-4">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              April 14, 2025 • 6 hours ago
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              Tech Sector Shows Strong Growth Momentum
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              AI advancements and cloud services continue to drive tech
              company valuations higher.
            </p>
            <button className="text-sky-500 hover:text-sky-600 text-sm font-medium">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}