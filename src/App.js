import React from 'react';
import './App.css';
import Form from './components/Form';
import NumericForm from './components/NumericForm';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Form />
      <NumericForm />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
