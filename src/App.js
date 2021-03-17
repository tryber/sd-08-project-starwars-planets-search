import React from 'react';
import './App.css';
import PlanetsProvider from './contextAPI/PlanetsProvider';
import SearchPlanetPage from './r-pages/SearchPlanetPage';

function App() {
  return (
    <PlanetsProvider>
      <SearchPlanetPage />
    </PlanetsProvider>
  );
}

export default App;
