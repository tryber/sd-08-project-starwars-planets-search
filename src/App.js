import React from 'react';
import FilterByName from './components/FilterByName';
import FilterByNumericValues from './components/FilterByNumericValues';
import PlanetsDataTable from './components/PlanetsDataTable';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <FilterByName />
      <FilterByNumericValues />
      <PlanetsDataTable />
    </StarWarsProvider>
  );
}

export default App;
