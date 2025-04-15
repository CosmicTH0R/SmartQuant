// src/services/marketDataService.js
/**
 * Service for fetching and handling market data
 */

/**
 * Fetch market data from the API
 * @returns {Promise<Array>} Promise that resolves to market data array
 */
export const fetchMarketData = async () => {
  try {
    // In a real application, this would be an API call
    // For example: const response = await fetch('/api/markets');
    
    // For demo purposes, returning mock data
    return getMockMarketData();
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
};

/**
 * Get mock market data for development
 * @returns {Array} Mock market data
 */
export const getMockMarketData = () => {
  return [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 82456.32, change24h: 2.35, marketCap: 1620.45, volume24h: 32.84, category: 'crypto' },
    { id: 2, name: 'Tesla', symbol: 'TSLA', price: 276.49, change24h: -1.23, marketCap: 856.78, volume24h: 24.51, category: 'stock' },
    { id: 3, name: 'Ethereum', symbol: 'ETH', price: 3892.15, change24h: 3.45, marketCap: 464.12, volume24h: 16.29, category: 'crypto' },
    { id: 4, name: 'Apple', symbol: 'AAPL', price: 198.36, change24h: 0.87, marketCap: 3105.67, volume24h: 41.23, category: 'stock' },
    { id: 5, name: 'USD Coin', symbol: 'USDC', price: 1.00, change24h: 0.01, marketCap: 28.54, volume24h: 5.67, category: 'crypto' },
    { id: 6, name: 'Microsoft', symbol: 'MSFT', price: 425.22, change24h: 1.56, marketCap: 3150.89, volume24h: 35.81, category: 'stock' },
    { id: 7, name: 'Solana', symbol: 'SOL', price: 178.45, change24h: 5.67, marketCap: 78.92, volume24h: 9.63, category: 'crypto' },
    { id: 8, name: 'Amazon', symbol: 'AMZN', price: 186.45, change24h: -0.54, marketCap: 1950.32, volume24h: 29.75, category: 'stock' },
    { id: 9, name: 'Cardano', symbol: 'ADA', price: 0.56, change24h: 1.12, marketCap: 19.87, volume24h: 2.35, category: 'crypto' },
    { id: 10, name: 'Google', symbol: 'GOOGL', price: 174.32, change24h: 0.98, marketCap: 2245.67, volume24h: 28.12, category: 'stock' },
  ];
};

/**
 * Filter and sort market data
 * @param {Array} data - The market data to filter and sort
 * @param {Object} filters - Object containing filter criteria
 * @returns {Array} Filtered and sorted data
 */
export const filterAndSortMarketData = (data, { searchTerm, category, sortKey, sortDirection }) => {
  let result = [...data];
  
  // Apply category filter
  if (category && category !== 'all') {
    result = result.filter(item => item.category === category);
  }
  
  // Apply search
  if (searchTerm) {
    const lowerCaseSearch = searchTerm.toLowerCase();
    result = result.filter(item => 
      item.name.toLowerCase().includes(lowerCaseSearch) || 
      item.symbol.toLowerCase().includes(lowerCaseSearch)
    );
  }
  
  // Apply sorting
  if (sortKey) {
    result.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  
  return result;
};

/**
 * Format numbers for display
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number
 */
export const formatCurrency = (num, decimals = 2) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
};

/**
 * Format market cap values (in billions)
 * @param {number} num - Number in billions
 * @returns {string} Formatted market cap
 */
export const formatMarketCap = (num) => {
  return `$${num}B`;
};