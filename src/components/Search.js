import React from "react";

function Search({ searchTerm, onSearchChange }) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        value={searchTerm}
        placeholder="Plant name to search..."
        // Passes the input value to the handler
        onChange={(e) => onSearchChange(e.target.value)} 
      />
    </div>
  );
}

export default Search;