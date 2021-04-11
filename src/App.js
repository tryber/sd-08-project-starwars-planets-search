import React from 'react';
import './App.css';
import Table from './table/Table';
import Provider from './context/Provider';
import Form from './search/Form';
import SelectCategories from './components/SelectCategories';

function App() {
  return (
    <Provider>
      <Form />
      <SelectCategories />
      <Table />
    </Provider>
  );
}

export default App;
