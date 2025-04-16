import React, { useState } from "react";
import { Banknote, PlusCircle, MinusCircle, RefreshCw, Shield, CreditCard, AlertCircle, CheckCircle, Clock, ChevronDown, X } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar1";

const transactions = [
  { id: 1, type: "Deposit", amount: "+$1,000.00", date: "Apr 15, 2025", status: "Completed", description: "Bank transfer" },
  { id: 2, type: "Withdrawal", amount: "-$200.00", date: "Apr 14, 2025", status: "Pending", description: "To HDFC Bank" },
  { id: 3, type: "Transfer", amount: "-$100.00", date: "Apr 12, 2025", status: "Completed", description: "To Trading Account" },
  { id: 4, type: "Deposit", amount: "+$500.00", date: "Apr 10, 2025", status: "Completed", description: "Credit card" },
  { id: 5, type: "Withdrawal", amount: "-$350.00", date: "Apr 08, 2025", status: "Completed", description: "To Bank Account" },
];

export default function Wallet() {
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [expandedTxn, setExpandedTxn] = useState(null);
  const [timeFilter, setTimeFilter] = useState("all");

  const handleAddFunds = (e) => {
    e.preventDefault();
    // Process adding funds logic would go here
    setShowAddFundsModal(false);
    setAmount("");
  };

  const toggleTxnDetails = (id) => {
    setExpandedTxn(expandedTxn === id ? null : id);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white dark:from-gray-900 dark:to-black px-4 py-10 transition-colors">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">SmartQuant Wallet</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your funds and transactions</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Balance Summary */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-white font-medium">Available Balance</h2>
                    <Banknote className="w-6 h-6 text-white opacity-70" />
                  </div>
                  <div className="mt-4 mb-2">
                    <span className="text-4xl font-bold text-white">$5,120.00</span>
                    <span className="text-white opacity-80 ml-2">USD</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-gray-500 dark:text-gray-400">Updated 5 minutes ago</span>
                    <span className="flex items-center text-green-500">
                      <CheckCircle className="w-4 h-4 mr-1" /> Verified
                    </span>
                  </div>
                  
                  <div className="mt-6 flex flex-col gap-3">
                    <button 
                      onClick={() => setShowAddFundsModal(true)}
                      className="bg-indigo-600 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:bg-indigo-700 transition shadow-md"
                    >
                      <PlusCircle className="w-5 h-5" /> Add Cash
                    </button>
                    <button className="bg-amber-500 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:bg-amber-600 transition shadow-md">
                      <MinusCircle className="w-5 h-5" /> Withdraw
                    </button>
                    <button className="bg-purple-600 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:bg-purple-700 transition shadow-md">
                      <RefreshCw className="w-5 h-5" /> Transfer
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Linked Accounts */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Linked Accounts</h2>
                <div className="space-y-4">
                  <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                        <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">HDFC Bank</div>
                        <div className="text-xs text-gray-500">•••• 4291</div>
                      </div>
                    </div>
                    <button className="text-red-500 hover:text-red-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
                        <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">Axis Bank</div>
                        <div className="text-xs text-gray-500">•••• 7824</div>
                      </div>
                    </div>
                    <button className="text-red-500 hover:text-red-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center">
                    <PlusCircle className="w-4 h-4 mr-1" /> Add New Account
                  </button>
                </div>
              </motion.div>

              {/* Security Info */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Security</h2>
                <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200">2-Factor Authentication</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Your account is protected with additional security</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Daily withdrawal limit</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">$5,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Security status</span>
                    <span className="text-sm font-medium text-green-500">Strong</span>
                  </div>
                  <button className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                    Manage Security Settings
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Transactions */}
            <motion.div 
              className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Transactions</h2>
                  <div className="relative">
                    <select 
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg py-1 pl-3 pr-8 text-sm appearance-none"
                    >
                      <option value="all">All Time</option>
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-2 top-2 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total In</div>
                    <div className="text-lg font-semibold text-green-500">+$1,500.00</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Out</div>
                    <div className="text-lg font-semibold text-red-500">-$650.00</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Net</div>
                    <div className="text-lg font-semibold text-blue-500">+$850.00</div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-96">
                {transactions.map((txn) => (
                  <div 
                    key={txn.id} 
                    className="border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => toggleTxnDetails(txn.id)}
                  >
                    <div className="p-4 flex justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          txn.type === "Deposit" 
                            ? "bg-green-100 dark:bg-green-900/30 text-green-500" 
                            : txn.type === "Withdrawal"
                            ? "bg-red-100 dark:bg-red-900/30 text-red-500"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-500"
                        }`}>
                          {txn.type === "Deposit" && <PlusCircle className="w-5 h-5" />}
                          {txn.type === "Withdrawal" && <MinusCircle className="w-5 h-5" />}
                          {txn.type === "Transfer" && <RefreshCw className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">{txn.type}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{txn.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${txn.amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                          {txn.amount}
                        </div>
                        <div className="flex items-center text-xs mt-1 justify-end">
                          {txn.status === "Completed" && (
                            <span className="flex items-center text-green-500">
                              <CheckCircle className="w-3 h-3 mr-1" /> {txn.status}
                            </span>
                          )}
                          {txn.status === "Pending" && (
                            <span className="flex items-center text-amber-500">
                              <Clock className="w-3 h-3 mr-1" /> {txn.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded Transaction Details */}
                    {expandedTxn === txn.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="px-4 pb-4 pt-0 text-sm"
                      >
                        <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-3 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <div className="text-gray-500 dark:text-gray-400">Transaction ID</div>
                              <div className="text-gray-800 dark:text-gray-200 font-mono">TXN-{Math.random().toString(36).substring(2, 10).toUpperCase()}</div>
                            </div>
                            <div>
                              <div className="text-gray-500 dark:text-gray-400">Date & Time</div>
                              <div className="text-gray-800 dark:text-gray-200">{txn.date}, 14:30</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">Description</div>
                            <div className="text-gray-800 dark:text-gray-200">{txn.description}</div>
                          </div>
                          <div className="text-right">
                            <button className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs">
                              View Receipt
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-center">
                <button className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline">
                  View All Transactions
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddFundsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Add Funds</h3>
              <button 
                onClick={() => setShowAddFundsModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddFunds}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount
                </label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payment Method
                </label>
                <div className="space-y-3">
                  <div 
                    className={`flex items-center p-4 border ${paymentMethod === "bank" 
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" 
                      : "border-gray-200 dark:border-gray-700"} rounded-xl cursor-pointer`}
                    onClick={() => setPaymentMethod("bank")}
                  >
                    <input
                      type="radio"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="ml-3 flex items-center justify-between w-full">
                      <div>
                        <p className="text-gray-800 dark:text-gray-200 font-medium">Bank Account</p>
                        <p className="text-gray-500 text-sm">HDFC Bank •••• 4291</p>
                      </div>
                      <Banknote className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div 
                    className={`flex items-center p-4 border ${paymentMethod === "card" 
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" 
                      : "border-gray-200 dark:border-gray-700"} rounded-xl cursor-pointer`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <input
                      type="radio"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="ml-3 flex items-center justify-between w-full">
                      <div>
                        <p className="text-gray-800 dark:text-gray-200 font-medium">Credit/Debit Card</p>
                        <p className="text-gray-500 text-sm">Visa •••• 8765</p>
                      </div>
                      <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg flex items-start gap-2 mb-6">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Funds will be available in your wallet immediately after successful transaction.
                </p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddFundsModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
                >
                  Add Funds
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}