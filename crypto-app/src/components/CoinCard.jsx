import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const CoinCard = ({ coin }) => {
  const { portfolio, addCoin, removeCoin } = usePortfolio();
  const isInPortfolio = portfolio.some(c => c.id === coin.id);

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
      <Link to={`/coin/${coin.id}`} className="flex items-center space-x-4 flex-1">
        <img src={coin.image} alt={coin.name} className="w-10 h-10" />
        <div>
          <h3 className="font-semibold">{coin.name}</h3>
          <p className="text-sm text-gray-500">{coin.symbol.toUpperCase()}</p>
        </div>
        <div className="ml-auto">
          <p className="font-mono">${coin.current_price.toLocaleString()}</p>
          <p className={`text-sm ${coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>
      </Link>
      <button
        onClick={() => isInPortfolio ? removeCoin(coin.id) : addCoin(coin)}
        className={`ml-4 px-3 py-1 rounded text-white ${isInPortfolio ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        {isInPortfolio ? 'Remove' : 'Add'}
      </button>
    </div>
  );
};

export default CoinCard;