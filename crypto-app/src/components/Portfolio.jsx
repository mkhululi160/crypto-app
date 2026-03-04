import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { fetchCoins } from '../services/api';

const Portfolio = () => {
  const { portfolio, removeCoin } = usePortfolio();
  const [prices, setPrices] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadPrices = async () => {
      const coins = await fetchCoins(1);
      const priceMap = {};
      coins.forEach(coin => { priceMap[coin.id] = coin.current_price; });
      setPrices(priceMap);
    };
    loadPrices();
  }, []);

  useEffect(() => {
    let sum = 0;
    portfolio.forEach(coin => {
      if (prices[coin.id]) sum += prices[coin.id];
    });
    setTotal(sum);
  }, [portfolio, prices]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Your Portfolio</h2>
      {portfolio.length === 0 ? (
        <p>No coins added yet.</p>
      ) : (
        <>
          <div className="mb-4">
            <span className="text-lg">Total Value: </span>
            <span className="font-bold text-xl">${total.toLocaleString()}</span>
          </div>
          <ul className="space-y-2">
            {portfolio.map(coin => (
              <li key={coin.id} className="flex justify-between items-center">
                <span>
                  <img src={coin.image} alt={coin.name} className="w-6 h-6 inline mr-2" />
                  {coin.name} ({coin.symbol.toUpperCase()})
                </span>
                <span>
                  ${prices[coin.id]?.toLocaleString() || '...'}
                  <button
                    onClick={() => removeCoin(coin.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Portfolio;