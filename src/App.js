import React from 'react';
import './App.css';
import FilterForm from './components/FilterForm';
import Table from './components/Table';
import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <FilterForm />
      <Table />
    </PlanetProvider>
  );
}

export default App;
