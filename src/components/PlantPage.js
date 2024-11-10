import React, { useState, useEffect } from "react";
import Search from "./Search";
import PlantCard from "./PlantCard";
import NewPlantForm from "./NewPlantForm";
import ErrorPage from "./ErrorPage";

function PlantPage() {
  // State for storing plants, search term, and error messages
  const [plants, setPlants] = useState([]);
  // Search term for filtering plants
  const [searchTerm, setSearchTerm] = useState("");
   // State to store any error messages
  const [error, setError] = useState(null); 

  // Fetch plants data when the component first loads
  useEffect(() => {
    fetch("http://localhost:3000/plants")
    // Parse the response as JSON
      .then((res) => res.json())
       // Set the fetched plants data to state
      .then(setPlants) 
       // Catch and handle any errors
      .catch((err) => setError("Failed to load plants"));
      // Empty dependency array means this runs once after the initial render
  }, []); 

  // Handles adding a new plant
  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:3000/plants", {
      // Sending data to the server
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      // Send new plant data in JSON format
      body: JSON.stringify(newPlant), 
    })
    // Parse the response as JSON
      .then((res) => res.json()) 
      // Update state with the new plant
      .then((addedPlant) => setPlants([...plants, addedPlant])) 
      // Handle errors
      .catch(() => setError("Failed to add plant")); 
  };

  // Deletes a plant by ID
  const handleDelete = (id) => {
    // Send a DELETE request to the server
    fetch("http://localhost:3000/plants/${id}", { method: "DELETE" }) 
    // Remove deleted plant from state
      .then(() => setPlants(plants.filter((plant) => plant.id !== id))) 
      // Handle errors
      .catch(() => setError("Failed to delete plant")); 
  };

  // Updates a plant's stock status (inStock or sold out)
  const handleUpdateStock = (id) => {
    // Find the plant by its ID
    const updatedPlant = plants.find((plant) => plant.id === id); 
    fetch("http://localhost:3000/plants/${id}", {
      method: "PATCH", // Update request
      headers: { "Content-Type": "application/json" },
      // Toggle inStock status
      body: JSON.stringify({ inStock: !updatedPlant.inStock }), 
    })
      .then((res) => res.json()) 
      .then((updated) => // Update the state with the new stock status
        setPlants(plants.map((plant) => (plant.id === id ? updated : plant)))
      )
      // Handle errors
      .catch(() => setError("Failed to update plant stock")); 
  };

  // Updates a plant's price
  const handleUpdatePrice = (id) => {
    // Prompt the user for a new price
    const newPrice = prompt("Enter the new price:"); 
    if (newPrice && !isNaN(newPrice)) {
      fetch("http://localhost:3000/plants/${id}", {
        method: "PATCH", // Update request
        headers: { "Content-Type": "application/json" },
        // Send updated price to server
        body: JSON.stringify({ price: parseFloat(newPrice) }), 
      })
      
      // Parse the updated plant response
        .then((res) => res.json()) 
        .then((updatedPlant) => {
          setPlants(
            plants.map((plant) =>
              //Update the plant price in state
              plant.id === id ? { ...plant, price: updatedPlant.price } : plant 
            )
          );
        })
        .catch(() => setError("Failed to update plant price")); 
    } else {
      // Alert if the price is invalid
      alert("Please enter a valid price."); 
    }
  };


  // Filters plants based on the search term
  const filteredPlants = plants.filter((plant) =>
    // Check if the plant name matches the search term
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  // If there's an error, display the ErrorPage component
  if (error) {
    return <ErrorPage message={error} />;
  }

  // If no plants match the search term, display a message
  if (filteredPlants.length === 0) {
    return (
      <div className="no-plants">
        {/* Display message if no plants match */}
        <h2>Oops... No plant found</h2> 
      </div>
    );
  }

  return (
    <main>
      {/* Search component to filter plants */}
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {/* NewPlantForm to add a new plant */}
      <NewPlantForm onAddPlant={handleAddPlant} />
      {/* List of plant cards, passing necessary functions to each card */}
      <ul className="cards">
        {filteredPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onDelete={handleDelete}
            onUpdateStock={handleUpdateStock}
              // Pass the update function for price
            onUpdatePrice={handleUpdatePrice} 
          />
        ))}
      </ul>
    </main>
  );
}

export default PlantPage;