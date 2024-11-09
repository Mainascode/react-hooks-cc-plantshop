import React, { useState, useEffect } from 'react';
import PlantList from './PlantList';
import PlantForm from './NewPlantForm';
import Search from './Search';
import Header from './Header';
// Import the ErrorPage component
import ErrorPage from './ErrorPage'; 
import './App.css';

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState('');
 // State for tracking errors
  const [error, setError] = useState(null); 
  // State for tracking if any plant is found
  const [isPlantFound, setIsPlantFound] = useState(true); 

  // Fetch plants from the API
  useEffect(() => {
    fetch('http://localhost:3000/plants')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch plants data');
        }
        return response.json();
      })
      .then((data) => setPlants(data))
       // Set error if the API fails
       .catch((err) => setError(err.message));
  }, []);

  // Handle adding a new plant
  const addPlant = (newPlant) => {
    fetch('http://localhost:3000/plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlant),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add plant');
        }
        return response.json();
      })
      .then((addedPlant) => setPlants((prevPlants) => [...prevPlants, addedPlant]))
       // Handle any errors here
       .catch((err) => setError(err.message));
  };

  // Handle updating the price of a plant
  const updatePlantPrice = (id, newPrice) => {
    fetch("http://localhost:3000/plants/${id}", {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update plant price');
        }
        return response.json();
      })
      .then((updatedPlant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === updatedPlant.id ? updatedPlant : plant
          )
        );
      })
     // Handle any errors here
       .catch((err) => setError(err.message));
  };

  // Handle deleting a plant
  const deletePlant = (id) => {
    fetch("http://localhost:3000/plants/${id}", {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete plant');
        }
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
      })
      .catch((err) => setError(err.message)); // Handle any errors here
  };

  // Handle search
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  // Update the isPlantFound state based on search results
  useEffect(() => {
    if (filteredPlants.length === 0 && search !== '') {
      setIsPlantFound(false);
    } else {
      setIsPlantFound(true);
    }
  }, [search, filteredPlants]);

  // If there is an error, show the ErrorPage component
  if (error) {
    return <ErrorPage message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div>
      <Header />
      <Search setSearch={setSearch} />
      <PlantForm addPlant={addPlant} />

      {/* Show "Plant not found" message if no plants are found after search */}
      {!isPlantFound && search !== '' && (
        <div className="error-message">
          <h2>Error! Plant not found</h2>
        </div>
      )}

      <PlantList
        plants={filteredPlants}
        updatePlantPrice={updatePlantPrice}
        deletePlant={deletePlant}
      />
    </div>
  );
}

export default App;