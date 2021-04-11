import React from 'react';
import './App.css';
import FilterForm from './components/FilterForm';
import Form from './components/Form';
import OrderForm from './components/OrderForm';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <div>
        <Form />
        <FilterForm />
        <OrderForm />
        <hr />
        <Table />
      </div>
    </Provider>
  );
}

export default App;
