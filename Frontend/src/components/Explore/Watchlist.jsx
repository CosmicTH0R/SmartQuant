import React from 'react';

const Watchlist = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">All watchlists</h2>
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center">
          <p>My Watchlist</p>
          <span>5 items</span>
        </div>
        <button className="mt-4 text-green-500 flex items-center gap-2">
          <span className="text-xl">+</span> Create new watchlist
        </button>
      </div>
    </div>
  );
};

export default Watchlist;
