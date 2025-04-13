import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const StockDetail = ({ symbol }) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStockDetails = async () => {
    try {
      setLoading(true);
      // 👇 Corrected line
      const response = await fetch(`/api/stocks-details/${symbol}`);
      // proxying to backend
      const data = await response.json();
      setStockData(data);
    } catch (err) {
      console.error("Error fetching stock data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (symbol) fetchStockDetails();
  }, [symbol]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!stockData)
    return <div className="text-center p-10">No data available.</div>;

  const { price, chartData, about, stats } = stockData;

  const chartConfig = {
    labels: chartData.map((point) => new Date(point.date).toLocaleDateString()),
    datasets: [
      {
        label: `${symbol} Price`,
        data: chartData.map((point) => point.close),
        borderColor: "#4F46E5",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold">
          {about.name} ({symbol})
        </h2>
        <p className="text-gray-600">{about.industry}</p>

        <div className="mt-4">
          <h3 className="text-xl font-semibold">
            ₹{price.current}{" "}
            <span
              className={`ml-2 text-sm ${
                price.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              ({price.change > 0 ? "+" : ""}
              {price.change} / {price.changePercent}%)
            </span>
          </h3>
          <p className="text-gray-500">
            Day Low: ₹{price.low} | High: ₹{price.high}
          </p>
          <p className="text-gray-500">
            52W Low: ₹{price.low52w} | High: ₹{price.high52w}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <Line data={chartConfig} />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-bold mb-2">About the Company</h3>
        <p className="text-gray-700">{about.description}</p>
        <ul className="mt-2 text-gray-600 space-y-1">
          <li>
            <strong>CEO:</strong> {about.ceo}
          </li>
          <li>
            <strong>Founded:</strong> {about.founded}
          </li>
          <li>
            <strong>HQ:</strong> {about.headquarters}
          </li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-2 gap-4">
        <div>
          <strong>Market Cap:</strong> ₹{stats.marketCap}
        </div>
        <div>
          <strong>P/E Ratio:</strong> {stats.pe}
        </div>
        <div>
          <strong>EPS:</strong> {stats.eps}
        </div>
        <div>
          <strong>Volume:</strong> {stats.volume}
        </div>
        <div>
          <strong>Avg Volume:</strong> {stats.avgVolume}
        </div>
        <div>
          <strong>Dividend Yield:</strong> {stats.dividendYield}%
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
