import { useState, useEffect } from 'react';
import StatsCards from '../components/Explore/StatsCards';
import SearchFilterBar from '../components/Explore/SearchFilterBar';
import MarketTable from '../components/Explore/MarketTable';
import FeaturedMarkets from '../components/Explore/FeaturedMarkets';
import Navbar from '../components/Navbar1';

export default function ExplorePage() {
  const [marketData, setMarketData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'marketCap', direction: 'desc' });

  useEffect(() => {
    // In a real app, this would be fetched from an API
    const fetchMarketData = async () => {
      try {
        // Mock data for demonstration
        const mockData = [
          { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 82456.32, change24h: 2.35, marketCap: 1620.45, volume24h: 32.84, category: 'crypto' },
          { id: 2, name: 'Tesla', symbol: 'TSLA', price: 276.49, change24h: -1.23, marketCap: 856.78, volume24h: 24.51, category: 'stock' },
          { id: 3, name: 'Ethereum', symbol: 'ETH', price: 3892.15, change24h: 3.45, marketCap: 464.12, volume24h: 16.29, category: 'crypto' },
          { id: 4, name: 'Apple', symbol: 'AAPL', price: 198.36, change24h: 0.87, marketCap: 3105.67, volume24h: 41.23, category: 'stock' },
          { id: 5, name: 'USD Coin', symbol: 'USDC', price: 1.00, change24h: 0.01, marketCap: 28.54, volume24h: 5.67, category: 'crypto' },
          { id: 6, name: 'Microsoft', symbol: 'MSFT', price: 425.22, change24h: 1.56, marketCap: 3150.89, volume24h: 35.81, category: 'stock' },
          { id: 7, name: 'Solana', symbol: 'SOL', price: 178.45, change24h: 5.67, marketCap: 78.92, volume24h: 9.63, category: 'crypto' },
          { id: 8, name: 'Amazon', symbol: 'AMZN', price: 186.45, change24h: -0.54, marketCap: 1950.32, volume24h: 29.75, category: 'stock' },
        ];
        
        setMarketData(mockData);
        setFilteredData(mockData);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };
    
    fetchMarketData();
  }, []);

  useEffect(() => {
    filterAndSortData();
  }, [marketData, searchTerm, activeFilter, sortConfig]);

  const filterAndSortData = () => {
    let result = [...marketData];
    
    // Apply category filter
    if (activeFilter !== 'all') {
      result = result.filter(item => item.category === activeFilter);
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
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredData(result);
  };

  // Global stats for the stats cards
  const globalStats = {
    marketCap: { value: '10.24T', change: '+2.3%', trend: 'up' },
    volume24h: { value: '86.5B', change: '-1.8%', trend: 'down' },
    tradingPairs: { value: '2,456', change: '+12', trend: 'up' },
    activeUsers: { value: '145.2K', change: '+5.3%', trend: 'up' }
  };

  return (
    <>
    <Navbar />
    <div className="bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black min-h-screen text-gray-800 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <StatsCards stats={globalStats} />

        {/* Search and Filter Bar */}
        <SearchFilterBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          />

        {/* Market Table */}
        <MarketTable 
          data={filteredData} 
          handleSort={(key) => {
            setSortConfig({
              key,
              direction: sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc'
            });
          }}
          sortConfig={sortConfig}
          />

        {/* Featured Markets */}
        <FeaturedMarkets marketData={marketData} />
      </div>
    </div>
          </>
  );
}