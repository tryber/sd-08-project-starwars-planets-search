import React from 'react';
import './App.css';
import InputSearch from './components/InputSearch';
import PlanetsTable from './components/table/PlanetsTable';
import PlanetsProvider from './context/PlanetsContext';

function App() {
  return (
    <PlanetsProvider>
      <InputSearch />
      <PlanetsTable />
    </PlanetsProvider>
  );
}

export default App;
