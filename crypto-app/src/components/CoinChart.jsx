import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchHistoricalData } from '../services/api';

const CoinChart = ({ coinId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const chartData = await fetchHistoricalData(coinId);
      setData(chartData.map(d => ({ date: new Date(d.timestamp).toLocaleDateString(), price: d.price })));
    };
    load();
  }, [coinId]);

  return (
    <div className="h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
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

export default CoinChart;