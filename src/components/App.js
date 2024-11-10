import React from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

// Main App Component
function App() {
  return (
    <div className="app">
      {/* Header displays the app title */}
      <Header />
      {/* Main content where plants are managed */}
      <PlantPage />
    </div>
  );
}

export default App;