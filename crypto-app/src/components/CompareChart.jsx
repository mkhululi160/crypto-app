import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchHistoricalData, fetchCoinList } from '../services/api';

const CompareChart = ({ coinId }) => {
  const [compareId, setCompareId] = useState('ethereum');
  const [coinList, setCoinList] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCoinList().then(list => setCoinList(list.slice(0, 100)));
  }, []);

  useEffect(() => {
    const load = async () => {
      const [mainData, compareData] = await Promise.all([
        fetchHistoricalData(coinId, 30),
        fetchHistoricalData(compareId, 30),
      ]);
      const merged = mainData.prices.map((p, i) => ({
        date: new Date(p.timestamp).toLocaleDateString(),
        [coinId]: p.price,
        [compareId]: compareData.prices[i]?.price || null,
      }));
      setData(merged);
    };
    load();
  }, [coinId, compareId]);

  return (
    <div>
      <select
        value={compareId}
        onChange={(e) => setCompareId(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        {coinList.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={coinId} stroke="#3b82f6" dot={false} />
          <Line type="monotone" dataKey={compareId} stroke="#ef4444" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompareChart;