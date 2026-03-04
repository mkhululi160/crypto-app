import React from 'react';
import CoinCard from './CoinCard';

const CoinList = ({ coins }) => (
  <div className="space-y-4">
    {coins.map(coin => <CoinCard key={coin.id} coin={coin} />)}
  </div>
);

export default CoinList;