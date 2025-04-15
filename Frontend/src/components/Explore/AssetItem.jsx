// src/components/explore/AssetItem.js
import { formatCurrency, formatMarketCap } from './MarketDataService';

export default function AssetItem({ item, showAction = true }) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <AssetIcon symbol={item.symbol} category={item.category} />
          <div className="ml-4">
            <div className="text-sm font-medium">{item.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{item.symbol}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        ${formatCurrency(item.price)}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${item.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {item.change24h >= 0 ? '+' : ''}{item.change24h}%
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
        {formatMarketCap(item.marketCap)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
        ${formatCurrency(item.volume24h)}B
      </td>
      {showAction && (
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <ActionButton asset={item} />
        </td>
      )}
    </tr>
  );
}

function AssetIcon({ symbol, category }) {
  // Category-specific colors
  const getCategoryColor = (category) => {
    switch(category) {
      case 'crypto':
        return 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200';
      case 'stock':
        return 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200';
      default:
        return 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full ${getCategoryColor(category)} font-medium`}>
      {symbol.substring(0, 2)}
    </div>
  );
}

function ActionButton({ asset }) {
  return (
    <button 
      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm transition-colors"
      onClick={() => alert(`Trading ${asset.name} not implemented in this demo`)}
    >
      Trade
    </button>
  );
}