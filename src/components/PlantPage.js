import React, { useState } from 'react';

function PlantCard({ plant, updatePlantPrice, deletePlant, toggleStockStatus }) {
  // Track the new price entered by the user
  const [newPrice, setNewPrice] = useState(plant.price);

  // Handle the price change by updating the plant's price if valid
  const handlePriceChange = () => {
    // Ensure the new price is a valid positive number
    if (newPrice > 0) {
      // Call the passed function to update the plant price
      updatePlantPrice(plant.id, newPrice);
    }
  };

  return (
    <div className="plant-card">
      {/* Display the plant's image */}
      <img src={plant.image} alt={plant.name} className="plant-image" />

      {/* Display the plant's name */}
      <h3>{plant.name}</h3>

      {/* Display the current price */}
      <p>Price: ${plant.price}</p>

      {/* Input field for updating the price */}
      <input
        type="number"
        value={newPrice}  // Bind the input field to the 'newPrice' state
        onChange={(e) => setNewPrice(e.target.value)}  // Update 'newPrice' state when the user changes the value
        min="0"  // Ensure the price can't be negative
      />
      {/* Button to trigger the price update */}
      <button onClick={handlePriceChange}>Update Price</button>

      {/* Button to toggle the stock status (In Stock / Sold Out) */}
      <button onClick={() => toggleStockStatus(plant.id)}>
        {plant.inStock ? ' Sold Out' : ' In Stock'}
      </button>

      {/* Button to delete the plant */}
      <button onClick={() => deletePlant(plant.id)}>Delete</button>
    </div>
  );
}

export default PlantPage;