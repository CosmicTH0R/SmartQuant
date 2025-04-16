import { DollarSign, TrendingUp, Activity, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AccountSummary() {
  const navigate = useNavigate();
  const handleAddCashClick = () => {
    navigate("/wallet"); // Replace "/wallet" with the actual path to your wallet page
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-all hover:shadow-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Portfolio Value
          </span>
          <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
            <DollarSign className="h-5 w-5 text-sky-500" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            $24,892.75
          </h3>
          <span className="text-green-500 text-sm font-medium flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            2.4%
          </span>
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Updated just now
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-all hover:shadow-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Today's P&L
          </span>
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Activity className="h-5 w-5 text-green-500" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-green-500">+$346.28</h3>
          <span className="text-green-500 text-sm font-medium flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            1.4%
          </span>
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Since trading began
        </div>
      </div>

      {/* <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-all hover:shadow-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Available Cash
          </span>
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <DollarSign className="h-5 w-5 text-indigo-500" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            $5,120.00
          </h3>
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Available for trading
        </div>
      </div> */}

<div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-all hover:shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          Available Cash
        </span>
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <DollarSign className="h-5 w-5 text-indigo-500" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          $5,120.00
        </h3>
      </div>
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Available for trading
      </div>

      {/* Add Cash button */}
      <button
        onClick={handleAddCashClick}
        className="absolute bottom-4 right-4 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Add Cash
      </button>
    </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-all hover:shadow-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Open Positions
          </span>
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Briefcase className="h-5 w-5 text-purple-500" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            12
          </h3>
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Across 5 markets
        </div>
      </div>
    </div>
  );
}