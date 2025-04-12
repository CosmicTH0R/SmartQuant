import React from 'react';

const Tabs = () => {
  return (
    <div className="flex gap-8 px-4 pt-4 border-b">
      {['Stocks', 'F&O', 'Mutual Funds'].map(tab => (
        <div key={tab} className="text-green-500 border-b-2 border-green-500 pb-2 cursor-pointer">
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
