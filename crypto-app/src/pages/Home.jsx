import React, { useEffect, useState } from 'react';
import { fetchCoins } from '../services/api';
import SearchBar from '../components/SearchBar';
import CoinList from '../components/CoinList';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchCoins(page);
      setCoins(prev => (page === 1 ? data : [...prev, ...data]));
      setLoading(false);
    };
    load();
  }, [page]);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Top Cryptocurrencies</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="mt-6">
        <CoinList coins={filteredCoins} />
      </div>
      {!loading && (
        <button
          onClick={() => setPage(p => p + 1)}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;