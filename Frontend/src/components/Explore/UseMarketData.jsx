// src/hooks/useMarketData.js
import { useState, useEffect } from 'react';
import { fetchMarketData, filterAndSortMarketData } from '../services/marketDataService';

/**
 * Custom hook to fetch and manage market data
 * @returns {Object} Market data state and handlers
 */
export function useMarketData() {
  const [marketData, setMarketData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'marketCap', direction: 'desc' });

  // Fetch market data on component mount
  useEffect(() => {
    const loadMarketData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMarketData();
        setMarketData(data);
        setFilteredData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch market data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMarketData();
  }, []);

  // Apply filters whenever filter criteria changes
  useEffect(() => {
    const filters = {
      searchTerm,
      category: activeFilter,
      sortKey: sortConfig.key,
      sortDirection: sortConfig.direction
    };
    
    const filtered = filterAndSortMarketData(marketData, filters);
    setFilteredData(filtered);
  }, [marketData, searchTerm, activeFilter, sortConfig]);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc'
    });
  };

  return {
    marketData,
    filteredData,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    sortConfig,
    setSortConfig,
    handleSort
  };
}