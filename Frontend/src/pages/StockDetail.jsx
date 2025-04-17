import React, { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement, 
  PointElement, 
  LinearScale, 
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  Filler
);

const StockDetail = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("1M"); // Default timeframe
  const [chartData, setChartData] = useState(null);

  const timeframes = [
    { value: "1D", label: "1 Day" },
    { value: "1W", label: "1 Week" },
    { value: "1M", label: "1 Month" },
    { value: "3M", label: "3 Months" },
    { value: "6M", label: "6 Months" },
    { value: "1Y", label: "1 Year" },
    { value: "5Y", label: "5 Years" },
  ];

  const fetchStockDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/stocks-details/${symbol}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${symbol}`);
      }
      
      const data = await response.json();
      setStockData(data);
      // Initial chart setup with the default timeframe
      fetchChartData(data, timeframe);
    } catch (err) {
      console.error("Error fetching stock data", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch chart data based on selected timeframe
  const fetchChartData = async (data, period) => {
    try {
      // In a real implementation, you'd fetch from an API with the period parameter
      // For now, we'll simulate with the existing data
      if (!data?.chartData) return;
      
      // Filter data based on the selected timeframe
      const today = new Date();
      let filteredData;
      
      switch (period) {
        case "1D":
          // For 1D, we would ideally fetch intraday data
          // Here we're just simulating with the last few points
          filteredData = data.chartData.slice(-24);
          break;
        case "1W":
          const oneWeekAgo = new Date(today);
          oneWeekAgo.setDate(today.getDate() - 7);
          filteredData = data.chartData.filter(point => 
            new Date(point.date) >= oneWeekAgo
          );
          break;
        case "1M":
          const oneMonthAgo = new Date(today);
          oneMonthAgo.setMonth(today.getMonth() - 1);
          filteredData = data.chartData.filter(point => 
            new Date(point.date) >= oneMonthAgo
          );
          break;
        case "3M":
          const threeMonthsAgo = new Date(today);
          threeMonthsAgo.setMonth(today.getMonth() - 3);
          filteredData = data.chartData.filter(point => 
            new Date(point.date) >= threeMonthsAgo
          );
          break;
        case "6M":
          const sixMonthsAgo = new Date(today);
          sixMonthsAgo.setMonth(today.getMonth() - 6);
          filteredData = data.chartData.filter(point => 
            new Date(point.date) >= sixMonthsAgo
          );
          break;
        case "1Y":
          const oneYearAgo = new Date(today);
          oneYearAgo.setFullYear(today.getFullYear() - 1);
          filteredData = data.chartData.filter(point => 
            new Date(point.date) >= oneYearAgo
          );
          break;
        case "5Y":
          const fiveYearsAgo = new Date(today);
          fiveYearsAgo.setFullYear(today.getFullYear() - 5);
          filteredData = data.chartData.filter(point => 
            new Date(point.date) >= fiveYearsAgo
          );
          break;
        default:
          filteredData = data.chartData;
      }
      
      // Update chart data
      setChartData(filteredData);
    } catch (err) {
      console.error("Error processing chart data", err);
    }
  };

  useEffect(() => {
    if (symbol) fetchStockDetails();
  }, [symbol]);

  useEffect(() => {
    if (stockData) {
      fetchChartData(stockData, timeframe);
    }
  }, [timeframe, stockData]);

  // Format large numbers with commas and appropriate suffixes
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "N/A";
    
    if (num >= 1000000000) {
      return `₹${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `₹${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `₹${(num / 1000).toFixed(2)}K`;
    } else {
      return `₹${num.toFixed(2)}`;
    }
  };

  // Format percentage values
  const formatPercentage = (value) => {
    if (value === null || value === undefined) return "N/A";
    return `${value > 0 ? "+" : ""}${parseFloat(value).toFixed(2)}%`;
  };

  // Format price with 2 decimal places
  const formatPrice = (price) => {
    if (price === null || price === undefined) return "N/A";
    return parseFloat(price).toFixed(2);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center p-10 min-h-screen bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black">
          <div className="text-center">
            <div className="inline-block rounded-full h-16 w-16 bg-blue-100 p-3 animate-pulse dark:bg-blue-900">
              <div className="h-full w-full rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
            </div>
            <div className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">
              Loading {symbol} data...
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-red-50 rounded-xl border border-red-200 dark:bg-red-900/30 dark:border-red-700">
          <div className="text-red-600 font-medium text-center text-lg dark:text-red-400">Error: {error}</div>
          <div className="flex justify-center mt-4">
            <button 
              onClick={fetchStockDetails} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!stockData) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
          <div className="text-gray-600 text-center dark:text-gray-300">No data available for {symbol}.</div>
        </div>
      </>
    );
  }

  const { price, about, stats } = stockData;

  // Check if price object has necessary data
  const isPriceDataValid = price && typeof price.current === 'number';
  
  // Create improved chart configuration
  const chartConfig = chartData ? {
    labels: chartData.map((point) => {
      const date = new Date(point.date);
      if (timeframe === "1D") {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (timeframe === "1W" || timeframe === "1M") {
        return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
      } else {
        return date.toLocaleDateString([], { month: 'short', year: '2-digit' });
      }
    }),
    datasets: [
      {
        label: `${symbol} Price`,
        data: chartData.map((point) => point.close),
        borderColor: isPriceDataValid && price.change >= 0 ? "#16a34a" : "#dc2626",
        backgroundColor: isPriceDataValid && price.change >= 0 ? "rgba(22, 163, 74, 0.1)" : "rgba(220, 38, 38, 0.1)",
        pointBackgroundColor: isPriceDataValid && price.change >= 0 ? "#16a34a" : "#dc2626",
        tension: 0.2,
        fill: true,
        pointRadius: timeframe === "1D" || timeframe === "1W" ? 2 : 0,
        pointHoverRadius: 5,
        borderWidth: 2,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Price: ₹${context.parsed.y.toFixed(2)}`;
          },
          title: function(tooltipItems) {
            return tooltipItems[0].label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value) {
            return '₹' + value;
          },
          font: {
            size: 11,
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 8,
          maxRotation: 0,
          font: {
            size: 10,
          }
        }
      }
    },
  };

  // Determine the trend color
  const trendColor = isPriceDataValid && price.change >= 0 ? "text-green-600" : "text-red-600";
  const trendBg = isPriceDataValid && price.change >= 0 ? "bg-green-100" : "bg-red-100";
  const trendIcon = isPriceDataValid && price.change >= 0 
    ? "↑" 
    : "↓";

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header Card with Stock Price Details */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden dark:bg-gray-900 dark:border-gray-700 mb-6">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3 dark:bg-blue-900 dark:text-blue-400">
                    {symbol.substring(0, 2)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {about.name}
                    </h2>
                    <div className="flex items-center mt-1">
                      <span className="text-gray-500 font-medium dark:text-gray-400">{symbol}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-600 dark:text-gray-400">{about.exchange || "NSE"}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2 dark:bg-gray-700 dark:text-gray-300">
                    {about.industry}
                  </span>
                  {about.sector && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      {about.sector}
                    </span>
                  )}
                </div>
              </div>
              
              {isPriceDataValid && (
                <div className="md:text-right">
                  <div className="flex items-center md:justify-end">
                    <span className="text-3xl font-bold text-gray-800 dark:text-white">₹{formatPrice(price.current)}</span>
                    <div className={`ml-3 px-3 py-1 rounded-md text-sm font-medium flex items-center ${trendBg} ${trendColor}`}>
                      <span className="mr-1">{trendIcon}</span>
                      {formatPrice(price.change)} ({formatPercentage(price.changePercent)})
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 dark:text-gray-400">
                    Updated: {new Date().toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Stats Cards */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
                <p className="text-gray-500 text-sm dark:text-gray-400">Day Range</p>
                <p className="font-medium text-gray-800 dark:text-white">₹{formatPrice(price.low)} - ₹{formatPrice(price.high)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
                <p className="text-gray-500 text-sm dark:text-gray-400">52W Range</p>
                <p className="font-medium text-gray-800 dark:text-white">₹{formatPrice(price.low52w)} - ₹{formatPrice(price.high52w)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
                <p className="text-gray-500 text-sm dark:text-gray-400">Volume</p>
                <p className="font-medium text-gray-800 dark:text-white">{formatNumber(stats.volume)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
                <p className="text-gray-500 text-sm dark:text-gray-400">Market Cap</p>
                <p className="font-medium text-gray-800 dark:text-white">{formatNumber(stats.marketCap)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden dark:bg-gray-900 dark:border-gray-700 mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Price History</h3>
              
              {/* Time period selector */}
              <div className="mt-3 sm:mt-0 flex flex-wrap items-center gap-2">
                {timeframes.map((period) => (
                  <button
                    key={period.value}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                      timeframe === period.value 
                        ? "bg-blue-600 text-white dark:bg-blue-700" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setTimeframe(period.value)}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-72">
              {chartConfig ? (
                <Line data={chartConfig} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 dark:text-gray-400">No chart data available</p>
                </div>
              )}
            </div>
            
            {/* Key Statistics Below Chart */}
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 dark:text-gray-400">Key Statistics</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Open</p>
                  <p className="font-medium text-gray-800 dark:text-white">₹{formatPrice(price.open)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Previous Close</p>
                  <p className="font-medium text-gray-800 dark:text-white">₹{formatPrice(price.previousClose)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">P/E Ratio</p>
                  <p className="font-medium text-gray-800 dark:text-white">{stats.peRatio || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">EPS</p>
                  <p className="font-medium text-gray-800 dark:text-white">₹{stats.eps || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Dividend Yield</p>
                  <p className="font-medium text-gray-800 dark:text-white">{stats.dividendYield ? `${stats.dividendYield}%` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Beta</p>
                  <p className="font-medium text-gray-800 dark:text-white">{stats.beta || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* About the Company */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden dark:bg-gray-900 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">About {about.name}</h3>
              {about.description && about.description !== 'N/A' ? (
                <p className="text-gray-700 mb-4 max-h-40 overflow-y-auto dark:text-gray-300">{about.description}</p>
              ) : (
                <p className="text-gray-500 italic mb-4 dark:text-gray-400">No company description available</p>
              )}
              
              <div className="border-t border-gray-100 pt-4 dark:border-gray-700">
                <ul className="space-y-3">
                  {about.ceo && about.ceo !== 'N/A' && (
                    <li className="flex items-center">
                      <span className="text-gray-500 dark:text-gray-400 w-28">CEO:</span>
                      <span className="font-medium text-gray-800 dark:text-white">{about.ceo}</span>
                    </li>
                  )}
                  {about.founded && about.founded !== 'N/A' && (
                    <li className="flex items-center">
                      <span className="text-gray-500 dark:text-gray-400 w-28">Founded:</span>
                      <span className="font-medium text-gray-800 dark:text-white">{about.founded}</span>
                    </li>
                  )}
                  {about.headquartersCity && about.headquartersCity !== 'N/A' && (
                    <li className="flex items-center">
                      <span className="text-gray-500 dark:text-gray-400 w-28">HQ:</span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {about.headquartersCity}{about.headquartersCountry ? `, ${about.headquartersCountry}` : ''}
                      </span>
                    </li>
                  )}
                  {about.employees && about.employees !== 'N/A' && (
                    <li className="flex items-center">
                      <span className="text-gray-500 dark:text-gray-400 w-28">Employees:</span>
                      <span className="font-medium text-gray-800 dark:text-white">{Number(about.employees).toLocaleString()}</span>
                    </li>
                  )}
                  {about.website && about.website !== 'N/A' && (
                    <li className="flex items-center">
                      <span className="text-gray-500 dark:text-gray-400 w-28">Website:</span>
                      <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">{about.website}</a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Enhanced Financial Metrics */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden dark:bg-gray-900 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Financial Metrics</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 dark:text-gray-400">Valuation</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-800">
                      <p className="text-sm text-gray-500 dark:text-gray-400">P/E Ratio</p>
                      <p className="font-medium text-gray-800 dark:text-white">{stats.peRatio || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-800">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Price to Book</p>
                      <p className="font-medium text-gray-800 dark:text-white">{stats.priceToBook || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-800">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Price to Sales</p>
                      <p className="font-medium text-gray-800 dark:text-white">{stats.priceToSales || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-800">
                      <p className="text-sm text-gray-500 dark:text-gray-400">EV/EBITDA</p>
                      <p className="font-medium text-gray-800 dark:text-white">{stats.evToEbitda || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 dark:text-gray-400">Dividends</h4>
                  <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Dividend Yield</p>
                    <p className="font-medium text-gray-800 dark:text-white">{stats.dividendYield ? `${stats.dividendYield}%` : 'N/A'}</p>
                    <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">Payout Ratio: {stats.payoutRatio || 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 dark:text-gray-400">Profitability</h4>
                  <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Profit Margin</p>
                    <p className="font-medium text-gray-800 dark:text-white">{stats.profitMargin ? `${stats.profitMargin}%` : 'N/A'}</p>
                    <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">ROE: {stats.roe ? `${stats.roe}%` : 'N/A'}</p>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 dark:text-gray-400">Growth</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-800">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Revenue (YoY)</p>
                      <p className="font-medium text-gray-800 dark:text-white">{stats.revenueGrowthYOY ? `${formatPercentage(stats.revenueGrowthYOY)}` : 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-800">
                      <p className="text-sm text-gray-500 dark:text-gray-400">EPS (YoY)</p>
                      <p className="font-medium text-gray-800 dark:text-white">{stats.epsGrowthYOY ? `${formatPercentage(stats.epsGrowthYOY)}` : 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Net Income (YoY)</p>
                      <p className="font-medium text-gray-800 dark:text-white">{stats.netIncomeGrowthYOY ? `${formatPercentage(stats.netIncomeGrowthYOY)}` : 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related News & Analyst Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* News */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden dark:bg-gray-900 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Related News</h3>
              
              {stockData.news && stockData.news.length > 0 ? (
                <div className="space-y-4">
                  {stockData.news.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-700">
                      <div className="flex items-start">
                        {item.imageUrl && (
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 mr-4 bg-gray-100 dark:bg-gray-800">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-gray-800 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                          </h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2 dark:text-gray-400">{item.summary}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>{item.source}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  No recent news available for {about.name}
                </div>
              )}
              
              <div className="mt-4 text-center">
                <button className="px-4 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors dark:text-blue-400 dark:hover:bg-blue-900/30">
                  View All News
                </button>
              </div>
            </div>
          </div>
          
          {/* Analyst Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden dark:bg-gray-900 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Analyst Recommendations</h3>
              
              {stockData.analystRatings ? (
                <>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center dark:bg-blue-900/30">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stockData.analystRatings.rating || 'N/A'}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Consensus</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm w-20 text-gray-500 dark:text-gray-400">Buy</span>
                      <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: `${stockData.analystRatings.buy || 0}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700 w-10 text-right dark:text-gray-300">
                        {stockData.analystRatings.buy || 0}%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-20 text-gray-500 dark:text-gray-400">Hold</span>
                      <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                        <div 
                          className="h-full bg-yellow-400" 
                          style={{ width: `${stockData.analystRatings.hold || 0}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700 w-10 text-right dark:text-gray-300">
                        {stockData.analystRatings.hold || 0}%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-20 text-gray-500 dark:text-gray-400">Sell</span>
                      <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                        <div 
                          className="h-full bg-red-500" 
                          style={{ width: `${stockData.analystRatings.sell || 0}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700 w-10 text-right dark:text-gray-300">
                        {stockData.analystRatings.sell || 0}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Price Target</p>
                        <p className="font-medium text-gray-800 dark:text-white">₹{formatPrice(stockData.analystRatings.priceTarget)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Potential</p>
                        <p className={`font-medium ${
                          stockData.analystRatings.potential > 0 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {formatPercentage(stockData.analystRatings.potential)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Analysts</p>
                        <p className="font-medium text-gray-800 dark:text-white">{stockData.analystRatings.count || 0}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  No analyst data available for {about.name}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Historical Performance & Peer Comparison */}
        <div className="grid grid-cols-1 gap-6 mt-6">
          {/* Historical Performance */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden dark:bg-gray-900 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Historical Returns</h3>
              
              {stockData.historicalReturns ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Period</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{symbol}</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">NIFTY 50</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Sector Avg.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {Object.entries(stockData.historicalReturns).map(([period, data]) => (
                        <tr key={period} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{period}</td>
                          <td className={`px-4 py-3 text-sm font-medium ${
                            data.stock >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {formatPercentage(data.stock)}
                          </td>
                          <td className={`px-4 py-3 text-sm font-medium ${
                            data.index >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {formatPercentage(data.index)}
                          </td>
                          <td className={`px-4 py-3 text-sm font-medium ${
                            data.sector >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {formatPercentage(data.sector)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  No historical returns data available
                </div>
              )}
            </div>
          </div>
          
          {/* Peer Comparison */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden dark:bg-gray-900 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Peer Comparison</h3>
              
              {stockData.peers && stockData.peers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Company</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Price</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Change</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">P/E</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Market Cap</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">1Y Return</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {stockData.peers.map((peer, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`flex-shrink-0 h-8 w-8 rounded-md flex items-center justify-center text-white font-medium ${
                                peer.symbol === symbol ? 'bg-blue-600 dark:bg-blue-700' : 'bg-gray-400 dark:bg-gray-600'
                              }`}>
                                {peer.symbol.substring(0, 2)}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {peer.symbol === symbol ? <strong>{peer.name}</strong> : peer.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{peer.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-700 dark:text-gray-300">
                            ₹{formatPrice(peer.price)}
                          </td>
                          <td className={`px-4 py-3 whitespace-nowrap text-right text-sm font-medium ${
                            peer.changePercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {formatPercentage(peer.changePercent)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-700 dark:text-gray-300">
                            {peer.peRatio || 'N/A'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-700 dark:text-gray-300">
                            {formatNumber(peer.marketCap)}
                          </td>
                          <td className={`px-4 py-3 whitespace-nowrap text-right text-sm font-medium ${
                            peer.oneYearReturn >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {formatPercentage(peer.oneYearReturn)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  No peer comparison data available
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-300 dark:hover:bg-gray-800">
            Add to Watchlist
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600">
            Buy / Sell
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-12 bg-gray-50 border-t border-gray-100 py-8 dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p className="mb-2">Data provided for informational purposes only. Not financial advice.</p>
            <p>© {new Date().getFullYear()} SmartQuant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default StockDetail;