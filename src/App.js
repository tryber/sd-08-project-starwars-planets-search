import React from 'react';
import './App.css';
import InputForm from './components/InputForm';
import HandleActiveFilters from './components/HandleActiveFilters';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <InputForm />
      <HandleActiveFilters />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
