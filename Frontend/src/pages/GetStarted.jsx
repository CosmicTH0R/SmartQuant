// code if u want to put demo video of the app
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function GetStartedTeaser() {
  const navigate = useNavigate();

  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-200 to-white dark:from-gray-900 dark:to-black px-6 py-16 text-gray-800 dark:text-white">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        >
        Your Personal Investment AI — Ready to Help
      </motion.h1>

      <motion.p
        className="text-center max-w-xl text-base text-gray-600 dark:text-gray-300 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        >
        From market scans to precise predictions, SmartQuant empowers you to invest with clarity and speed.
      </motion.p>

      <motion.div
        className="w-full max-w-3xl h-[320px] bg-gray-200 dark:bg-[#1c2a3a] rounded-xl overflow-hidden shadow mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          >
          <source src="/smartquant-demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      <button
        onClick={() => navigate("/signup")}
        className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg text-lg font-semibold hover:scale-105 transition"
        >
        Try SmartQuant Now →
      </button>
    </div>
        </>
  );
}



//code if u want to put screenshot of what user will get after sign in 
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// const images = [
//   "/slides/slide1.png",
//   "/slides/slide2.png",
//   "/slides/slide3.png",
// ]; // Place your images in the public/slides folder

// export default function GetStartedTeaser() {
//   const navigate = useNavigate();
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 3500); // Slide every 3.5 seconds
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-200 to-white dark:from-gray-900 dark:to-black px-6 py-16 text-gray-800 dark:text-white">
//       <motion.h1
//         className="text-4xl md:text-5xl font-bold text-center mb-6"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         Your Personal Investment AI — Ready to Help
//       </motion.h1>

//       <motion.p
//         className="text-center max-w-xl text-base text-gray-600 dark:text-gray-300 mb-10"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.4 }}
//       >
//         From market scans to precise predictions, SmartQuant empowers you to invest with clarity and speed.
//       </motion.p>

//       <div className="w-full max-w-3xl h-[320px] rounded-xl overflow-hidden shadow mb-12 relative">
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={images[current]}
//             src={images[current]}
//             alt={`Slide ${current + 1}`}
//             className="w-full h-full object-cover rounded-xl"
//             initial={{ opacity: 0.2, scale: 1.02 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.98 }}
//             transition={{ duration: 0.8 }}
//           />
//         </AnimatePresence>
//       </div>

//       <button
//         onClick={() => navigate("/signup")}
//         className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg text-lg font-semibold hover:scale-105 transition"
//       >
//         Try SmartQuant Now →
//       </button>
//     </div>
//   );
// }
