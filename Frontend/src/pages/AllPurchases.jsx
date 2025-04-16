// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar1";

// const AllPurchases = () => {
//   const [purchases, setPurchases] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);

//   // Mock fetch function for demo purposes
//   const fetchPurchases = async (page) => {
//     const response = await fetch(`api/purchases?page=${page}`);
//     const data = await response.json();
//     setPurchases((prev) => [...prev, ...data]); // Append new data to old data
//   };

//   useEffect(() => {
//     fetchPurchases(page);
//   }, [page]);

//   const handleScroll = (e) => {
//     if (
//       e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight
//     ) {
//       setPage(page + 1); // Load more data when reaching bottom
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const filteredPurchases = purchases.filter((purchase) =>
//     purchase.stockName.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <Navbar />
//       <div
//         className="min-h-screen bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black flex flex-col px-4 py-8"
//         onScroll={handleScroll}
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
//               All Purchases
//             </h1>
//             <input
//               type="text"
//               placeholder="Search by Stock"
//               className="px-4 py-2 border rounded-md"
//               value={search}
//               onChange={handleSearchChange}
//             />
//           </div>

//           <div className="flex gap-4 mb-6">
//             <select className="p-2 rounded-md bg-gray-100 dark:bg-gray-700">
//               <option value="date">Sort by Date</option>
//               <option value="price">Sort by Price</option>
//             </select>
//             <select className="p-2 rounded-md bg-gray-100 dark:bg-gray-700">
//               <option value="all">Filter by Stock</option>
//               <option value="AAPL">AAPL</option>
//               <option value="GOOG">GOOG</option>
//             </select>
//             <button className="p-2 bg-indigo-600 text-white rounded-md">
//               Export CSV
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full table-auto text-left">
//               <thead>
//                 <tr className="bg-gray-100 dark:bg-gray-700">
//                   <th className="px-4 py-2 text-sm font-semibold">Stock Name</th>
//                   <th className="px-4 py-2 text-sm font-semibold">Quantity</th>
//                   <th className="px-4 py-2 text-sm font-semibold">Price</th>
//                   <th className="px-4 py-2 text-sm font-semibold">Total</th>
//                   <th className="px-4 py-2 text-sm font-semibold">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPurchases.map((purchase, index) => (
//                   <tr key={index} className="border-t">
//                     <td className="px-4 py-2 text-sm">{purchase.stockName}</td>
//                     <td className="px-4 py-2 text-sm">{purchase.quantity}</td>
//                     <td className="px-4 py-2 text-sm">{purchase.price}</td>
//                     <td className="px-4 py-2 text-sm">
//                       ${(purchase.quantity * purchase.price).toFixed(2)}
//                     </td>
//                     <td className="px-4 py-2 text-sm">{purchase.date}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Infinite Scroll Loading Indicator */}
//           {page > 1 && (
//             <div className="text-center py-4">
//               <span>Loading...</span>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default AllPurchases;




import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar1";
import { 
  Search, 
  Download, 
  Filter, 
  Calendar, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const AllPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  // Mock data for demonstration
  const mockPurchases = [
    { id: 1, stockName: "AAPL", quantity: 10, price: 175.23, date: "2025-04-15", status: "completed" },
    { id: 2, stockName: "GOOG", quantity: 5, price: 2890.12, date: "2025-04-14", status: "completed" },
    { id: 3, stockName: "MSFT", quantity: 15, price: 412.35, date: "2025-04-13", status: "completed" },
    { id: 4, stockName: "AMZN", quantity: 8, price: 178.45, date: "2025-04-12", status: "completed" },
    { id: 5, stockName: "NVDA", quantity: 20, price: 925.67, date: "2025-04-11", status: "pending" },
    { id: 6, stockName: "TSLA", quantity: 12, price: 187.34, date: "2025-04-10", status: "completed" },
    { id: 7, stockName: "META", quantity: 25, price: 485.90, date: "2025-04-09", status: "completed" },
    { id: 8, stockName: "AMD", quantity: 30, price: 165.22, date: "2025-04-08", status: "failed" },
  ];

  // Mock fetch function for demo purposes
  const fetchPurchases = async (pageNum) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (pageNum === 1) {
      setPurchases(mockPurchases);
    } else {
      // Add more mock data for pagination demo
      const newMockData = mockPurchases.map(item => ({
        ...item,
        id: item.id + (pageNum - 1) * 8,
        date: `2025-04-${Math.max(1, 15 - ((pageNum - 1) * 8 + mockPurchases.indexOf(item)))}`
      }));
      setPurchases(prev => [...prev, ...newMockData]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPurchases(page);
  }, [page]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight * 1.2 && !loading) {
      setPage(page + 1); // Load more data when approaching bottom
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  // Apply filters and sorting
  const processedPurchases = purchases
    .filter((purchase) => {
      // Apply search filter
      const matchesSearch = purchase.stockName.toLowerCase().includes(search.toLowerCase());
      
      // Apply stock filter
      const matchesStockFilter = selectedFilter === "all" || purchase.stockName === selectedFilter;
      
      // Apply date range filter if set
      let matchesDateRange = true;
      if (dateRange.from) {
        matchesDateRange = matchesDateRange && purchase.date >= dateRange.from;
      }
      if (dateRange.to) {
        matchesDateRange = matchesDateRange && purchase.date <= dateRange.to;
      }
      
      return matchesSearch && matchesStockFilter && matchesDateRange;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortField === "date") {
        return sortDirection === "asc" 
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortField === "price") {
        return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortField === "quantity") {
        return sortDirection === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity;
      } else if (sortField === "total") {
        const totalA = a.quantity * a.price;
        const totalB = b.quantity * b.price;
        return sortDirection === "asc" ? totalA - totalB : totalB - totalA;
      }
      return 0;
    });

  const uniqueStocks = Array.from(new Set(purchases.map(p => p.stockName)));
  
  // Stats calculations
  const totalSpent = processedPurchases.reduce((sum, p) => sum + (p.quantity * p.price), 0);
  const totalShares = processedPurchases.reduce((sum, p) => sum + p.quantity, 0);
  const avgPricePerShare = totalShares > 0 ? totalSpent / totalShares : 0;

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-gradient-to-b from-sky-100 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-8 md:px-8"
        onScroll={handleScroll}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Purchase History
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                View and manage all your stock purchases
              </p>
            </div>
            <button 
              onClick={() => fetchPurchases(1)}
              className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md"
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Invested</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <div className="mt-2 flex items-center text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-xs">+5.2% from last month</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md"
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Shares</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalShares.toLocaleString()}</p>
              <div className="mt-2 flex items-center text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-xs">+12 shares this week</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md"
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm">Average Price per Share</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">${avgPricePerShare.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <div className="mt-2 flex items-center text-red-600">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span className="text-xs">-2.1% from last week</span>
              </div>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by stock symbol..."
                  className="pl-10 pr-4 py-2 w-full md:w-64 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                {/* Filter Button */}
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Filter className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300">Filters</span>
                  {isFilterOpen ? 
                    <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-300" /> : 
                    <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  }
                </button>
                
                {/* Export Button */}
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <Download className="h-4 w-4" />
                  Export CSV
                </button>
              </div>
            </div>
            
            {/* Expanded Filters */}
            {isFilterOpen && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock Filter</label>
                  <select 
                    className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                    value={selectedFilter}
                    onChange={handleFilterChange}
                  >
                    <option value="all">All Stocks</option>
                    {uniqueStocks.map(stock => (
                      <option key={stock} value={stock}>{stock}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      name="from"
                      value={dateRange.from}
                      onChange={handleDateRangeChange}
                      className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      name="to"
                      value={dateRange.to}
                      onChange={handleDateRangeChange}
                      className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort("stockName")}
                        className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        Stock
                        {sortField === "stockName" ? (
                          sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="h-4 w-4 opacity-50" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort("quantity")}
                        className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        Quantity
                        {sortField === "quantity" ? (
                          sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="h-4 w-4 opacity-50" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort("price")}
                        className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        Price
                        {sortField === "price" ? (
                          sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="h-4 w-4 opacity-50" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort("total")}
                        className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        Total
                        {sortField === "total" ? (
                          sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="h-4 w-4 opacity-50" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort("date")}
                        className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        Date
                        {sortField === "date" ? (
                          sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="h-4 w-4 opacity-50" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {processedPurchases.length > 0 ? (
                    processedPurchases.map((purchase, index) => (
                      <motion.tr 
                        key={purchase.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-medium mr-3">
                              {purchase.stockName.substring(0, 1)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800 dark:text-white">{purchase.stockName}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">#{purchase.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                          {purchase.quantity.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                          ${purchase.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800 dark:text-white">
                          ${(purchase.quantity * purchase.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                          {new Date(purchase.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${purchase.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                              purchase.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : 
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                            {purchase.status === 'completed' ? 
                              <CheckCircle className="mr-1 h-3 w-3" /> : 
                              purchase.status === 'pending' ? 
                                <RefreshCw className="mr-1 h-3 w-3" /> : 
                                <AlertCircle className="mr-1 h-3 w-3" />
                            }
                            {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                        No purchases found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-center items-center py-6 border-t border-gray-200 dark:border-gray-700">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                <span className="ml-2 text-gray-600 dark:text-gray-400">Loading more data...</span>
              </div>
            )}
            
            {/* End of List Indicator */}
            {!loading && page > 2 && (
              <div className="text-center py-6 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                You've reached the end of your purchase history
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default AllPurchases;