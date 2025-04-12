// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { motion } from "framer-motion";
// import { BarChart4, Brain, SignalHigh, Rocket } from "lucide-react";

// import Navbar from "@/components/Navbar";
// import FAQCard from "@/components/ui/FaqCard";

// const steps = [
//   {
//     icon: <BarChart4 className="w-8 h-8 text-green-400" />,
//     title: "We Gather Smart Data",
//     desc: "We collect and analyze real-time stock market data, news trends, historical price patterns, and more — so you don’t have to.",
//     note: "From Wall Street whispers to global market movements, we track it all.",
//   },
//   {
//     icon: <Brain className="w-8 h-8 text-purple-400" />,
//     title: "Our AI Does the Heavy Lifting",
//     desc: "Our machine learning models crunch the numbers, identify trends, and predict price movements with precision.",
//     note: "Thousands of data points, millions of calculations — all in seconds.",
//   },
//   {
//     icon: <SignalHigh className="w-8 h-8 text-yellow-400" />,
//     title: "You Get Clear Investment Signals",
//     desc: "Your dashboard shows simple, actionable insights: buy/sell signals, risk analysis, and timing suggestions — personalized to your style.",
//     note: "No guesswork. Just smart moves.",
//   },
//   {
//     icon: <Rocket className="w-8 h-8 text-blue-400" />,
//     title: "You Invest Smarter",
//     desc: "With real-time predictions and guidance, you make better, faster, and more confident investment decisions.",
//     note: "Your money, your moves — backed by data.",
//   },
// ];

// export default function HowItWorks() {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-[#0e1623] text-white px-6 py-12 md:px-20">
//         <motion.h1
//           className="text-4xl md:text-5xl font-bold mb-10"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           Here’s How SmartQuant Makes You a Smarter Investor
//         </motion.h1>

//         <div className="grid gap-8 md:grid-cols-2">
//           {steps.map((step, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: idx * 0.2 }}
//               viewport={{ once: true }}
//             >
//               <Card className="bg-[#1c2a3a] text-white rounded-2xl shadow-lg">
//                 <CardContent className="p-6">
//                   <div className="flex items-center gap-3 mb-4">
//                     {step.icon}
//                     <h2 className="text-2xl font-semibold">{step.title}</h2>
//                   </div>
//                   <p className="text-base mb-1">{step.desc}</p>
//                   <p className="text-sm text-gray-400 italic">“{step.note}”</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//       <FAQCard/>

//         <div className="mt-16">
//           <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
//           <div className="grid gap-6 md:grid-cols-2">
//             <Card className="bg-[#1c2a3a] text-white rounded-2xl shadow">
//               <CardContent className="p-6">
//                 <p className="italic">
//                   “I finally feel in control of my investments. SmartQuant’s
//                   insights are game-changing.”
//                 </p>
//                 <p className="mt-4 font-semibold">
//                   — Aakash M., Retail Investor
//                 </p>
//               </CardContent>
//             </Card>
//             <Card className="bg-[#1c2a3a] text-white rounded-2xl shadow">
//               <CardContent className="p-6">
//                 <p className="italic">
//                   “It’s like having a personal data scientist in my pocket.”
//                 </p>
//                 <p className="mt-4 font-semibold">— Priya R., Entrepreneur</p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart4, Brain, SignalHigh, Rocket } from "lucide-react";

import Navbar from "@/components/Navbar";
import FAQCard from "@/components/ui/FaqCard";

const steps = [
  {
    icon: <BarChart4 className="w-8 h-8 text-green-400" />,
    title: "We Gather Smart Data",
    desc: "We collect and analyze real-time stock market data, news trends, historical price patterns, and more — so you don’t have to.",
    note: "From Wall Street whispers to global market movements, we track it all.",
  },
  {
    icon: <Brain className="w-8 h-8 text-purple-400" />,
    title: "Our AI Does the Heavy Lifting",
    desc: "Our machine learning models crunch the numbers, identify trends, and predict price movements with precision.",
    note: "Thousands of data points, millions of calculations — all in seconds.",
  },
  {
    icon: <SignalHigh className="w-8 h-8 text-yellow-400" />,
    title: "You Get Clear Investment Signals",
    desc: "Your dashboard shows simple, actionable insights: buy/sell signals, risk analysis, and timing suggestions — personalized to your style.",
    note: "No guesswork. Just smart moves.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-blue-400" />,
    title: "You Invest Smarter",
    desc: "With real-time predictions and guidance, you make better, faster, and more confident investment decisions.",
    note: "Your money, your moves — backed by data.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white text-black px-6 py-12 md:px-20 dark:bg-gradient-to-b dark:from-gray-800 dark:to-black dark:text-white">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Here’s How SmartQuant Makes You a Smarter Investor
        </motion.h1>

        <div className="grid gap-8 md:grid-cols-2">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white text-black rounded-2xl shadow-lg dark:bg-[#1c2a3a] dark:text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {step.icon}
                    <h2 className="text-2xl font-semibold">{step.title}</h2>
                  </div>
                  <p className="text-base mb-1">{step.desc}</p>
                  <p className="text-sm text-gray-400 italic dark:text-gray-300">“{step.note}”</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <FAQCard/>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white text-black rounded-2xl shadow dark:bg-[#1c2a3a] dark:text-white">
              <CardContent className="p-6">
                <p className="italic">
                  “I finally feel in control of my investments. SmartQuant’s
                  insights are game-changing.”
                </p>
                <p className="mt-4 font-semibold">— Aakash M., Retail Investor</p>
              </CardContent>
            </Card>
            <Card className="bg-white text-black rounded-2xl shadow dark:bg-[#1c2a3a] dark:text-white">
              <CardContent className="p-6">
                <p className="italic">
                  “It’s like having a personal data scientist in my pocket.”
                </p>
                <p className="mt-4 font-semibold">— Priya R., Entrepreneur</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
