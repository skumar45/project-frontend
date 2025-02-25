import React from 'react';
import './tokens.css';
import './index.css';
import './app.css';
import { Link } from 'react-router-dom';

function Header({ isDarkMode, setIsDarkMode }) {
  const handleToggle = (e) => {
    setIsDarkMode(e.target.checked);
  };
  return (
    <header>
      <nav>
        <ul className="nav-list">
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/sell">Sell</Link></li>
          <li><Link to="/buy">Buy</Link></li>
        </ul>
      </nav>
      <label className="dark-mode-toggle">
        <input 
          type="checkbox" 
          checked={isDarkMode} 
          onChange={handleToggle} 
          autoComplete="off" 
        />
        Dark mode
      </label>
    </header>
  );
}

export default Header;