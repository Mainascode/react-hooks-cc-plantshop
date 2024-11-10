import React from "react";

// PlantCard component to display individual plant details
function PlantCard({ plant, onDelete, onUpdateStock, onUpdatePrice }) {
  return (
    <li className="card">
      {/* Display plant image */}
      <img src={plant.image} alt={plant.name} />
      
      {/* Display plant name */}
      <h4>{plant.name}</h4>
      
      {/* Display plant price */}
      <p>Price: ${plant.price}</p>
      
      {/* Button to delete plant, calls onDelete function with plant ID */}
      <button onClick={() => onDelete(plant.id)}>Delete</button> {/* Delete plant */}
      
      {/* Button to toggle stock status between "In Stock" and "Sold Out" */}
      <button onClick={() => onUpdateStock(plant.id)}>
        {plant.inStock ? "Sold Out" : "In Stock"} {/* Toggle stock status */}
      </button>
      
      {/* Button to update plant price */}
      <button onClick={() => onUpdatePrice(plant.id)}>Update Price</button> {/* Update button to trigger price update */}
    </li>
  );
}

export default PlantCard;