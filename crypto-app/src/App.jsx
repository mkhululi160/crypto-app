import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import Header from './components/Header';
import Home from './pages/Home';
import CoinDetails from './pages/CoinDetails';
import PortfolioPage from './pages/PortfolioPage';

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coin/:id" element={<CoinDetails />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;