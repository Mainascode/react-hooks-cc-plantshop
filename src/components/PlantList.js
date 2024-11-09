import React from 'react';
// Import the PlantCard component to display each plant
import PlantCard from './PlantCard';  

function PlantList({ plants, updatePlantPrice, deletePlant, toggleStockStatus }) {
  return (
    <div className="plant-list">
      {/* Map over the 'plants' array and render a PlantCard for each plant */}
      {plants.map((plant) => (
        <PlantCard
        // 'key' prop helps React efficiently update the DOM by tracking individual plant cards
          key={plant.id} 
          // Pass the plant object to the PlantCard as a prop
          plant={plant} 
           // Pass the updatePlantPrice function to handle price updates
          updatePlantPrice={updatePlantPrice}  
          // Pass the deletePlant function to handle plant deletion
          deletePlant={deletePlant} 
           // Pass the toggleStockStatus function to handle stock status toggling
          toggleStockStatus={toggleStockStatus}  
        />
      ))}
    </div>
  );
}

export default PlantList;