import React from "react";
import Card from "./Card";
import { FaCogs, FaClock, FaBell, FaChartPie } from "react-icons/fa";

const Footer = () => {
  return (
    <section className="bg-gray-300 dark:bg-zinc-900 py-10 px-2 text-center transition-colors duration-300">
      <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">
        Why Choose SmartQuant
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
        Our platform combines cutting-edge AI technology with comprehensive market data and Current Global News to deliver accurate stock predictions.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Card
          icon={<FaCogs size={24} />}
          title="Advanced Analytics"
          description="Powerful algorithms that analyze thousands of data points for accurate predictions."
        />
        <Card
          icon={<FaClock size={24} />}
          title="Real-Time Updates"
          description="Stay informed with real-time market data and instant prediction updates."
        />
        <Card
          icon={<FaBell size={24} />}
          title="Customizable Alerts"
          description="Set up personalized alerts for specific stocks or market conditions."
        />
        <Card
          icon={<FaChartPie size={24} />}
          title="Portfolio Integration"
          description="Seamlessly integrate with your existing portfolios for comprehensive analysis."
        />
      </div>
    </section>
  );
};

export default Footer;




// import React from "react";
// import Card from "./Card";
// import { FaCogs, FaClock, FaBell, FaChartPie } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <section className="transition-colors duration-300 bg to-white dark:to-black py-10 px-2 text-center">
//       <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
//         Why Choose SmartQuant
//       </h2>
//       <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
//         Our platform combines cutting-edge AI technology with comprehensive market data and Current Global News to deliver accurate stock predictions.
//       </p>
//       <div className="flex flex-wrap justify-center gap-4">
//         <Card
//           icon={<FaCogs size={24} />}
//           title="Advanced Analytics"
//           description="Powerful algorithms that analyze thousands of data points for accurate predictions."
//         />
//         <Card
//           icon={<FaClock size={24} />}
//           title="Real-Time Updates"
//           description="Stay informed with real-time market data and instant prediction updates."
//         />
//         <Card
//           icon={<FaBell size={24} />}
//           title="Customizable Alerts"
//           description="Set up personalized alerts for specific stocks or market conditions."
//         />
//         <Card
//           icon={<FaChartPie size={24} />}
//           title="Portfolio Integration"
//           description="Seamlessly integrate with your existing portfolios for comprehensive analysis."
//         />
//       </div>
//     </section>
//   );
// };

// export default Footer;
