import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqList = [
  {
    question: "How accurate is it?",
    answer:
      "Our AI has shown up to 78–85% predictive accuracy in backtests, and we’re always improving.",
  },
  {
    question: "Is my data secure?",
    answer:
      "100%. We use bank-grade encryption. Your personal data is never sold or shared.",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "Not at all. Whether you're a beginner or a pro, SmartQuant works for you.",
  },
];

const FAQCard = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="bg-gradient-to-b from-sky-200 to-white text-black rounded-md py-12 px-6 md:px-20 dark:bg-gradient-to-b dark:from-gray-800 dark:to-black dark:text-white my-10">
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqList.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white text-black rounded-xl p-4 cursor-pointer shadow hover:shadow-lg transition dark:bg-[#1c2a3a] dark:text-white"
            onClick={() => toggle(idx)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <HelpCircle className="text-blue-400 dark:text-blue-300" />
            </div>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.p
                  className="text-sm text-gray-500 mt-2 dark:text-gray-300"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQCard;
