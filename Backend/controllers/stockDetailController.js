import yahooFinance from 'yahoo-finance2';

export const getStockDetails = async (req, res) => {
  const { symbol } = req.params;

  if (!symbol) {
    return res.status(400).json({ error: 'Stock symbol is required' });
  }

  try {
    const [quote, historical] = await Promise.all([
      yahooFinance.quote(symbol),
      yahooFinance.historical(symbol, {
        period1: new Date('2023-01-01'),
        period2: new Date(),
        interval: '1d',
      }),
    ]);

    if (!quote || !historical || historical.length === 0) {
      return res.status(404).json({ error: 'Stock data not found' });
    }

    const chartData = historical.map((point) => ({
      date: point.date.toISOString().split('T')[0],
      close: point.close != null ? parseFloat(point.close.toFixed(2)) : null,
    }));

    const stockData = {
      price: {
        current: quote.regularMarketPrice ?? null,
        change: quote.regularMarketChange != null ? parseFloat(quote.regularMarketChange.toFixed(2)) : null,
        changePercent: quote.regularMarketChangePercent != null
          ? parseFloat(quote.regularMarketChangePercent.toFixed(2))
          : null,
        high: quote.regularMarketDayHigh ?? null,
        low: quote.regularMarketDayLow ?? null,
        low52w: quote.fiftyTwoWeekLow ?? null,
        high52w: quote.fiftyTwoWeekHigh ?? null,
      },
      chartData,
      about: {
        name: quote.longName ?? quote.shortName ?? 'N/A',
        industry: quote.industry ?? 'N/A',
        sector: quote.sector ?? 'N/A',
        description: quote.longBusinessSummary ?? 'N/A',
        ceo: quote.companyOfficers?.[0]?.name ?? 'N/A', // assuming API returns company officers
        founded: quote.firstTradeDateEpochUtc
          ? new Date(quote.firstTradeDateEpochUtc).getFullYear()
          : 'N/A',
        headquarters: quote.city && quote.state
          ? `${quote.city}, ${quote.state}`
          : quote.city ?? quote.state ?? 'N/A',
      },
      stats: {
        marketCap: quote.marketCap ?? null,
        pe: quote.trailingPE ?? null,
        eps: quote.epsTrailingTwelveMonths ?? null,
        volume: quote.regularMarketVolume ?? null,
        avgVolume: quote.averageDailyVolume3Month ?? null,
        dividendYield: quote.trailingAnnualDividendYield != null
          ? parseFloat((quote.trailingAnnualDividendYield * 100).toFixed(2))
          : null,
      },
    };

    return res.json(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return res.status(500).json({ error: 'Failed to fetch stock data', message: error.message });
  }
};
