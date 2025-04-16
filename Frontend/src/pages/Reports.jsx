// import React from "react";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar1";

// const Reports = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black flex items-center justify-center px-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 max-w-md w-full text-center"
//         >
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
//             News Report Page
//           </h1>
//           <p className="text-lg text-gray-600 dark:text-gray-300">
//             Adding the feature soon...
//           </p>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default Reports;



// import React from "react";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar1";
// import { Newspaper, TrendingUp, Clock } from "lucide-react";

// const sampleNews = [
//   {
//     title: "Tech Stocks Rally as Market Rebounds",
//     source: "Bloomberg",
//     time: "2 hours ago",
//     summary: "Major tech companies saw significant gains today as the market responded positively to economic data.",
//     link: "#",
//   },
//   {
//     title: "Federal Reserve Signals Interest Rate Pause",
//     source: "Reuters",
//     time: "4 hours ago",
//     summary: "The Federal Reserve indicated a potential pause in interest rate hikes, impacting financial markets.",
//     link: "#",
//   },
//   {
//     title: "Oil Prices Surge Amid Supply Concerns",
//     source: "CNBC",
//     time: "6 hours ago",
//     summary: "Global oil prices increased due to concerns over supply disruptions in key regions.",
//     link: "#",
//   },
// ];

// const Reports = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white dark:from-gray-900 dark:to-black px-6 py-12">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-center mb-12">
//             <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
//               Market News & Reports
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 text-lg">
//               Stay updated with the latest stock market news
//             </p>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             {sampleNews.map((news, index) => (
//               <div
//                 key={index}
//                 className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
//               >
//                 <div className="flex items-center mb-4">
//                   <Newspaper className="h-6 w-6 text-indigo-600 mr-2" />
//                   <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                     {news.title}
//                   </h2>
//                 </div>
//                 <p className="text-gray-600 dark:text-gray-400 mb-4">
//                   {news.summary}
//                 </p>
//                 <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
//                   <span className="flex items-center">
//                     <TrendingUp className="h-4 w-4 mr-1" />
//                     {news.source}
//                   </span>
//                   <span className="flex items-center">
//                     <Clock className="h-4 w-4 mr-1" />
//                     {news.time}
//                   </span>
//                 </div>
//                 <a
//                   href={news.link}
//                   className="mt-4 inline-block text-indigo-600 hover:underline"
//                 >
//                   Read more
//                 </a>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Reports;




import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar1";
import { 
  Newspaper, 
  TrendingUp, 
  Clock, 
  Search, 
  Filter, 
  Bell, 
  BookmarkPlus, 
  Share2, 
  ChevronRight, 
  ArrowRight,
  BarChart2
} from "lucide-react";

const sampleNews = [
  {
    id: 1,
    title: "Tech Stocks Rally as Market Rebounds",
    source: "Bloomberg",
    time: "2 hours ago",
    summary: "Major tech companies saw significant gains today as the market responded positively to economic data.",
    link: "#",
    category: "Technology",
    impact: "high"
  },
  {
    id: 2,
    title: "Federal Reserve Signals Interest Rate Pause",
    source: "Reuters",
    time: "4 hours ago",
    summary: "The Federal Reserve indicated a potential pause in interest rate hikes, impacting financial markets.",
    link: "#",
    category: "Economy",
    impact: "high"
  },
  {
    id: 3,
    title: "Oil Prices Surge Amid Supply Concerns",
    source: "CNBC",
    time: "6 hours ago",
    summary: "Global oil prices increased due to concerns over supply disruptions in key regions.",
    link: "#",
    category: "Commodities",
    impact: "medium"
  },
  {
    id: 4,
    title: "European Markets Close Higher on Strong Earnings",
    source: "Financial Times",
    time: "3 hours ago",
    summary: "European stock markets closed higher as major companies reported better-than-expected quarterly earnings.",
    link: "#",
    category: "Global Markets",
    impact: "medium"
  },
  {
    id: 5,
    title: "Crypto Market Sees Significant Volatility",
    source: "CoinDesk",
    time: "1 hour ago",
    summary: "Cryptocurrency markets experienced notable price swings following regulatory announcements.",
    link: "#",
    category: "Cryptocurrency",
    impact: "medium"
  },
  {
    id: 6,
    title: "Manufacturing Data Shows Expansion",
    source: "MarketWatch",
    time: "5 hours ago",
    summary: "The latest manufacturing PMI data indicates an expansion in the sector, beating analyst expectations.",
    link: "#",
    category: "Economy",
    impact: "low"
  },
];

