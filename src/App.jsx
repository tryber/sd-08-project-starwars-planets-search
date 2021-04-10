import React from 'react';
import Form from './components/Form';
import NumericFilterForm from './components/NumericFilterForm';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';
import SortInput from './components/SortInput';

function App() {
  return (
    <PlanetsProvider>
      <div>
        <Form />
        <NumericFilterForm />
        <SortInput />
        <hr />
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
