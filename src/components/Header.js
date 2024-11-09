import React from 'react';

// The Header component renders the page's header section
function Header() {
  return (
    <header>
      {/* Displaying the title 'Plantsy' with a plant emoji for visual appeal */}
      <h1>Plantsy <span className="logo" role="img">
          🌱 {/* This emoji, plant-related icon next to the title */}
        </span></h1>
    </header>
  );
}

export default Header;