import React from 'react';
import './App.css';

import SearchPlanetsProvider from './context/SearchPlanetsProvider';
import PlanetsStarWars from './pages/PlanetsStarWars';

function App() {
  return (
    <SearchPlanetsProvider>
      <PlanetsStarWars />
    </SearchPlanetsProvider>
  );
}

export default App;
