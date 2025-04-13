// import axios from 'axios';

// export const getStockDetails = async (req, res) => {
//   const { symbol } = req.params;

//   try {
//     const quoteRes = await axios.get(`https://yfapi.net/v6/finance/quote?symbols=${symbol}`, {
//       headers: {
//         'X-API-KEY': process.env.YAHOO_API_KEY,
//         'X-API-HOST': 'yfapi.net'
//       }
//     });

//     const result = quoteRes.data.quoteResponse.result[0];

//     const chartRes = await axios.get(`https://yfapi.net/v8/finance/chart/${symbol}?range=1mo&interval=1d`, {
//       headers: {
//         'X-API-KEY': process.env.YAHOO_API_KEY,
//         'X-API-HOST': 'yfapi.net'
//       }
//     });

//     const timestamps = chartRes.data.chart.result[0].timestamp;
//     const prices = chartRes.data.chart.result[0].indicators.adjclose[0].adjclose;

//     const chartData = timestamps.map((t, i) => ({
//       date: new Date(t * 1000),
//       close: prices[i]
//     }));

//     res.json({
//       price: {
//         current: result.regularMarketPrice,
//         change: result.regularMarketChange.toFixed(2),
//         changePercent: result.regularMarketChangePercent.toFixed(2),
//         high: result.regularMarketDayHigh,
//         low: result.regularMarketDayLow,
//         low52w: result.fiftyTwoWeekLow,
//         high52w: result.fiftyTwoWeekHigh,
//       },
//       chartData,
//       about: {
//         name: result.longName || result.shortName,
//         industry: result.industry || 'N/A',
//         description: 'Description from a second API (optional)',
//         ceo: 'N/A',
//         founded: 'N/A',
//         headquarters: result.city ? `${result.city}, ${result.state || ''}` : 'N/A',
//       },
//       stats: {
//         marketCap: result.marketCap,
//         pe: result.trailingPE,
//         eps: result.epsTrailingTwelveMonths,
//         volume: result.regularMarketVolume,
//         avgVolume: result.averageDailyVolume3Month,
//         dividendYield: result.trailingAnnualDividendYield,
//       }
//     });

//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Failed to fetch stock data' });
//   }
// };




import yahooFinance from 'yahoo-finance2';  // Import the yahoo-finance2 library

export const getStockDetails = async (req, res) => {
  const { symbol } = req.params;

  try {
    // Fetching stock data using yahoo-finance2 library
    const quote = await yahooFinance.quote(symbol);

    // Preparing the response with the relevant data
    const stockData = {
      price: {
        current: quote.regularMarketPrice,
        change: quote.regularMarketChange.toFixed(2),
        changePercent: quote.regularMarketChangePercent.toFixed(2),
        high: quote.regularMarketDayHigh,
        low: quote.regularMarketDayLow,
        low52w: quote.fiftyTwoWeekLow,
        high52w: quote.fiftyTwoWeekHigh,
      },
      chartData: [],  // Chart data can be fetched separately or removed if not needed.
      about: {
        name: quote.longName || quote.shortName,
        industry: quote.industry || 'N/A',
        description: 'Description from a second API (optional)',
        ceo: 'N/A',
        founded: 'N/A',
        headquarters: quote.city ? `${quote.city}, ${quote.state || ''}` : 'N/A',
      },
      stats: {
        marketCap: quote.marketCap,
        pe: quote.trailingPE,
        eps: quote.epsTrailingTwelveMonths,
        volume: quote.regularMarketVolume,
        avgVolume: quote.averageDailyVolume3Month,
        dividendYield: quote.trailingAnnualDividendYield,
      }
    };

    // Sending the response back to the frontend
    res.json(stockData);

  } catch (error) {
    console.error("Error fetching stock data", error.message);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
};
