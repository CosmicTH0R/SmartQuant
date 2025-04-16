// import React from "react";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar1";
// import { Mail, Phone, MessageCircle, HelpCircle } from "lucide-react";

// const CustomerSupport = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white dark:from-gray-900 dark:to-black px-6 py-12">
//         <div className="max-w-5xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-center mb-12">
//             <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
//               SmartQuant Customer Support
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 text-lg">
//               How can we help you today?
//             </p>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="grid grid-cols-1 md:grid-cols-2 gap-8"
//           >
//             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
//                 Contact Support
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400 mb-4">
//                 Reach us through email or phone. We’re here to help 24/7.
//               </p>
//               <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
//                 <Mail className="h-5 w-5" />
//                 support@smartquant.com
//               </div>
//               <div className="flex items-center gap-2 mt-2 text-gray-700 dark:text-gray-300">
//                 <Phone className="h-5 w-5" />
//                 +1 234 567 890
//               </div>
//             </div>

//             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
//                 Live Chat
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400 mb-4">
//                 Chat with our support team for immediate help.
//               </p>
//               <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition">
//                 <MessageCircle className="h-5 w-5" />
//                 Start Chat
//               </button>
//             </div>

//             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
//                 Help Center
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400 mb-4">
//                 Browse FAQs, tutorials, and guides.
//               </p>
//               <button className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-lg transition">
//                 <HelpCircle className="h-5 w-5" />
//                 Visit Help Center
//               </button>
//             </div>

//             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
//                 Report a Problem
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400 mb-4">
//                 Let us know if you're experiencing issues.
//               </p>
//               <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition">
//                 Submit a Report
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomerSupport;





import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar1";
import { Mail, Phone, MessageCircle, HelpCircle, Search, ChevronRight, Clock, User, FileText } from "lucide-react";

const CustomerSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
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
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
              How can we <span className="text-indigo-600 dark:text-indigo-400">help you?</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Our customer support team is ready to assist with any questions you might have.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-12 pr-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white"
              />
            </div>
          </motion.div>

          {/* Quick Access Section */}
          <motion.div
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Quick Access</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: <Clock className="h-6 w-6" />, title: "Recent Orders", color: "bg-blue-600" },
                { icon: <User className="h-6 w-6" />, title: "Account Help", color: "bg-green-600" },
                { icon: <FileText className="h-6 w-6" />, title: "Billing Support", color: "bg-purple-600" },
                { icon: <MessageCircle className="h-6 w-6" />, title: "Technical Help", color: "bg-amber-600" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center"
                >
                  <div className={`${item.color} p-3 rounded-full mb-3 text-white`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Support Options */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Contact Support
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our dedicated support team is available 24/7 to assist you with any questions or concerns.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-gray-700 dark:text-gray-300">support@smartquant.com</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-gray-700 dark:text-gray-300">+1 234 567 890</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Live Chat
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Connect instantly with our support team for real-time assistance and quick problem resolution.
              </p>
              <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg">
                <MessageCircle className="h-5 w-5" />
                Start Live Chat
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Knowledge Center
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Browse our comprehensive collection of tutorials, FAQs, and troubleshooting guides.
              </p>
              <button className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg">
                <HelpCircle className="h-5 w-5" />
                Explore Resources
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Report an Issue
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Encountered a problem? Let us know the details so we can resolve it quickly for you.
              </p>
              <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg">
                Submit Issue Report
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </motion.div>
          </motion.div>

          {/* Support Availability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Support agents available now
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Average response time: <span className="font-medium">2 minutes</span>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CustomerSupport;