const categories = ["All", "Technology", "Economy", "Commodities", "Global Markets", "Cryptocurrency"];

const Reports = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);

  // Filter news based on active category and search query
  const filteredNews = sampleNews.filter(news => {
    const matchesCategory = activeCategory === "All" || news.category === activeCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          news.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSaved = (id) => {
    if (savedArticles.includes(id)) {
      setSavedArticles(savedArticles.filter(articleId => articleId !== id));
    } else {
      setSavedArticles([...savedArticles, id]);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white dark:from-gray-900 dark:to-gray-800 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                  Market <span className="text-indigo-600 dark:text-indigo-400">News & Reports</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Stay updated with the latest market movements and financial news
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Bell className="h-4 w-4" />
                  Alerts
                </button>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Market Snapshot */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-indigo-600" />
                  Market Snapshot
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">Last updated: 15 minutes ago</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "S&P 500", value: "4,872.56", change: "+1.25%", up: true },
                  { name: "Nasdaq", value: "15,436.78", change: "+1.78%", up: true },
                  { name: "Dow Jones", value: "35,783.21", change: "+0.89%", up: true },
                  { name: "10Y Treasury", value: "3.85%", change: "-0.07%", up: false },
                ].map((index) => (
                  <div key={index.name} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{index.name}</div>
                    <div className="text-lg font-medium text-gray-800 dark:text-white">{index.value}</div>
                    <div className={`text-sm ${index.up ? 'text-green-600' : 'text-red-600'}`}>
                      {index.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto pb-2 mb-8 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? "bg-indigo-600 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
              <button className="px-4 py-2 mr-2 rounded-full whitespace-nowrap bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center">
                <Filter className="h-4 w-4 mr-1" />
                More Filters
              </button>
            </div>
          </motion.div>

          {/* Breaking News Banner */}
          {activeCategory === "All" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-600 p-4 mb-8 rounded-r-lg"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">BREAKING</span>
                </div>
                <div className="ml-3">
                  <p className="text-red-800 dark:text-red-200 font-medium">Major Central Banks announce coordinated policy action</p>
                </div>
                <div className="ml-auto">
                  <a href="#" className="text-red-700 dark:text-red-300 hover:underline text-sm flex items-center">
                    Read more <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* News Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredNews.length > 0 ? (
              filteredNews.map((news) => (
                <motion.div
                  key={news.id}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        news.impact === "high" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                        news.impact === "medium" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      }`}>
                        {news.impact === "high" ? "High Impact" : news.impact === "medium" ? "Medium Impact" : "Low Impact"}
                      </span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
                        {news.category}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                      {news.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {news.summary}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Newspaper className="h-4 w-4 mr-1" />
                      <span className="mr-3">{news.source}</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{news.time}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto border-t border-gray-100 dark:border-gray-700 p-4 flex items-center justify-between">
                    <a
                      href={news.link}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center"
                    >
                      Read full article <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => toggleSaved(news.id)}
                        className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          savedArticles.includes(news.id) ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'
                        }`}
                      >
                        <BookmarkPlus className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Newspaper className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">No news found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </motion.div>
          
          {/* View More Button */}
          {filteredNews.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 text-center"
            >
              <button className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-6 py-3 rounded-lg font-medium transition-colors">
                View More Articles
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reports;