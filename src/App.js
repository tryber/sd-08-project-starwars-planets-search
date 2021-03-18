import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import PlanetsTable from './components/planetsTable';
import './App.css';
import Filtros from './components/filtros';
import Order from './components/order';

function App() {
  return (
    <PlanetsProvider>
      <Filtros />
      <Order />
      <PlanetsTable />
    </PlanetsProvider>
  );
}

export default App;
