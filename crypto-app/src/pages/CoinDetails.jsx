import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCoinDetails } from '../services/api';
import PriceChart from '../components/PriceChart';
import CandlestickChart from '../components/CandlestickChart';
import VolumeChart from '../components/VolumeChart';
import CompareChart from '../components/CompareChart';
import { usePortfolio } from '../context/PortfolioContext';

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartType, setChartType] = useState('price');
  const { portfolio, addCoin, removeCoin } = usePortfolio();
  const isInPortfolio = portfolio.some(c => c.id === id);

  useEffect(() => {
    const load = async () => {
      const data = await fetchCoinDetails(id);
      setCoin(data);
    };
    load();
  }, [id]);

  if (!coin) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <img src={coin.image.large} alt={coin.name} className="w-16 h-16" />
          <div>
            <h1 className="text-3xl font-bold">{coin.name}</h1>
            <p className="text-gray-500">{coin.symbol.toUpperCase()}</p>
          </div>
          <button
            onClick={() => isInPortfolio ? removeCoin(coin.id) : addCoin({ ...coin, current_price: coin.market_data.current_price.usd })}
            className={`ml-auto px-4 py-2 rounded text-white ${isInPortfolio ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {isInPortfolio ? 'Remove from Portfolio' : 'Add to Portfolio'}
          </button>
        </div>
        <div className="mt-6">
          <p className="text-2xl font-mono">${coin.market_data.current_price.usd.toLocaleString()}</p>
          <p className={`text-lg ${coin.market_data.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
            24h: {coin.market_data.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>

        <div className="mt-4 flex space-x-2">
          {['price', 'candlestick', 'volume', 'compare'].map(type => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-4 py-2 rounded ${chartType === type ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <div className="mt-4">
          {chartType === 'price' && <PriceChart coinId={id} />}
          {chartType === 'candlestick' && <CandlestickChart coinId={id} />}
          {chartType === 'volume' && <VolumeChart coinId={id} />}
          {chartType === 'compare' && <CompareChart coinId={id} />}
        </div>

        <div className="mt-6 prose" dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ')[0] + '.' }} />
      </div>
    </div>
  );
};

export default CoinDetails;