import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { fetchOHLC } from '../services/api';

const CandlestickChart = ({ coinId }) => {
  const chartContainerRef = useRef();
  const [days, setDays] = useState(30);

  useEffect(() => {
    const initChart = async () => {
      const ohlcData = await fetchOHLC(coinId, days);
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
        layout: { backgroundColor: '#ffffff', textColor: '#333' },
        grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      });
      const candlestickSeries = chart.addCandlestickSeries();
      candlestickSeries.setData(ohlcData);

      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    };
    initChart();
  }, [coinId, days]);

  return (
    <div>
      <div className="flex space-x-2 mb-2">
        {[7, 30, 90].map(d => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`px-3 py-1 rounded ${days === d ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {d}d
          </button>
        ))}
      </div>
      <div ref={chartContainerRef} className="w-full h-[300px]" />
    </div>
  );
};

export default CandlestickChart;