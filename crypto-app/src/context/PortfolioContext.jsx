import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    if (!user) {
      setPortfolio([]);
      return;
    }

    const userPortfolioRef = doc(db, 'portfolios', user.uid);
    const unsubscribe = onSnapshot(userPortfolioRef, (docSnap) => {
      if (docSnap.exists()) {
        setPortfolio(docSnap.data().coins || []);
      } else {
        setPortfolio([]);
      }
    });

    return unsubscribe;
  }, [user]);

  const addCoin = async (coin) => {
    if (!user) return;
    const newPortfolio = [...portfolio];
    if (!newPortfolio.find(c => c.id === coin.id)) {
      newPortfolio.push({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        price: coin.current_price,
      });
      await setDoc(doc(db, 'portfolios', user.uid), { coins: newPortfolio });
    }
  };

  const removeCoin = async (coinId) => {
    if (!user) return;
    const newPortfolio = portfolio.filter(c => c.id !== coinId);
    await setDoc(doc(db, 'portfolios', user.uid), { coins: newPortfolio });
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, addCoin, removeCoin }}>
      {children}
    </PortfolioContext.Provider>
  );
};