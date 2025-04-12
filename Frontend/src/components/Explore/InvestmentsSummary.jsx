import React from 'react';

const InvestmentsSummary = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Your Investments</h2>
      <div className="border rounded-lg p-4 mt-2 flex justify-between">
        <div>
          <p className="text-gray-500">Total Returns</p>
          <p className="text-xl font-bold">₹0</p>
        </div>
        <div>
          <p className="text-gray-500">Current Value</p>
          <p className="text-xl font-bold">₹0</p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentsSummary;
