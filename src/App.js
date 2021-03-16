import React from 'react';
import './bootstrap.css';
import FilterComponent from './components/FilterInput';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <FilterComponent />
      <Table />
    </Provider>
  );
}

export default App;
