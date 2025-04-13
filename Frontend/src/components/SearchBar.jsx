import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/stocks/${query.toUpperCase().trim()}`);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto md:mx-0">
      <input
        type="text"
        placeholder="Search stocks, ETFs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-full text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-sm md:text-base"
      />
    </form>
  );
};

export default SearchBar;
