import React, { useState, useEffect } from 'react';
import Header from './Header'; 
import Footer from './Footer';
import './tokens.css';
import './index.css';
import './app.css';

import sequintop from './assets/sequintop.jpeg';
import baggyjeans from './assets/baggyjeans.jpeg';
import coachpurse from './assets/coachpurse.jpeg';
import hoodie from './assets/hoodie.jpeg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './Blog.jsx';
import Sell from './SellClothes.jsx';

import ProductDescription from './ProductDescription.jsx';
import { Link } from 'react-router-dom';

const initialProducts = [
  { id: 1, name: 'Vintage Sequin Top', image: sequintop, size: 'M', description: 'Brand new sequin top with tags' },
  { id: 2, name: 'Stylish Jeans', image: baggyjeans, size: 'S', description: 'Baggy jeans with a modern look, worn once' },
  { id: 3, name: 'Coach Purse', image: coachpurse, size: 'OS', description: 'Vintage coach purse' },
  { id: 4, name: 'White Fox Hoodie', image: hoodie, size: 'L', description: 'Black hoodie with small stain' },
];


  

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} state={{ product }}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Size: {product.size}</p>
      <p>{product.description}</p>
      </Link>
    </div>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="search-bar"
    />
  );
}

function ProductListing({ searchTerm, setSearchTerm, filteredProducts }) {
  return (
    <div className="app">
      <h1>Products</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <ProductGrid products={filteredProducts} />
      <Footer />
    </div>
  );
}

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "enabled";
    setIsDarkMode(savedMode);
    
    if (savedMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Routes>
          <Route path="/" element={<ProductListing searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredProducts={filteredProducts} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/buy" element={<ProductListing searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredProducts={filteredProducts} />} />
          <Route path="/product/:id" element={<ProductDescription />} /> {/* Added this route */}
        </Routes>
        </div>
    </Router>
  );
}

export default App;