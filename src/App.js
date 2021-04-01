import React from 'react';
import './App.css';
import {
  TableListPlanets,
  FilterByNamePlanet,
  FilterSelect,
  SortByColumn,
} from './components';

import PlantesProvider from './context/PlantesProvider';

function App() {
  return (
    <PlantesProvider>
      <h1>Star Wars Planet Searcher</h1>
      <FilterByNamePlanet />
      <br />
      <FilterSelect />
      <br />
      <SortByColumn />
      <TableListPlanets />
    </PlantesProvider>
  );
}

export default App;
