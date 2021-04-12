import React from 'react';

import { StarWarsPlanets } from './services/PlanetsContext';
import PlanetsTable from './components/table';

function App() {
  return (
    <StarWarsPlanets>
      <PlanetsTable />
    </StarWarsPlanets>
  );
}

export default App;
