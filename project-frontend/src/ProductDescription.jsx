import React from 'react';
import Footer from './Footer';
import './tokens.css';
import './index.css';
import './app.css';
import { useLocation, useParams } from 'react-router-dom';

import baggyjeans from './assets/baggyjeans.jpeg';
import coachpurse from './assets/coachpurse.jpeg';


const initialProducts = [
  { id: 1, name: 'Vintage Sequin Top', image: './assets/sequintop.jpeg', size: 'M', description: 'Brand new sequin top with tags', price: 25 },
  { id: 2, name: 'Stylish Jeans', image: baggyjeans, size: 'S', description: 'Baggy jeans with a modern look, worn once', price: 20 },
  { id: 3, name: 'Coach Purse', image: coachpurse, size: 'OS', description: 'Vintage coach purse', price: 50 },
  { id: 4, name: 'White Fox Hoodie', image: './assets/hoodie.jpeg', size: 'L', description: 'Black hoodie with small stain', price: 30 },
];

function ProductDescription() {
  const { id } = useParams(); 
  const location = useLocation();
  
  
  const product = location.state?.product || initialProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return <h2>Error: Product not found. Please go back.</h2>;
  }

 
  const handleMessageSeller = () => {
    console.log(`Messaging the seller about the ${product.name}`);
  };

  return (
    <div className="product-description-page">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} className="product-image" />
      <p>Size: {product.size}</p>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price || '5'}</p> {/* backend required*/}

      <button onClick={handleMessageSeller} className="message-seller-button">
        Message Seller
      </button>

      {/*seller info will be updated using backend*/}
      <div className="listed-by-card">
        <img src="./assets/profile.jpeg" alt="Seller Profile" className="profile-image" />
        <p>Listed by: John Doe</p>
        <p>Listed on: 2025-02-23</p>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDescription;

{/* Add:
    Back button
    Favorites button
    Categories 
*/}