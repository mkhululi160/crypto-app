import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchHistoricalData, fetchCoinList } from '../services/api';

const VolumeChart = ({ coinId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const hist = await fetchHistoricalData(coinId, 30);
      setData(hist.totalVolumes.map(v => ({
        date: new Date(v.timestamp).toLocaleDateString(),
        volume: v.volume,
      })));
    };
    load();
  }, [coinId]);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="volume" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VolumeChart;