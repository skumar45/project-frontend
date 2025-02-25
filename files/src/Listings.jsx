import React, { useState } from 'react';
import Header from './Header'; 
import Footer from './Footer';
import './tokens.css';
import './index.css';
import './app.css';

import sequintop from './assets/sequintop.jpeg';
import baggyjeans from './assets/baggyjeans.jpeg';
import coachpurse from './assets/coachpurse.jpeg';
import hoodie from './assets/hoodie.jpeg';

const initialProducts = [
  { id: 1, name: 'Vintage Sequin Top', image: sequintop, size: 'M', description: 'Brand new sequin top with tags' },
  { id: 2, name: 'Stylish Jeans', image: baggyjeans, size: 'S', description: 'Baggy jeans with a modern look, worn once' },
  { id: 3, name: 'Coach Purse', image: coachpurse, size: 'OS', description: 'Vintage coach purse' },
  { id: 4, name: 'White Fox Hoodie', image: hoodie, size: 'L', description: 'Black hoodie with small stain' },
];

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Size: {product.size}</p>
      <p>{product.description}</p>
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

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Products</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <ProductGrid products={filteredProducts} />
      <Footer />
    </div>
  );
}

export default App;