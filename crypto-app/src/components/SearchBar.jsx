import React from 'react';

const SearchBar = ({ search, setSearch }) => (
  <input
    type="text"
    placeholder="Search cryptocurrencies..."
    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
);

export default SearchBar;