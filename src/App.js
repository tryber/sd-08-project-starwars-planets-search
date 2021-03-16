import React from 'react';
import './App.css';
import ActiveFilters from './components/ActiveFilters';
import FilterForm from './components/FilterForm';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <h1>Star Wars Planet Searcher</h1>
      <FilterForm />
      <ActiveFilters />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
