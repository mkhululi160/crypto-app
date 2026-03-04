import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchHistoricalData } from '../services/api';
import { format } from 'date-fns';

const timeframes = [
  { label: '24h', days: 1 },
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '1y', days: 365 },
];

const PriceChart = ({ coinId }) => {
  const [data, setData] = useState([]);
  const [days, setDays] = useState(7);

  useEffect(() => {
    const load = async () => {
      const hist = await fetchHistoricalData(coinId, days);
      setData(hist.prices.map(p => ({
        date: format(new Date(p.timestamp), 'MMM dd'),
        price: p.price,
      })));
    };
    load();
  }, [coinId, days]);

  return (
    <div className="mt-6">
      <div className="flex space-x-2 mb-4">
        {timeframes.map(tf => (
          <button
            key={tf.days}
            onClick={() => setDays(tf.days)}
            className={`px-3 py-1 rounded ${days === tf.days ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {tf.label}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#3b82f6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;