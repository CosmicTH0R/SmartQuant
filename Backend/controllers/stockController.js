import axios from "axios";

const STOCK_SYMBOLS = ["AAPL", "TSLA", "AMZN", "MSFT", "GOOGL"];

export const getStockSlides = async (req, res) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 7 * 24 * 60 * 60;

  try {
    const stockData = await Promise.all(
      STOCK_SYMBOLS.map(async (symbol) => {
        const chartUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${startDate}&period2=${endDate}&interval=1d`;

        const chartRes = await axios.get(chartUrl);
        const chart = chartRes.data.chart.result[0];
        const timestamps = chart.timestamp;
        const closes = chart.indicators.quote[0].close;

        const chartData = timestamps.map((t, i) => ({
          date: new Date(t * 1000).toLocaleDateString(),
          close: closes[i],
        }));

        return {
          symbol,
          shortName: symbol, // Use symbol if no meta available
          regularMarketPrice: closes[closes.length - 1],
          chartData,
        };
      })
    );

    res.status(200).json(stockData);
  } catch (error) {
    console.error("Stock fetch error:", error.message);
    res.status(500).json({ message: "Failed to fetch stock data" });
  }
};
