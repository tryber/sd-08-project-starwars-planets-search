import React from 'react';
import PlanetsProvider from './PlanetsProvider';
import PlanetsTable from './PlanetsTable';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <PlanetsTable />
    </PlanetsProvider>
  );
}

export default App;
