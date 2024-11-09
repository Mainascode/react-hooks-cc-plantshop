import React from 'react';

function Search({ setSearch }) {
  return (
    <div>
      {/* Input field for the search functionality */}
      <input
        type="text"
        // Placeholder text for the input
        placeholder="Search by plant name"  
        // Event handler to update the 'search' state in the parent component
        onChange={(e) => setSearch(e.target.value)}  
      />
    </div>
  );
}

export default Search;