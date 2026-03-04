import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCoins = async (page = 1) => {
  const { data } = await axios.get(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false`
  );
  return data;
};

export const fetchCoinDetails = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/coins/${id}`);
  return data;
};

export const fetchHistoricalData = async (id, days = 7, currency = 'usd') => {
  const { data } = await axios.get(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
  );
  return {
    prices: data.prices.map(([t, p]) => ({ timestamp: t, price: p })),
    marketCaps: data.market_caps.map(([t, c]) => ({ timestamp: t, cap: c })),
    totalVolumes: data.total_volumes.map(([t, v]) => ({ timestamp: t, volume: v })),
  };
};

export const fetchCoinList = async () => {
  const { data } = await axios.get(`${BASE_URL}/coins/list`);
  return data;
};

// Optional: OHLC data for candlestick charts (if needed)
export const fetchOHLC = async (id, days = 30) => {
  const { data } = await axios.get(
    `${BASE_URL}/coins/${id}/ohlc?vs_currency=usd&days=${days}`
  );
  return data.map(([timestamp, open, high, low, close]) => ({
    time: timestamp / 1000,
    open,
    high,
    low,
    close,
  }));
};