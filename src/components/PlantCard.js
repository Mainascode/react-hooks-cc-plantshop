import React, { useState } from 'react';

function PlantCard({ plant, updatePlantPrice, deletePlant, toggleStockStatus }) {
  // State to hold the new price input for updating the plant's price
  const [newPrice, setNewPrice] = useState(plant.price);

  // Handle price change logic
  const handlePriceChange = () => {
    // Ensure the new price is greater than 0 before updating
    if (newPrice > 0) {
      // Call update function passed from parent
      updatePlantPrice(plant.id, newPrice);
    }
  };

  return (
    <div className="plant-card">
      {/* Display plant's image */}
      <img src={plant.image} alt={plant.name} className="plant-image" />
      
      {/* Display plant's name */}
      <h3>{plant.name}</h3>

      {/* Display plant's current price */}
      <p>Price: ${plant.price}</p>

      {/* Input field to update the price of the plant */}
      <input
      // Ensures the input is a numeric value
        type="number"  
         // The value is controlled by the state 'newPrice'
        value={newPrice}
        // Update 'newPrice' state on input change
        onChange={(e) => setNewPrice(e.target.value)}
        // Ensures the price cannot be negative
        min="0" 
      />

      {/* Button to trigger the price update */}
      <button onClick={handlePriceChange}>Update Price</button>

      {/* Button to toggle stock status between "In Stock" and "Sold Out" */}
      <button onClick={() => toggleStockStatus(plant.id)}>
        {plant.inStock ? 'Sold Out' : 'In Stock'}
      </button>

      {/* Button to delete the plant */}
      <button onClick={() => deletePlant(plant.id)}>Delete</button>
    </div>
  );
}

export default PlantCard;