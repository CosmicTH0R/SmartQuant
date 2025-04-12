import React from 'react';

const stocks = [
  { name: 'Mastek', price: '₹2,137.30', change: '163.30 (8.27%)' },
  { name: 'BSE', price: '₹5,548.35', change: '10.15 (0.18%)' },
  { name: 'Jyothy Labs', price: '₹379.60', change: '35.35 (10.27%)' },
  { name: 'Ramkrishna Forgings', price: '₹740.40', change: '11.15 (1.53%)' }
];

const MostTraded = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Most traded on SmartQuant</h2>
      <div className="grid grid-cols-4 gap-4">
        {stocks.map((stock, i) => (
          <div key={i} className="border rounded-lg p-4">
            <p className="font-semibold">{stock.name}</p>
            <p>{stock.price}</p>
            <p className="text-green-500">{stock.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostTraded;
