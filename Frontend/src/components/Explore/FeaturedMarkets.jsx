// src/components/explore/FeaturedMarkets.js
export default function FeaturedMarkets({ marketData }) {
  // Find top gainers by sorting the market data by change24h in descending order
  const topGainers = [...marketData]
    .filter(item => item.change24h > 0)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 3);
  
  // Find most active by volume
  const mostActive = [...marketData]
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, 3);
  
  // For new listings, we'd typically use a 'listedAt' date field
  // For demo purposes, just using the last items in the array
  const newListings = [
    { id: 9, name: 'Arbitrum', symbol: 'ARB', color: 'yellow' },
    { id: 10, name: 'Sui', symbol: 'SUI', color: 'green' },
    { id: 11, name: 'Pyth Network', symbol: 'PYTH', color: 'orange' }
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Featured Markets</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeaturedCard 
          title="Top Gainers"
          items={topGainers.map(item => ({
            id: item.id,
            name: item.name,
            symbol: item.symbol,
            value: `+${item.change24h}%`,
            valueClass: 'text-green-500'
          }))}
        />
        
        <FeaturedCard 
          title="Most Active"
          items={mostActive.map(item => ({
            id: item.id,
            name: item.name,
            symbol: item.symbol,
            value: `$${item.volume24h}B vol`,
            valueClass: 'text-sm'
          }))}
        />
        
        <FeaturedCard 
          title="New Listings"
          items={newListings}
          showButton={true}
        />
      </div>
    </div>
  );
}

function FeaturedCard({ title, items, showButton = false }) {
  // Map color names to Tailwind classes
  const getColorClass = (color) => {
    const colorMap = {
      red: 'bg-red-100 dark:bg-red-900',
      blue: 'bg-blue-100 dark:bg-blue-900',
      green: 'bg-green-100 dark:bg-green-900',
      purple: 'bg-purple-100 dark:bg-purple-900',
      yellow: 'bg-yellow-100 dark:bg-yellow-900',
      orange: 'bg-orange-100 dark:bg-orange-900'
    };
    
    return colorMap[color] || 'bg-gray-100 dark:bg-gray-600';
  };
  
  // Get color based on first letter of symbol
  const getColorForSymbol = (symbol) => {
    const firstChar = symbol.charAt(0).toLowerCase();
    const colors = ['red', 'blue', 'green', 'purple', 'yellow', 'orange'];
    const index = firstChar.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 transition-transform duration-200 hover:scale-102">
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center">
              <div className={`w-8 h-8 ${item.color ? getColorClass(item.color) : getColorClass(getColorForSymbol(item.symbol))} rounded-full flex items-center justify-center mr-3 text-gray-700 dark:text-gray-300`}>
                {item.symbol.substring(0, 1)}
              </div>
              <p>{item.name} ({item.symbol})</p>
            </div>
            {showButton ? (
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors">
                Trade
              </button>
            ) : (
              <p className={item.valueClass || ''}>{item.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}