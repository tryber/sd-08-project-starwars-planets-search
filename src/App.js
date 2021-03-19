import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import Inputs from './components/Inputs';
import ChipsFilters from './components/ChipsFilters';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <header>
        <Inputs />
      </header>
      <hr />
      <ChipsFilters />
      <hr />
      <main>
        <Table />
      </main>
    </PlanetsProvider>
  );
}

export default App;
