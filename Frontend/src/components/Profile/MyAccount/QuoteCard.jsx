import React from "react";

const QuoteCard = ({ quote, author }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 border border-yellow-100 dark:border-yellow-800/30 text-yellow-800 dark:text-yellow-200 p-4 rounded-xl text-center">
      <p className="font-medium">🎯 <strong>Today's Goal:</strong> {quote}</p>
      {author && <p className="text-xs mt-1">- {author}</p>}
    </div>
  );
};

export default QuoteCard;