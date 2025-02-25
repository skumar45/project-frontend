import React, { useState } from 'react';
import Header from './Header'; 
import Footer from './Footer';
import './tokens.css';
import './index.css';
import './app.css';
import { Spinner } from "./Spinner"; 

function delayMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function PhotoUpload({ photos, onPhotoChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  async function handleFileChange(files) {
    setIsLoading(true);
    
    try {
      await delayMs(2000); // Simulate a 2-second upload
      const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file));
      setUploadedPhotos((prev) => [...prev, ...newPhotos]);
      onPhotoChange(files);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="photo-upload">
      <label htmlFor="product-photos">Upload Photos</label>
      <input 
        type="file" 
        id="product-photos" 
        multiple 
        disabled={isLoading}
        onChange={(e) => handleFileChange(e.target.files)} 
      />

{isLoading ? <Spinner className="spinner" /> : <p>{uploadedPhotos.length} photos uploaded</p>}

      <div className="uploaded-photos">
        {uploadedPhotos.length > 0
          ? uploadedPhotos.map((src, index) => (
              <img key={index} src={src} alt={`Uploaded ${index + 1}`} className="photo-preview" />
            ))
          : !isLoading && <img src="https://via.placeholder.com/150" alt="Placeholder" className="photo-preview" />
        }
      </div>
    </div>
  );
}

function PriceInput({ price, onPriceChange }) {
  return (
    <div className="price-input">
      <label htmlFor="price">Set Price ($)</label>
      <input 
        type="number" 
        id="price" 
        value={price} 
        onChange={(e) => onPriceChange(e.target.value)}
      />
    </div>
  );
}

function SizeInput({ size, onSizeChange }) {
  return (
    <div className="size-input">
      <label htmlFor="size">Choose Size</label>
      <input 
        type="text" 
        id="size" 
        value={size} 
        onChange={(e) => onSizeChange(e.target.value)}
      />
    </div>
  );
}

function BrandInput({ brand, onBrandChange }) {
  return (
    <div className="brand-input">
      <label htmlFor="brand">Set Brand Name</label>
      <input 
        type="text" 
        id="brand" 
        value={brand} 
        onChange={(e) => onBrandChange(e.target.value)}
      />
    </div>
  );
}

function DescriptionInput({ description, onDescriptionChange }) {
  return (
    <div className="description-input">
      <label htmlFor="description">Set Description</label>
      <textarea 
        id="description" 
        value={description} 
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </div>
  );
}

function ConfirmButton({ formData }) {
  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return <button onClick={handleSubmit}>Confirm Listing</button>;
}

function SellClothes() {
  const [formData, setFormData] = useState({
    photos: [],
    price: "",
    size: "",
    brand: "",
    description: ""
  });

  // Functions to update state
  const updatePhotos = (files) => {
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const updatePrice = (price) => {
    setFormData((prev) => ({ ...prev, price }));
  };

  const updateSize = (size) => {
    setFormData((prev) => ({ ...prev, size }));
  };

  const updateBrand = (brand) => {
    setFormData((prev) => ({ ...prev, brand }));
  };

  const updateDescription = (description) => {
    setFormData((prev) => ({ ...prev, description }));
  };

  return (
    <div className="sell-clothes-page">
      <main className="sell-clothes-container">
        <PhotoUpload photos={formData.photos} onPhotoChange={updatePhotos} />
        <PriceInput price={formData.price} onPriceChange={updatePrice} />
        <SizeInput size={formData.size} onSizeChange={updateSize} />
        <BrandInput brand={formData.brand} onBrandChange={updateBrand} />
        <DescriptionInput description={formData.description} onDescriptionChange={updateDescription} />
        <ConfirmButton formData={formData} />
      </main>
      <Footer />
    </div>
  );
}

export default SellClothes;