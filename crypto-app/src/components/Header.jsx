import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, loginWithGoogle, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">CryptoApp</Link>
        <nav className="space-x-4 flex items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/portfolio" className="hover:underline">Portfolio</Link>
          {user ? (
            <div className="flex items-center space-x-2">
              <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full" />
              <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
            </div>
          ) : (
            <button onClick={loginWithGoogle} className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">Login with Google</button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;