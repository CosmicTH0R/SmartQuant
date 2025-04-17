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


// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SearchBar = () => {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const searchRef = useRef(null);
//   const navigate = useNavigate();

//   // Popular Indian stocks for quick suggestions
//   const popularStocks = [
//     { symbol: 'RELIANCE.NS', name: 'Reliance Industries' },
//     { symbol: 'TCS.NS', name: 'Tata Consultancy Services' },
//     { symbol: 'HDFCBANK.NS', name: 'HDFC Bank' },
//     { symbol: 'INFY.NS', name: 'Infosys' },
//     { symbol: 'ICICIBANK.NS', name: 'ICICI Bank' },
//   ];

//   // Load recent searches from localStorage
//   useEffect(() => {
//     const savedSearches = localStorage.getItem('recentStockSearches');
//     if (savedSearches) {
//       setRecentSearches(JSON.parse(savedSearches));
//     }
//   }, []);

//   // Close suggestions when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Filter suggestions based on query
//   useEffect(() => {
//     if (!query.trim()) {
//       setSuggestions([]);
//       return;
//     }

//     const filteredStocks = popularStocks.filter(
//       stock => 
//         stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
//         stock.name.toLowerCase().includes(query.toLowerCase())
//     );
    
//     setSuggestions(filteredStocks);
//   }, [query]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;
    
//     const symbol = query.toUpperCase().trim();
//     navigate(`/stocks/${symbol}`);
    
//     // Save to recent searches
//     const updatedSearches = [symbol];
//     recentSearches.forEach(item => {
//       if (item !== symbol && updatedSearches.length < 5) {
//         updatedSearches.push(item);
//       }
//     });
    
//     localStorage.setItem('recentStockSearches', JSON.stringify(updatedSearches));
//     setQuery('');
//     setShowSuggestions(false);
//   };

//   const handleSuggestionClick = (symbol) => {
//     navigate(`/stocks/${symbol}`);
    
//     // Save to recent searches
//     const updatedSearches = [symbol];
//     recentSearches.forEach(item => {
//       if (item !== symbol && updatedSearches.length < 5) {
//         updatedSearches.push(item);
//       }
//     });
    
//     localStorage.setItem('recentStockSearches', JSON.stringify(updatedSearches));
//     setQuery('');
//     setShowSuggestions(false);
//   };

//   return (
//     <div className="relative w-full max-w-md mx-auto md:mx-0" ref={searchRef}>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Search stocks, ETFs..."
//           value={query}
//           onChange={(e) => {
//             setQuery(e.target.value);
//             setShowSuggestions(true);
//           }}
//           onFocus={() => setShowSuggestions(true)}
//           className="w-full px-4 py-2 rounded-full text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-sm md:text-base"
//         />
//       </form>

//       {/* Suggestions dropdown */}
//       {showSuggestions && (query.trim() || recentSearches.length > 0) && (
//         <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//           {query.trim() && suggestions.length > 0 ? (
//             <ul>
//               {suggestions.map((stock) => (
//                 <li 
//                   key={stock.symbol}
//                   className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
//                   onClick={() => handleSuggestionClick(stock.symbol)}
//                 >
//                   <div className="font-medium text-gray-900 dark:text-white">{stock.symbol}</div>
//                   <div className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</div>
//                 </li>
//               ))}
//             </ul>
//           ) : query.trim() ? (
//             <div className="p-3 text-center text-gray-500 dark:text-gray-400">No results found</div>
//           ) : null}

//           {/* Recent searches section */}
//           {!query.trim() && recentSearches.length > 0 && (
//             <div>
//               <p className="px-4 py-1 text-xs text-gray-500 dark:text-gray-400 font-medium">RECENT SEARCHES</p>
//               <ul>
//                 {recentSearches.map((symbol) => (
//                   <li 
//                     key={symbol}
//                     className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white"
//                     onClick={() => handleSuggestionClick(symbol)}
//                   >
//                     {symbol}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Popular stocks section when no query */}
//           {!query.trim() && (
//             <div>
//               <p className="px-4 py-1 text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">POPULAR STOCKS</p>
//               <ul>
//                 {popularStocks.slice(0, 4).map((stock) => (
//                   <li 
//                     key={stock.symbol}
//                     className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
//                     onClick={() => handleSuggestionClick(stock.symbol)}
//                   >
//                     <div className="font-medium text-gray-900 dark:text-white">{stock.symbol}</div>
//                     <div className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;