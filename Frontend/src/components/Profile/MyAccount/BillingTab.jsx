import { CreditCard, Check } from 'lucide-react';
import Card from '../../Common/Card';

const BillingTab = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Billing Information</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition">
          Manage Plan
        </button>
      </div>

      <CurrentPlan />
      <PaymentMethods />
      <BillingHistory />
    </div>
  );
};

const CurrentPlan = () => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Current Plan</h3>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-indigo-400 font-bold text-xl">Premium</span>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Billed annually</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">$199.99</span>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Next billing: Jan 2026</p>
        </div>
      </div>
      <div className="mt-5 pt-4 border-t border-gray-300 dark:border-gray-700 space-y-2">
        <PlanFeature text="Unlimited trades" />
        <PlanFeature text="Advanced analytics" />
        <PlanFeature text="Priority support" />
      </div>
    </Card>
  );
};

const PlanFeature = ({ text }) => {
  return (
    <div className="flex items-center gap-2">
      <Check size={16} className="text-green-500" />
      <span className="text-gray-700 dark:text-gray-300">{text}</span>
    </div>
  );
};

const PaymentMethods = () => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Payment Methods</h3>
        <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium">
          + Add new
        </button>
      </div>

      <div className="border border-gray-300 dark:border-gray-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="bg-indigo-700 p-2 rounded-lg">
            <CreditCard size={20} className="text-white" />
          </div>
          <div>
            <p className="text-gray-900 dark:text-white font-medium">•••• •••• •••• 4289</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Expires 09/27</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-green-700 text-white px-2 py-1 rounded-full">Default</span>
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white text-sm">Edit</button>
        </div>
      </div>
    </Card>
  );
};

const BillingHistory = () => {
  const transactions = [
    { date: 'Jan 20, 2025', description: 'Premium Plan (Annual)', amount: '$199.99', status: 'Paid' },
    { date: 'Jan 20, 2024', description: 'Premium Plan (Annual)', amount: '$189.99', status: 'Paid' },
    { date: 'Jan 20, 2023', description: 'Basic Plan (Annual)', amount: '$99.99', status: 'Paid' }
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Billing History</h3>
      <div className="overflow-x-auto rounded-md border border-gray-300 dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600 dark:text-gray-400 text-sm font-medium">Date</th>
              <th className="py-3 px-4 text-left text-gray-600 dark:text-gray-400 text-sm font-medium">Description</th>
              <th className="py-3 px-4 text-left text-gray-600 dark:text-gray-400 text-sm font-medium">Amount</th>
              <th className="py-3 px-4 text-left text-gray-600 dark:text-gray-400 text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 dark:divide-gray-800">
            {transactions.map((tx, idx) => (
              <tr key={idx} className="hover:bg-gray-200 dark:hover:bg-gray-800/50 transition">
                <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{tx.date}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{tx.description}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">{tx.amount}</td>
                <td className="py-3 px-4">
                  <span className="text-xs bg-green-700 text-white px-2 py-1 rounded-full">{tx.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default BillingTab;
