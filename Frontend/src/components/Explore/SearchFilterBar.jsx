// src/components/explore/SearchFilterBar.js
import { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export default function SearchFilterBar({ 
  searchTerm, 
  setSearchTerm, 
  activeFilter, 
  setActiveFilter, 
  sortConfig, 
  setSortConfig 
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search Input */}
      <div className="flex-grow relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="text-gray-500" size={18} />
        </div>
        <input
          type="text"
          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Category Filters */}
      <CategoryFilters 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      
      {/* Sort Filters */}
      <div className="relative">
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          onClick={toggleFilter}
          aria-expanded={isFilterOpen}
          aria-controls="filter-dropdown"
        >
          <Filter size={18} />
          <span>Filters</span>
          {isFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {isFilterOpen && (
          <div id="filter-dropdown" className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 z-10">
            <div className="mb-3">
              <p className="font-semibold mb-2">Sort by</p>
              <select 
                className="w-full bg-gray-100 dark:bg-gray-600 p-2 rounded"
                onChange={(e) => setSortConfig({...sortConfig, key: e.target.value})}
                value={sortConfig.key}
              >
                <option value="marketCap">Market Cap</option>
                <option value="price">Price</option>
                <option value="change24h">24h Change</option>
                <option value="volume24h">24h Volume</option>
              </select>
            </div>
            <div className="mb-3">
              <p className="font-semibold mb-2">Order</p>
              <div className="flex gap-2">
                <button 
                  className={`flex-1 p-2 rounded ${sortConfig.direction === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-600'}`}
                  onClick={() => setSortConfig({...sortConfig, direction: 'desc'})}
                >
                  Desc
                </button>
                <button 
                  className={`flex-1 p-2 rounded ${sortConfig.direction === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-600'}`}
                  onClick={() => setSortConfig({...sortConfig, direction: 'asc'})}
                >
                  Asc
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryFilters({ activeFilter, setActiveFilter }) {
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'stock', label: 'Stocks' }
  ];
  
  return (
    <div className="flex gap-2">
      {categories.map(category => (
        <button 
          key={category.id}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeFilter === category.id 
              ? 'bg-blue-500 text-white' 
              : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
          onClick={() => setActiveFilter(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}