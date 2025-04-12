import React from 'react';

const data = [
  { name: 'NIFTY', value: '22,399.15', change: '-136.70 (0.61%)' },
  { name: 'SENSEX', value: '73,847.15', change: '-379.93 (0.51%)' },
  { name: 'BANKNIFTY', value: '50,240.15', change: '-270.85 (0.54%)' },
  { name: 'MID', value: '11,000.00', change: '' }
];

const IndicesSection = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Indices</h2>
      <div className="grid grid-cols-4 gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="border p-4 rounded-lg">
            <h3 className="font-semibold">{item.name}</h3>
            <p>{item.value}</p>
            <p className="text-red-500">{item.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndicesSection;
