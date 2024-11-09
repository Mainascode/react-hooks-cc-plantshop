import React, { useState } from 'react';

// The NewPlantForm component allows users to input data for a new plant
function NewPlantForm({ addPlant }) {
  // State variables to store the input values for the plant's name, image, and price
  // Holds the plant's name
  const [name, setName] = useState(''); 
  // Holds the URL for the plant's image
  const [image, setImage] = useState(''); 
  // Holds the plant's price
  const [price, setPrice] = useState(''); 

  // handleSubmit is called when the form is submitted
  const handleSubmit = (e) => {
    // Prevents the default form submission behavior (page reload)
    e.preventDefault();

    // Creating a new plant object using the state values
    const newPlant = { name, image, price: parseFloat(price) };

    // Calling the addPlant function passed as a prop to add the new plant
    addPlant(newPlant);

    // Resetting the form fields after submission
    setName('');
    setImage('');
    setPrice('');
  };

  return (
    // The form element listens for a submit event and triggers handleSubmit
    <form onSubmit={handleSubmit}>
      {/* Input field for the plant's name */}
      <input
        type="text"
        // Placeholder text for the input
        placeholder="Plant name" 
        // The value of the input is tied to the state variable name
        value={name} 
         // Updates the state when the user types
        onChange={(e) => setName(e.target.value)} 
        // Makes this field mandatory
        required 
      />



      {/* Input field for the image URL */}
      <input
        type="text"
        // Placeholder text for the input
        placeholder="Image URL" 
         // The value of the input is tied to the state variable image
        value={image} 
        // Updates the state when the user types
        onChange={(e) => setImage(e.target.value)}
        required 
      />





      {/* Input field for the price of the plant */}
      <input
       // Ensures only numeric values are entered
        type="number"
         // Placeholder text for the input
        placeholder="Price" 
        // The value of the input is tied to the state variable price
        value={price} 
        // Updates the state when the user types
        onChange={(e) => setPrice(e.target.value)} 
        // Makes this field mandatory
        required 
      />




      {/* Submit button that triggers the form submission */}
      <button type="submit">Add Plant</button>
    </form>
  );
}




export default NewPlantForm;