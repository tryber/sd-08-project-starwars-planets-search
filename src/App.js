import React from 'react';
import PlanetsStarWarsProvider from './context/PlanetsStarWarsProvider';
import Home from './pages/homePage';
import './App.css';

function App() {
  return (
    <PlanetsStarWarsProvider>
      <Home />
    </PlanetsStarWarsProvider>
  );
}

export default App;
